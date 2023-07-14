import React from "react";
import { Link } from "react-router-dom";
import useCart from "../../talon/useCart";
import { getPrice } from "../../utils/productsUtil";

const CartItem = ({ data }) => {
  const { removeItemFromCart } = useCart();

  return (
    <li className="flex py-6">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img
          src={data?.variant.images[0].url}
          alt="Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt."
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="ml-4 flex flex-1 flex-col">
        <div>
          <div className="flex justify-between text-base font-medium text-gray-900">
            <h3 className="text-sm">
              <Link to={`/product/${data.productId}`}>{data?.name.en}</Link>
            </h3>
            <p className="ml-4">
              {getPrice({
                centAmount: data?.variant.prices[0].value.centAmount,
                fractionDigits: data?.variant.prices[0].value.fractionDigits,
              })}
              &nbsp;{data?.variant.prices[0].value.currencyCode}
            </p>
          </div>
        </div>
        <div className="flex flex-1 items-end justify-between text-sm">
          <p className="text-gray-500 flex items-center gap-x-1">
            Qty{" "}
            <span>
              <input
                type="number"
                max={25}
                min={1}
                defaultValue={data?.quantity}
                className="pl-1 text-center text-lg outline-none border-2 rounded w-9 number-input"
              />
            </span>
          </p>
          <div className="flex">
            <button
              type="button"
              onClick={() => {
                removeItemFromCart(data?.id);
              }}
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
