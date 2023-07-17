import React from "react";
import useCheckout from "../../../talon/useCheckout";

const ShippingMethodForm = () => {
  const { handleSubmit, register, submitShippingMethod } = useCheckout();
  return (
    <>
      <h3 className="mb-4 font-bold md:text-xl text-heading">
        Shipping Method
      </h3>
      <form onSubmit={handleSubmit(submitShippingMethod)}>
        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700">
          <input
            id="bordered-radio-1"
            type="radio"
            defaultChecked={true}
            value="b5c34cf5-f9af-477b-950c-3b0776a03749"
            name="bordered-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            {...register("shipping_method")}
          />
          <label
            htmlFor="bordered-radio-1"
            className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Standard EU
            <span className="block text-xs font-normal">
              Delivery in 5-6 working days
            </span>
          </label>
        </div>
        <div className="flex items-center pl-4 border border-gray-200 rounded dark:border-gray-700 mt-3">
          <input
            defaultChecked=""
            id="bordered-radio-2"
            type="radio"
            defaultValue=""
            value="15992d1c-61f1-41df-9f4c-c55bd6d66c05"
            name="bordered-radio"
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            {...register("shipping_method")}
          />
          <label
            htmlFor="bordered-radio-2"
            className="w-full py-4 ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Express EU
            <span className="block text-xs font-normal">Same day delivery</span>
          </label>
        </div>
        <button
          type="submit"
          className="w-full mt-3 px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
        >
          Proceed
        </button>
      </form>
    </>
  );
};

export default ShippingMethodForm;
