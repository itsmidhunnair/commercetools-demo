import React from "react";
import useCheckout from "../../../talon/useCheckout";
import useAuth from "../../../talon/useAuth";

const AddressForm = ({ submitAddressForm }) => {
  const { getUserEmail } = useAuth();
  const { register, handleSubmit } = useCheckout();
  return (
    <form
      className="justify-center w-full mx-auto"
      onSubmit={handleSubmit(submitAddressForm)}
    >
      <div className="">
        <div className="space-x-0 lg:flex lg:space-x-4">
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="salutation"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Salutation
            </label>
            <select
              name="salutation"
              placeholder="First Name"
              defaultValue="select"
              {...register("salutation")}
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            >
              <option disabled value="select">
                Select{" "}
              </option>
              <option value="Mr.">Mr.</option>
              <option value="Ms.">Ms.</option>
              <option value="Mrs.">Mrs.</option>
            </select>
          </div>
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="firstName"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              First Name
            </label>
            <input
              name="firstName"
              type="text"
              {...register("firstName")}
              placeholder="First Name"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="w-full lg:w-1/2 ">
            <label
              htmlFor="lastName"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Last Name
            </label>
            <input
              name="lastName"
              type="text"
              {...register("lastName")}
              placeholder="Last Name"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>
        <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
          <div className="w-full">
            <label
              htmlFor="Email"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Email
            </label>
            <input
              name="Email"
              type="text"
              {...register("email")}
              defaultValue={getUserEmail()}
              placeholder="Email"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="w-full">
            <label
              htmlFor="mobile"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Mobile
            </label>
            <input
              name="mobile"
              type="text"
              {...register("mobile")}
              placeholder="Mobile"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>
        <div className="mt-4">
          <div className="w-full">
            <label
              htmlFor="address_line_1"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Address Line 1
            </label>
            <input
              type="text"
              name="address_line_1"
              {...register("building")}
              className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Address Line 1"
            />
          </div>
          <div className="mt-4 w-full">
            <label
              htmlFor="address_line_2"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Address Line 2
            </label>
            <input
              type="text"
              name="address_line_2"
              {...register("streetName")}
              className="w-full px-4 py-3 text-xs border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
              placeholder="Address Line 2"
            />
          </div>
        </div>
        <div className="space-x-0 lg:flex lg:space-x-4">
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="city"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              City
            </label>
            <input
              name="city"
              type="text"
              {...register("city")}
              placeholder="City"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="w-full lg:w-1/2 ">
            <label
              htmlFor="postalcode"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Postcode
            </label>
            <input
              name="postalcode"
              type="text"
              {...register("postalCode")}
              placeholder="Postal Code"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>
        <div className="mt-4 space-x-0 lg:flex lg:space-x-4">
          <div className="w-full lg:w-1/2">
            <label
              htmlFor="state"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              State
            </label>
            <input
              name="state"
              type="text"
              {...register("state")}
              placeholder="State"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
          <div className="w-full lg:w-1/2 ">
            <label
              htmlFor="country"
              className="block mb-3 text-sm font-semibold text-gray-500"
            >
              Country
            </label>
            <input
              name="country"
              type="text"
              {...register("country")}
              placeholder="Country"
              className="w-full px-4 py-3 text-sm border border-gray-300 rounded lg:text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>
        </div>
        {/* <div className="flex items-center mt-4">
                <label className="flex items-center text-sm group text-heading">
                  <input
                    type="checkbox"
                    className="w-5 h-5 border border-gray-300 rounded focus:outline-none focus:ring-1"
                  />
                  <span className="ml-2">
                    Save this information for next time
                  </span>
                </label>
              </div> */}
        <div className="mt-4">
          <button
            type="submit"
            className="w-full px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
          >
            Process
          </button>
        </div>
      </div>
    </form>
  );
};

export default AddressForm;
