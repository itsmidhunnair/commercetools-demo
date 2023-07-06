import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../talon/useAuth";
import OtpFields from "./otpFields";

const EmailPasswordSignup = () => {
  const [otp, setOtp] = useState("");
  const { register, handleSubmit } = useForm();
  const [otpField, setOtpField] = useState(false);
  const { submitSignupForm } = useAuth({ setOtpField, otp, otpField });

  return (
    <>
      <form
        className="space-y-4 md:space-y-6"
        onSubmit={handleSubmit(submitSignupForm)}
      >
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Name
          </label>
          <input
            readOnly={otpField}
            type="text"
            name="name"
            placeholder="Name"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            {...register("name")}
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Your email
          </label>
          <input
            readOnly={otpField}
            {...register("email")}
            type="email"
            name="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="name@company.com"
            required=""
          />
        </div>
        <div>
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          <input
            readOnly={otpField}
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            required=""
            {...register("password")}
          />
        </div>
        <div className="relative">
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
          {/* <button
          type="submit"
          onClick={() => setOtpField(true)}
          className="hover:bg-gray-700 active:bg-gray-800 px-3 text-white group-active::ring-gray-600 group-active::border-gray-600 bg-gray-500 border-2  absolute right-0 bottom-0 py-2 rounded-r-lg"
        >
          Verify
        </button> */}
        </div>
        {/* <PhoneInput register={register} /> */}

        {/* <div className="flex items-center justify-between">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              id="remember"
              aria-describedby="remember"
              type="checkbox"
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
              required=""
            />
          </div>
          <div className="ml-3 text-sm">
            <label
              htmlFor="remember"
              className="text-gray-500 dark:text-gray-300"
            >
              Remember me
            </label>
          </div>
        </div>
        <Link
          href="#"
          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
        >
          Forgot password?
        </Link>
      </div> */}
        {otpField && (
          <OtpFields setOtpField={setOtpField} otp={otp} setOtp={setOtp} />
        )}
        <button
          type="submit"
          disabled={otpField && otp.length !== 6}
          className="w-full text-white bg-gray-600 disabled:bg-gray-500 hover:bg-gray-700 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
        >
          {otpField ? "Sign in" : "Send OTP"}
        </button>
      </form>
    </>
  );
};

export default EmailPasswordSignup;
