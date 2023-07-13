import React from "react";
import CartItem from "./cartItem";

const CartItemContainer = () => {
  const lineItems = [4, 5, 6, 89, 7, 2, 9, 1, 9, 5];
  return (
    <ul role="list" className="-my-6 divide-y divide-gray-200">
      {lineItems.map((item) => (
        <CartItem />
      ))}
    </ul>
  );
};

export default CartItemContainer;
