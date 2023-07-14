import React from "react";
import CartItem from "./cartItem";

const CartItemContainer = ({ lineItems }) => {
  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200">
      {lineItems?.map((item) => (
        <CartItem data={item} />
      ))}
    </ul>
  );
};

export default CartItemContainer;
