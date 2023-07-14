import React from "react";
import { Link } from "react-router-dom";

import { destructData } from "../../utils/productsUtil";
import { CartBtn } from "../common/buttons/addToCart";

import PropTypes from "prop-types";
import useCart from "../../talon/useCart";

const PlpCard = ({ data }) => {
  const { name, image, currencyCode, price, gender, style, sku } =
    destructData(data);

  const { addToCart } = useCart();

  return (
    <div className="w-60 group bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/product/${data?.id}`}>
        <img
          className="p-8 rounded-t-lg w-44 mx-auto group-hover:scale-125 transition-all duration-500"
          src={image}
          alt="product"
        />
        <div className="px-5 pb-3">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white h-16">
            {name}
          </h5>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-700 dark:text-white">
              {price}
              <span className="italic text-sm text-gray-700 font-medium">
                {currencyCode}
              </span>
            </span>
          </div>
        </div>
        <div className="px-4">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {gender}
          </span>
          <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {style}
          </span>
        </div>
      </Link>
      <div className="p-4 w-max">
        <button
          className="bg-slate-700 p-2 rounded-md text-white active:bg-slate-600"
          onClick={() => addToCart({ sku: sku })}
        >
          Add To Cart
        </button>
      </div>
    </div>
  );
};

export default PlpCard;
