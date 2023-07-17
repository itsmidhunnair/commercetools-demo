import { useMutation } from "@apollo/client";
import { debounce } from "lodash";
import React, { useState } from "react";
import { useContext } from "react";
import { useForm } from "react-hook-form";
import { CartContext } from "../context/cart/cartContext";
import { CheckoutContext } from "../context/checkout/checkoutContext";
import {
  addBillingAddressQuery,
  addShippingAddressQuery,
  addShippingMethodQuery,
  placeOrderQuery,
} from "../graphQl/mutation/cartQuery";

const useCheckout = () => {
  const { setStep, step } = useContext(CheckoutContext);
  const { setCartItem } = useContext(CartContext);

  const { register, handleSubmit, setValue } = useForm();

  const [addShippingAddress] = useMutation(addShippingAddressQuery);
  const [addShippingMethod] = useMutation(addShippingMethodQuery);
  const [addBillingAddress] = useMutation(addBillingAddressQuery);
  const [placeOrder] = useMutation(placeOrderQuery);

  // const [address, setAddress] = useState();

  /**
   * To submit Checkout Address form
   *
   */
  const submitAddressForm = async (formInput) => {
    try {
      console.log(formInput);
      const { data } = await addShippingAddress({
        variables: {
          input: {
            cart_id: localStorage.getItem("cart_id"),
            version: parseInt(localStorage.getItem("cart_version")),
            ...formInput,
          },
        },
      });
      localStorage.setItem("cart_id", data?.addShippingAddr.id);
      localStorage.setItem("cart_version", data?.addShippingAddr.version);
      localStorage.setItem("anonymous_id", data?.addShippingAddr.anonymousId);
      setCartItem(data?.addShippingAddr);
      setStep([{ step: 1, value: formInput }]);
    } catch (error) {
      console.log(
        "🚀 ~ file: useCheckout.js:23 ~ submitAddressForm ~ error:",
        error
      );
    }
  };

  /**
   * Submit Shipping Method
   */
  const submitShippingMethod = async (input) => {
    console.log(
      "🚀 ~ file: useCheckout.js:55 ~ submitShippingMethod ~ input:",
      input
    );
    try {
      const { data } = await addShippingMethod({
        variables: {
          input: {
            cart_id: localStorage.getItem("cart_id"),
            method_id: input.shipping_method,
            version: parseInt(localStorage.getItem("cart_version")),
          },
        },
      });
      console.log(
        "🚀 ~ file: useCheckout.js:70 ~ submitShippingMethod ~ data:",
        data
      );
      localStorage.setItem("cart_id", data?.addShippingMeth.id);
      localStorage.setItem("cart_version", data?.addShippingMeth.version);
      localStorage.setItem("anonymous_id", data?.addShippingMeth.anonymousId);
      console.log(
        "🚀 ~ file: useCheckout.js:70 ~ submitShippingMethod ~ data:",
        data
      );
      setStep([...step, { step: 2, value: input.shipping_method }]);
    } catch (error) {
      console.log(
        "🚀 ~ file: useCheckout.js:69 ~ submitShippingMethod ~ error:",
        error
      );
    }
  };

  /**
   * Submit Billing Address Form
   */
  const submitBillingForm = async (formInput) => {
    console.log(
      "🚀 ~ file: useCheckout.js:96 ~ submitBillingForm ~ formInput:",
      formInput
    );
    try {
      const { data } = await addBillingAddress({
        variables: {
          input: {
            cart_id: localStorage.getItem("cart_id"),
            version: parseInt(localStorage.getItem("cart_version")),
            ...formInput,
          },
        },
      });
      console.log(
        "🚀 ~ file: useCheckout.js:107 ~ submitBillingForm ~ data:",
        data
      );
      localStorage.setItem("cart_id", data?.addBillingAddr.id);
      localStorage.setItem("cart_version", data?.addBillingAddr.version);
      localStorage.setItem("anonymous_id", data?.addBillingAddr.anonymousId);
      setCartItem(data?.addBillingAddr);
      setStep([...step, { step: 3, value: formInput }]);
    } catch (error) {
      console.log(
        "🚀 ~ file: useCheckout.js:23 ~ submitAddressForm ~ error:",
        error
      );
    }
  };

  /**
   * Place Order
   */
  const confirmOrder = async () => {
    try {
      const data = await placeOrder({
        variables: {
          input: {
            cart_id: localStorage.getItem("cart_id"),
            version: parseInt(localStorage.getItem("cart_version")),
          },
        },
      });
      console.log("🚀 ~ file: useCheckout.js:143 ~ confirmOrder ~ data:", data);
    } catch (error) {
      console.log(
        "🚀 ~ file: useCheckout.js:145 ~ confirmOrder ~ error:",
        error
      );
    }
  };

  return {
    register,
    handleSubmit,
    submitAddressForm,
    submitShippingMethod,
    submitBillingForm,
    setValue,
    confirmOrder,
  };
};

export default useCheckout;
