import React, { useEffect } from "react";
import CheckoutSummaryItems from "./checkoutSummaryItems";
import useCart from "../../talon/useCart";
import { getPrice } from "../../utils/productsUtil";
import { useContext } from "react";
import { CartContext } from "../../context/cart/cartContext";

const CheckoutSummary = () => {
  const { getLineItems } = useCart();

  const { cartItem } = useContext(CartContext);

  useEffect(() => {
    getLineItems();
  }, []);

  if (!cartItem) {
    return "Please Add to cart Something and proceed!";
  }

  return (
    <div className="flex flex-col w-full ml-0 lg:ml-12 lg:w-2/5">
      <div className="pt-12 md:pt-0 2xl:ps-4">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <div className="mt-8">
          <div className="flex flex-col space-y-4">
            {cartItem?.lineItems.map((item) => (
              <CheckoutSummaryItems data={item} />
            ))}
          </div>
        </div>
        <div className="flex p-4 mt-4">
          <h2 className="text-xl font-bold">ITEMS 2</h2>
        </div>
        {cartItem?.taxedPrice && (
          <>
            <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
              Subtotal
              <span className="ml-2">
                {getPrice({
                  centAmount: cartItem?.taxedPrice?.totalNet.centAmount,
                  fractionDigits: cartItem?.taxedPrice?.totalNet.fractionDigits,
                })}
                &nbsp;{cartItem?.totalPrice.currencyCode}
              </span>
            </div>
            <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
              Total Tax
              <span className="ml-2">
                {getPrice({
                  centAmount: cartItem?.taxedPrice?.totalTax.centAmount,
                  fractionDigits: cartItem?.totalPrice?.fractionDigits,
                })}
                &nbsp;{cartItem?.totalPrice.currencyCode}
              </span>
            </div>
          </>
        )}
        <div className="flex items-center w-full py-4 text-sm font-semibold border-b border-gray-300 lg:py-5 lg:px-3 text-heading last:border-b-0 last:text-base last:pb-0">
          Total
          <span className="ml-2">
            {getPrice({
              centAmount: cartItem?.totalPrice?.centAmount,
              fractionDigits: cartItem?.totalPrice?.fractionDigits,
            })}
            &nbsp;{cartItem?.totalPrice.currencyCode}
          </span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutSummary;
