import React, { useContext } from "react";
import CheckoutSummary from "./checkoutSummary";
import AddressForm from "./addressPart/addressForm";
import useCheckout from "../../talon/useCheckout";
import Loader from "../common/loader";
import AddressDisplay from "./addressPart/addressDisplay";
import { CheckoutContext } from "../../context/checkout/checkoutContext";
import { find, findLast, size } from "lodash";
import { CartContext } from "../../context/cart/cartContext";
import ShippingMethodForm from "./shippingMethod/shippingMethodForm";
import { useEffect } from "react";
import { findIndex } from "lodash";
import ShippingMethodDisplay from "./shippingMethod/shippingMethodDisplay";
import EmailForm from "./emailPart/emailForm";

const Checkout = () => {
  const { submitAddressForm, submitBillingForm, confirmOrder } = useCheckout();
  const { step, setStep } = useContext(CheckoutContext);
  const { cartItem } = useContext(CartContext);

  // useEffect(() => {
  //   setStep([...step, { step: 1, value: cartItem?.shippingAddress }]);
  // }, [cartItem]);

  console.log("🚀 ~ file: checkout.jsx:21 ~ useEffect ~ step1:", step);
  return (
    <div className="container p-12 mx-auto">
      <div className="flex flex-col w-full px-0 mx-auto md:flex-row">
        <div className="flex flex-col md:w-full">
          <div>
            {size(step) >= 0 && <EmailForm emailid={cartItem?.customerEmail} />}
          </div>
          <div>
            {cartItem?.shippingAddress && size(step) >= 1 ? (
              <div className="mb-4 border-2 rounded-lg px-3 pb-3">
                <h2 className="mt-4 underline underline-offset-4 mb-4 font-bold md:text-xl text-heading ">
                  Shipping Address
                </h2>
                <AddressDisplay address={cartItem?.shippingAddress} />
              </div>
            ) : (
              <>
                <h2 className="mt-4 underline underline-offset-4 mb-4 font-bold md:text-xl text-heading ">
                  Shipping Address
                </h2>
                <AddressForm
                  submitForm={submitAddressForm}
                  address={cartItem?.shippingAddress}
                />
              </>
            )}
          </div>
          <div className="mt-3">
            {step[0]?.value && size(step) >= 2 ? (
              <div className="mb-4 border-2 rounded-lg px-3 pb-3">
                <h2 className="mt-4 underline underline-offset-4 mb-4 font-bold md:text-xl text-heading ">
                  Shipping Method
                </h2>
                <ShippingMethodDisplay />
              </div>
            ) : (
              step[0] && (
                <>
                  <ShippingMethodForm />
                </>
              )
            )}
          </div>
          <div className="mt-3">
            {step[1]?.value && size(step) >= 3 ? (
              <div className="mb-4 border-2 rounded-lg px-3 pb-3">
                <h2 className="mt-4 underline underline-offset-4 mb-4 font-bold md:text-xl text-heading ">
                  Billing Address
                </h2>
                <AddressDisplay address={cartItem?.billingAddress} />
              </div>
            ) : (
              step[1] && (
                <>
                  <h2 className="mb-4 font-bold md:text-xl text-heading ">
                    Billing Address
                  </h2>
                  <AddressForm
                    submitForm={submitBillingForm}
                    address={cartItem?.billingAddress}
                  />
                </>
              )
            )}
          </div>
          <div className="mt-3">
            {step[2]?.value && size(step) === 3 && (
              <>
                <button
                  onClick={() => {
                    confirmOrder();
                  }}
                  className="w-full mt-3 px-6 py-2 text-blue-200 bg-blue-600 hover:bg-blue-900"
                >
                  Checkout
                </button>
              </>
            )}
          </div>
        </div>
        <CheckoutSummary />
      </div>
    </div>
  );
};

export default Checkout;
