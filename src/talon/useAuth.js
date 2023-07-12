import { useMutation } from "@apollo/client";
import {
  GoogleAuthProvider,
  RecaptchaVerifier,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { auth } from "../config/firebase.config";

import { toastConfig } from "../constants/reactToastify/toastConfig";
import {
  loginUserQuery,
  registerUser,
  registerUserWithGoogleQuery,
  userExistQuery,
} from "../graphQl/mutation/userQuery";

const useAuth = ({ setOtpField, otp, otpField }) => {
  const navigate = useNavigate();

  const [checkExistUser] = useMutation(userExistQuery);
  const [registerUserCT] = useMutation(registerUser);
  const [loginUser] = useMutation(loginUserQuery);
  const [registerUserToGoogle] = useMutation(registerUserWithGoogleQuery);

  /**
   * Firebase Signin with Phone function
   *
   * @param {loading}
   * @param {Int} phone
   */
  const signupWithPhone = async (loading, phone) => {
    const appVerifier = window.recaptchaVerifier;
    const formatPh = `+${phone}`;
    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        formatPh,
        appVerifier
      );
      window.confirmationResult = confirmationResult;
      setOtpField(true);
      toast.update(loading, {
        ...toastConfig,
        render: "OTP sent Successfully",
        type: "success",
        isLoading: false,
      });
      console.log("OTP sended successfully!");
    } catch (error) {
      if (error.code === "auth/invalid-phone-number") {
        toast.update(loading, {
          ...toastConfig,
          autoClose: 5000,
          render:
            "OTP Sending Failed!, Please recheck your phone number & don't forget to include the Country Code!!",
          type: "error",
          isLoading: false,
        });
      }
      console.log(error);
      // toast.update(loading, {
      //   ...toastConfig,
      //   render: "OTP Sending Failed!",
      //   type: "error",
      //   isLoading: false,
      // });
    }
  };

  /**
   * To SigninWithPhone in firebase
   * And Send OTP
   *
   * @param {Int} phone
   */
  const onSignup = async (phone) => {
    const loading = toast.loading("Requesting OTP...");
    if (window.recaptchaVerifier) {
      signupWithPhone(loading, phone);
    } else {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          // "expired-callback": () => {},
        },
        auth
      );
      signupWithPhone(loading, phone);
    }
  };

  /**
   * To verify the received OTP and Link Email Password with the Phone Signup
   *
   * @param {{name:String, otp:Int, email:String, password:email}} {name,otp, email, password}
   */
  async function onOTPVerify({ name, otp, email, password }) {
    const loading = toast.loading("Validating OTP");
    console.log(otp);
    try {
      const result = await window.confirmationResult.confirm(`${otp}`);
      console.log(result);
      // ---------------------------
      const user = auth.currentUser;
      const { accessToken } = user;
      const { data } = await registerUserCT({
        variables: {
          input: {
            token: `bearer ${accessToken}`,
            email: email,
            password: password,
            name,
          },
        },
      });
      console.log(data);
      // ---------------------------

      toast.update(loading, {
        ...toastConfig,
        render: "User Signed Up Successfully",
        type: "success",
        isLoading: false,
      });
    } catch (error) {
      console.log(error);

      toast.update(loading, {
        ...toastConfig,
        render: "User Signed failed. Please Try Again!",
        type: "error",
        isLoading: false,
      });
    }
  }

  // /**
  //  * Links Email and Password Credentials with Phone number Auth
  //  *
  //  * @param {{name:String,email:String, password:String}} {Object} - {email, password}
  //  */
  // async function linkEmailPasswordProvider({ name, email, password }) {
  //   const user = auth.currentUser;
  //   const credential = EmailAuthProvider.credential(email, password);
  //   await updateProfile(user, { displayName: name });
  //   try {
  //     await linkWithCredential(user, credential);
  //     const { accessToken } = user;
  //     console.log(accessToken);
  //     const { data } = await registerUserCT({
  //       variables: {
  //         token: `bearer ${accessToken}`,
  //       },
  //     });
  //     console.log(data);
  //     if (data.registerUser.success === false) {
  //       throw "Sign up failed please try again";
  //     }

  //     if (data.registerUser.success === true) {
  //       console.log("Email/password provider linked successfully");
  //       return "Sign up Successfull";
  //     }
  //   } catch (error) {
  //     console.log("Error linking email/password provider:", error);
  //     try {
  //       user.delete();
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     throw error;
  //   }
  // }

  /**
   * To Submit Signup Form
   *
   * @param {{name:String, email:String, password:String, phone:String}} - Input Field of Signup Form
   */
  const submitSignupForm = async ({ name, email, password, phone }) => {
    console.log(otpField);
    if (otpField) {
      console.log(otpField);
      await onOTPVerify({ name, otp, email, password });
    }
    if (!otpField) {
      await handlePhoneSignin({ name, password, phone, email });
    }
  };

  /**
   * Handle Phone Signin/Login after verifying if user is present or not
   */
  const handlePhoneSignin = async ({ name, email, password, phone }) => {
    console.log(email);
    const loading = toast.loading("Validating user, Please wait!");
    console.log(name, password, phone);
    try {
      const { data } = await checkExistUser({
        variables: {
          input: {
            email,
            phone: `+${phone}`,
          },
        },
      });
      console.log(data.checkUser.isExisting);
      console.log(email);
      console.log(!(email && password) && data.checkUser.isExisting);
      if (!(email && password) && data.checkUser.isExisting === false) {
        toast.update(loading, {
          ...toastConfig,
          render: "No account found, please Signin to continue!!",
          isLoading: false,
        });
      }
      if (!(email && password) && data.checkUser.isExisting === true) {
        console.log("triggered");
        toast.dismiss();
        setOtpField(true);
        await onSignup(phone);
        return data;
      }
      if (email && password && !data.checkUser.isExisting) {
        toast.dismiss();
        await onSignup(phone);
      }
      if (email && password && data.checkUser.isExisting) {
        console.log(data.checkUser.error);
        toast.update(loading, {
          ...toastConfig,
          render: data.checkUser.msg,
          isLoading: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * Login Using Credentials
   *
   * @param email
   * @param phone
   *
   */
  const LoginUsingEmail = async ({ email, password }) => {
    const loading = toast.loading("Loging in...");
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      console.log(result.user.accessToken);
      const data = await loginUser({
        variables: {
          token: `bearer ${result.user.accessToken}`,
        },
      });
      console.log(data);
      toast.update(loading, {
        ...toastConfig,
        type: "success",
        render: (
          <div className="text-center">
            User Login Successfull!
            <br />
            Welcome <b>{data.data.loginUser.firstName}</b>
          </div>
        ),
        isLoading: false,
      });
      navigate("/products");
    } catch (error) {
      if (error.code === "auth/wrong-password") {
        return toast.update(loading, {
          ...toastConfig,
          render: "Incorrect Password, Please Try Again!",
          type: "error",
          isLoading: false,
        });
      }
      if (error.code === "auth/too-many-requests") {
        return toast.update(loading, {
          ...toastConfig,
          render: "Too many Requests, Please Try Again in sometime!",
          type: "error",
          isLoading: false,
        });
      }
      if (error.code === "auth/user-not-found") {
        return toast.update(loading, {
          ...toastConfig,
          render: "No user found!, Please signup to continue!",
          type: "error",
          isLoading: false,
        });
      }
      console.log(error);
      return toast.update(loading, {
        ...toastConfig,
        render: "Error Signin in, Please Try Again in sometime!",
        type: "error",
        isLoading: false,
      });
    }
  };

  /**
   * To Submit Signup Form
   *
   * @param {{email:String, password:String, phone:String}} - Input Field of Signup Form
   */
  const submitLoginForm = async ({ email, password, phone }) => {
    if (phone) {
      const data = await handlePhoneSignin({ phone });
      console.log(data);
    } else {
      console.log(email, password);
      LoginUsingEmail({ email, password });
    }
  };

  /**
   * Submit Login OTP
   */
  const submitLoginOTP = async () => {
    try {
      const result = await window.confirmationResult.confirm(`${otp}`);
      const data = await loginUser({
        variables: {
          token: `bearer ${result.user.accessToken}`,
        },
      });
      console.log(data);
      // toast.update(loading, {
      //   ...toastConfig,
      //   type: "success",
      //   render: (
      //     <div className="text-center">
      //       User Login Successfull!
      //       <br />
      //       Welcome <b>{data.data.loginUser.firstName}</b>
      //     </div>
      //   ),
      //   isLoading: false,
      // });
      navigate("/products");
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * To Signup user using Google
   *
   */
  const signupWithGoogle = async () => {
    const loading = toast.loading("Attempting to login!");
    const provider = new GoogleAuthProvider();
    provider.addScope("email");
    try {
      const { _tokenResponse } = await signInWithPopup(auth, provider);
      console.log(_tokenResponse.idToken);
      const { data } = await registerUserToGoogle({
        variables: {
          token: `bearer ${_tokenResponse.idToken}`,
        },
      });
      navigate("/products");
      toast.update(loading, {
        ...toastConfig,
        render: "User Loggedin Successfully!!",
        type: "success",
        isLoading: false,
      });
      console.log(data);
    } catch (error) {
      const err = JSON.parse(error.message);
      if (!err.success) {
        toast.update(loading, {
          ...toastConfig,
          render: err.msg,
          type: "error",
          isLoading: false,
        });
      }
    }
  };

  return {
    auth,
    onSignup,
    submitSignupForm,
    submitLoginForm,
    signupWithGoogle,
    submitLoginOTP,
  };
};
export default useAuth;
