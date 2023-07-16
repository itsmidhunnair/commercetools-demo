import React, { useEffect } from "react";
import CheckoutSummaryItems from "./checkoutSummaryItems";
import useCart from "../../talon/useCart";
import { getPrice } from "../../utils/productsUtil";

const CheckoutSummary = () => {
  const { getLineItems, products } = useCart();
  console.log(
    "🚀 ~ file: checkoutSummary.jsx:7 ~ CheckoutSummary ~ products:",
    products
  );
  useEffect(() => {
    getLineItems();
  }, []);
  return (
    <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
      <div className="pt-12 md:pt-0 2xl:ps-4">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="mt-8">
          <div className="flex flex-col space-y-4">
            {products?.lineItems.map((item) => (
              <CheckoutSummaryItems data={item} />
            ))}
          </div>
        </div>
        <div className="flex p-4 mt-4">
          <h2 className="text-xl font-bold">ITEMS 2</h2>
        </div>
        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
          Subtotal
          <span className="ml-2">
            {getPrice({
              centAmount: products?.totalPrice?.centAmount,
              fractionDigits: products?.totalPrice?.fractionDigits,
            })}
            &nbsp;{products?.totalPrice.currencyCode}
          </span>
        </div>
        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
          Shipping Tax<span className="ml-2">$10</span>
        </div>
        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
          Total<span className="ml-2">$50.00</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
