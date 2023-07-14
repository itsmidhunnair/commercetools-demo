import React, { useEffect } from "react";
import useCart from "../../talon/useCart";
import { getPrice } from "../../utils/productsUtil";
import Loader from "../common/loader";
import CartItemContainer from "./cartItemContainer";

const MiniCart = ({ toggleMiniCart }) => {
  const { getLineItems, products,loading } = useCart();

  useEffect(() => {
    getLineItems();
  }, []);

  return (
    <div
      className="absolute z-10 h-max"
      aria-labelledby="slide-over-title"
      role="dialog"
      aria-modal="true"
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity top-[72px] max-sm:top-[94px]" />
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10 sm:right-16">
            <div className="pointer-events-auto w-screen max-w-md">
              <div className="flex mt-[72px] max-sm:mt-[94px] max-h-[86vh] no-scrollbar h-max flex-col overflow-y-scroll bg-white shadow-xl">
                <div className="flex-1 overflow-y-auto flex flex-col h-full px-4 py-6 sm:px-6">
                  <div className="flex items-start justify-between">
                    <h2
                      className="text-lg font-medium text-gray-900"
                      id="slide-over-title"
                    >
                      Shopping cart
                    </h2>
                    <div className="ml-3 flex h-5 items-center">
                      <button
                        type="button"
                        onClick={toggleMiniCart}
                        className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                      >
                        <span className="sr-only">Close panel</span>
                        <svg
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                      {loading ? (
                      <Loader />
                        ) : (
                  <div className="mt-8 no-scrollbar overflow-y-scroll max-sm:grow">
                    <div className="flow-root ">
                        <CartItemContainer lineItems={products?.lineItems} />
                    </div>
                  </div>
                      )}
                </div>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flex justify-between text-base font-medium text-gray-900">
                    <p>Subtotal</p>
                    <p>
                      $
                      {getPrice({
                        centAmount: products?.totalPrice?.centAmount,
                        fractionDigits: products?.totalPrice?.fractionDigits,
                      })}
                    </p>
                  </div>
                  <p className="mt-0.5 text-sm text-gray-500">
                    Shipping and taxes calculated at checkout.
                  </p>
                  <div className="mt-6">
                    <a
                      href="#"
                      className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                    >
                      Checkout
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MiniCart;
