import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "../../../context/cart/cartContext";
import useAuth from "../../../talon/useAuth";
import useCheckout from "../../../talon/useCheckout";

const EmailForm = ({ emailid }) => {
  const { handleSubmit, register, submitCustomerEmail, email } = useCheckout();

  return (
    <form
      onSubmit={handleSubmit(submitCustomerEmail)}
      className="relative mb-4"
    >
      <label
        htmlFor="email"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Your Email
      </label>
      <input
        defaultValue={emailid}
        readOnly={email || emailid}
        type="email"
        name="email"
        className="group bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-gray-600 focus:border-gray-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        placeholder="demo@company.com"
        required=""
        {...register("email")}
      />
      {!(email || emailid) && (
        <button
          type="submit"
          className="hover:bg-gray-700 active:bg-gray-800 px-3 text-white group-active::ring-gray-600 group-active::border-gray-600 bg-gray-500 border-2  absolute right-0 bottom-0 py-2 rounded-r-lg"
        >
          Verify
        </button>
      )}
    </form>
  );
};

export default EmailForm;
