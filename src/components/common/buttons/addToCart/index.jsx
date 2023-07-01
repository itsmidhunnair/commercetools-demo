import React, { useState } from "react";

export const CartBtn = () => {
  const [cartQty, setCartQty] = useState(0);

  const increment = () => {
    setCartQty(cartQty + 1);
  };

  const decrement = () => {
    setCartQty(cartQty - 1);
  };

  return (
    <div>
      {cartQty > 0 ? (
        <div className="flex items-center justify-between">
          <button
            onClick={() => decrement()}
            className="bg-gray-800 rounded-md h-10 w-10 font-bold text-xl text-white hover:bg-gray-600"
          >
            -
          </button>

          <span className="px-4 font-semibold text-xl">{cartQty}</span>

          <button
            onClick={() => increment()}
            className="bg-gray-800 rounded-md h-10 w-10 font-bold text-xl text-white hover:bg-gray-600"
          >
            +
          </button>
        </div>
      ) : (
        <button
          onClick={() => increment()}
          class="flex ml-auto text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded"
        >
          Add To Cart
        </button>
      )}
    </div>
  );
};
