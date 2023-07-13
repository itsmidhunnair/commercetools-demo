import React from "react";

const CartItem = () => {
  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src="https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg"
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="text-sm">
              <a href="#">Throwback Hip Bag</a>
            </h3>
            <p className="ml-4">$90.00</p>
          </div>
          <p className="mt-1 text-sm text-gray-500">Salmon</p>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500 flex items-center gap-x-1">
            Qty{" "}
            <span>
              <input
                type="number"
                max={25}
                min={1}
                defaultValue={1}
                className="pl-1 text-center text-lg outline-none border-2 rounded w-9 number-input"
              />
            </span>
          </p>
          <div className="flex">
            <button
              type="button"
              className="font-medium text-indigo-600 hover:text-indigo-500"
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
