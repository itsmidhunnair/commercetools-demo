import { find } from "lodash";
import React from "react";
import { Link } from "react-router-dom";
import { getPrice } from "../../utils/productsUtil";

const PlpCard = ({ data }) => {
  const name = data.name.en;
  const image = data.masterVariant.images[0].url;
  const currencyCode = data.masterVariant.prices[0].value.currencyCode;
  const centAmount = data.masterVariant.prices[0].value.centAmount;
  const fractionDigits = data.masterVariant.prices[0].value.fractionDigits;

  // To get just gender of of each item
  const gender = find(data.masterVariant.attributes, { name: "gender" })?.value
    .key;

  // To get Available colors of each product (incl. Variants)
  const availableColors = data.variants.map(
    (variant) => find(variant.attributes, { name: "color" }).value.key
  );

  return (
    <div className="w-60 group bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <Link to={`/product/${data?.id}`}>
        <img
          className="p-8 rounded-t-lg w-44 mx-auto group-hover:scale-125 transition-all duration-500"
          src={image}
          alt="product"
        />
        <div className="px-5 pb-5">
          <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white h-15">
            {name}
          </h5>
          <div className="flex items-center justify-between">
            <span className="text-lg font-bold text-blue-700 dark:text-white">
              {getPrice({ centAmount, fractionDigits })}
              <span className="italic text-sm text-gray-700 font-medium">
                {currencyCode}
              </span>
            </span>
          </div>
        </div>
        <div className="p-4">
          <span className="bg-gray-100 text-gray-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-gray-700 dark:text-gray-300">
            {gender}
          </span>
        </div>
      </Link>
    </div>
  );
};

export default PlpCard;
