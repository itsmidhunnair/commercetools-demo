import React from "react";
import { Link } from "react-router-dom";
import GithubSvg from "../../../constants/svgs/githubSvg";
import GoogleSvg from "../../../constants/svgs/googleSvg";

const AlternateLogin = ({ type = "signup", phoneLogin, setPhoneLogin }) => {
  return (
    <div>
      {" "}
      <div className="text-center">
        OR
        <br />
        {type === "signup" ? "Signup" : "Login"} using
      </div>
      <div className="mt-4 flex flex-col gap-2">
        {type === "login" && (
          <button
            className="svg-btn"
            onClick={() => {
              setPhoneLogin(!phoneLogin);
            }}
          >
            Login using {phoneLogin ? "Email" : "Phone"}
          </button>
        )}
        <button className="svg-btn">
          <GoogleSvg /> Google
        </button>
        <button className="svg-btn">
          <GithubSvg /> Github
        </button>
      </div>
      <div className="mt-3">
        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
          {type === "signup"
            ? "Already registered?"
            : "Don't have an account yet?"}
          <Link
            to={type === "signup" ? "/login" : "/signup"}
            className="font-medium text-primary-600 hover:underline dark:text-primary-500"
          >
            {type === "signup" ? "Log in" : "Sign up"}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default AlternateLogin;
