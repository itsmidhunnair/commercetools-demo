import React, { useState } from "react";
import { useForm } from "react-hook-form";
import OTPInput from "react-otp-input";
import { toast } from "react-toastify";
import useAuth from "../../talon/useAuth";

const PhoneInput = () => {
  const [otpField, setOtpField] = useState(false);
  const [otp, setOtp] = useState("");

  const { register, handleSubmit } = useForm();

  const { submitLoginForm, submitLoginOTP } = useAuth({
    otpField,
    setOtpField,
    otp,
  });

  if (otp.length === 6) {
    submitLoginOTP();
  }

  return (
    <>
      <div className="relative">
        <form onSubmit={handleSubmit(submitLoginForm)}>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your phone
          </label>
          <input
            readOnly={otpField}
            type="number"
            name="phone"
            id="phone"
            className="group bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="+91xxxxxxxxxx"
            required=""
            {...register("phone")}
          />
          <button
            type="submit"
            className="hover:bg-gray-700 active:bg-gray-800 px-3 text-white group-active::ring-gray-600 group-active::border-gray-600 bg-gray-500 border-2  absolute right-0 bottom-0 py-2 rounded-r-lg"
          >
            Verify
          </button>
        </form>
      </div>
      {otpField ? (
        <div className="">
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Enter Otp
          </label>
          <OTPInput
            inputStyle="flex justify-between"
            value={otp}
            onChange={setOtp}
            inputType="tel"
            numInputs={6}
            shouldAutoFocus
            renderInput={(props) => (
              <input
                {...props}
                className=" mx-2 text-lg flex-1 text-gray-900 border-b-2 border-gray-700 font-semibold outline-none"
              />
            )}
          />
          <span
            onClick={() => setOtpField(false)}
            className="cursor-pointer text-sm italic underline underline-offset-4 text-gray-600"
          >
            Edit Phone?
          </span>
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default PhoneInput;
