import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { addShippingAddressQuery } from "../graphQl/mutation/cartQuery";

const useCheckout = () => {
  const [addShippingAddress] = useMutation(addShippingAddressQuery);

  const { register, handleSubmit } = useForm();
  const [address, setAddress] = useState();

  /**
   * To submit Checkout Address form
   *
   */
  const submitAddressForm = async (data) => {
    try {
      console.log(data);
      setAddress(data);
      const result = await addShippingAddress({
        variables: {
          input: {
            cart_id: localStorage.getItem("cart_id"),
            version: parseInt(localStorage.getItem("cart_version")),
            ...data,
          },
        },
      });
      console.log(
        "🚀 ~ file: useCheckout.js:20 ~ submitAddressForm ~ data:",
        result
      );
    } catch (error) {
      console.log(
        "🚀 ~ file: useCheckout.js:23 ~ submitAddressForm ~ error:",
        error
      );
    }
  };

  return { register, handleSubmit, submitAddressForm, address };
};

export default useCheckout;
