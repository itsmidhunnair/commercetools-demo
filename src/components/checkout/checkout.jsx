import React from "react";
import CheckoutSummary from "./checkoutSummary";
import AddressForm from "./addressPart/addressForm";
import useCheckout from "../../talon/useCheckout";
import Loader from "../common/loader";
import AddressDisplay from "./addressPart/addressDisplay";

const Checkout = () => {
  const { address, submitAddressForm } = useCheckout();
  return (
    <div className="container p-12 mx-auto">
      <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
        <div className="flex flex-col md:w-full">
          <h2 className="mb-4 font-bold md:text-xl text-heading ">
            Shipping Address
          </h2>
          {address ? (
            <AddressDisplay address={address} />
          ) : (
            <AddressForm submitAddressForm={submitAddressForm} />
          )}
        </div>
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default Checkout;
