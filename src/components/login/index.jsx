import React, { useState } from "react";
import AlternateLogin from "../common/loginSignup/alternateLogin";
import EmailPasswordSignup from "./emailPasswordSignup";
import PhoneInput from "./phoneInput";

const LoginForm = () => {
  const [phoneLogin, setPhoneLogin] = useState(false);
  return (
    <section className="bg-gray-50 dark:bg-gray-900 mt-3">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <span className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
          Sunrise
        </span>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Login
            </h1>
            {phoneLogin ? <PhoneInput /> : <EmailPasswordSignup />}
            <AlternateLogin
              type="login"
              phoneLogin={phoneLogin}
              setPhoneLogin={setPhoneLogin}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
