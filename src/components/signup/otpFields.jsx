import React, { useState } from "react";
import OTPInput from "react-otp-input";

const OtpFields = ({ setOtpField, setOtp, otp }) => {
  return (
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
            className="bg-gray-200 mx-2 text-lg flex-1 text-gray-900 border-b-2 font-semibold outline-none rounded-md"
          />
        )}
      />
      <span
        onClick={() => setOtpField(false)}
        className="cursor-pointer text-sm italic underline underline-offset-4 text-gray-600"
      >
        Edit Number
      </span>
    </div>
  );
};

export default OtpFields;
