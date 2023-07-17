import React from "react";
import { useState } from "react";
import { CartContext } from "./cartContext";

const CartContextProvider = (props) => {
    const [cartItem, setCartItem] = useState();
    
  return (
    <CartContext.Provider value={{ cartItem, setCartItem }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
