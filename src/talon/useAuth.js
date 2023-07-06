import { useMutation } from "@apollo/client";
import { initializeApp } from "firebase/app";
import {
  EmailAuthProvider,
  getAuth,
  linkWithCredential,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  updateProfile,
} from "firebase/auth";
import { toast } from "react-toastify";
import { firebaseConfig } from "../constants/firebase/firebaseConfig";
import { toastConfig } from "../constants/reactToastify/toastConfig";
import { registerUser, userExistQuery } from "../graphQl/mutation/userQuery";

const useAuth = ({ setOtpField, otp, otpField }) => {
  const [checkExistUser] = useMutation(userExistQuery);
  const [registerUserCT] = useMutation(registerUser);

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  /**
   * To SigninWithPhone in firebase
   * And Send OTP
   *
   * @param {Int} phone
   */
  const onSignup = async (phone) => {
    const loading = toast.loading("Requesting OTP...");
    if (window.recaptchaVerifier) {
      return;
    } else {
      window.recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {
          size: "invisible",
          // "expired-callback": () => {},
        },
        auth
      );
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
        console.log(error);
        toast.update(loading, {
          ...toastConfig,
          render: "OTP Sending Failed!",
          type: "error",
          isLoading: false,
        });
      }
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
      await linkEmailPasswordProvider({ name, email, password });
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

  /**
   * Links Email and Password Credentials with Phone number Auth
   *
   * @param {{name:String,email:String, password:String}} {Object} - {email, password}
   */
  async function linkEmailPasswordProvider({ name, email, password }) {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(email, password);
    await updateProfile(user, { displayName: name });
    try {
      await linkWithCredential(user, credential);
      const { accessToken } = user;
      await registerUserCT({
        variables: {
          token: accessToken,
        },
      });
      console.log("Email/password provider linked successfully");
      return true;
    } catch (error) {
      console.log("Error linking email/password provider:", error);
      throw error;
    }
  }

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
        console.log(data);
        if (!data.checkUser.isExisting) {
          toast.dismiss();
          await onSignup(phone);
        }
        if (data.checkUser.isExisting) {
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
    }
  };

  /**
   * To Submit Signup Form
   *
   * @param {{email:String, password:String, phone:String}} - Input Field of Signup Form
   */
  const submitLoginForm = ({ email = "", password = "", phone = "" }) => {
    if (otpField) {
      return console.log(phone);
    }
    console.log(email, password);
  };

  /**
   * To submit OTP - FOR [LOGIN FORM ONLY]
   *
   * Will be called automatically when the OTP is entered
   *
   */
  const submitLoginOTP = () => {
    toast.success(`your otp is ${otp}`);
  };

  return { auth, onSignup, submitSignupForm, submitLoginForm, submitLoginOTP };
};
export default useAuth;
