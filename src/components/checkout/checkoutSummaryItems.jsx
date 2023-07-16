import React from "react";
import { getPrice } from "../../utils/productsUtil";
import useCart from "../../talon/useCart";

const CheckoutSummaryItems = ({ data }) => {
  const {removeItemFromCart} = useCart()
  return (
    <div className="flex space-x-4">
      <div>
        <img
          src={data?.variant.images[0].url}
          alt="image"
          className="h-28 object-contain"
        />
      </div>
      <div className="flex-1">
        <h2 className="text-sm font-bold">{data?.name.en}</h2>
        <span className="text-red-600">Price</span>{" "}
        {getPrice({
          centAmount: data?.variant.prices[0].value.centAmount,
          fractionDigits: data?.variant.prices[0].value.fractionDigits,
        })}
        &nbsp;{data?.variant.prices[0].value.currencyCode}
        <span className="text-sm font-normal block">
          Qty: <span className="font-medium">{data?.quantity}</span>
        </span>
      </div>
      <div>
        <button
          onClick={() => {
            removeItemFromCart(data?.id);
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CheckoutSummaryItems;
