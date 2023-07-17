import React, { useState } from "react";
import { CheckoutContext } from "./checkoutContext";

const CheckoutContextProvider = (props) => {
  const [step, setStep] = useState([]);

  return (
    <CheckoutContext.Provider value={{ step, setStep }}>
      {props.children}
    </CheckoutContext.Provider>
  );
};

export default CheckoutContextProvider;
