import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { find } from "lodash";

import { getProductById } from "../../graphQl/queries/productQuery";
import Loader from "../common/loader";
import { CartBtn } from "../common/buttons/addToCart";
import { formatAttributes, getPrice } from "../../utils/productsUtil";
import BreadCrumps from "../common/breadCrumps.js";

const PdpContainer = () => {
  const { id } = useParams();

  const [show, setShow] = useState(false);
  const [show2, setShow2] = useState(false);

  const { data, loading, error } = useQuery(getProductById, {
    variables: { productId: id },
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>Page 404</h1>;
  }

  const product = data?.product;
  const name = product?.name.en;
  const description = product?.metaDescription?.en;

  const designer = find(product?.masterVariant?.attributes, {
    name: "designer",
  })?.value.label;
  const image = product.masterVariant.images[0].url;

  const attributes = formatAttributes({
    attributes: product.masterVariant?.attributes,
  });

  const size = find(product.masterVariant?.attributes, {
    name: "size",
  })?.value;

  const color = find(product.masterVariant?.attributes, {
    name: "color",
  })?.value;

  const currencyCode = product.masterVariant.prices[0]?.value.currencyCode;
  const centAmount = product.masterVariant.prices[0]?.value.centAmount;
  const fractionDigits = product.masterVariant.prices[0]?.value.fractionDigits;

  const breadCrumpsData = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Products",
      link: -1,
    },
    {
      label: name,
      link: "/products",
      active: true,
    },
  ];

  return (
    <>
      <BreadCrumps data={breadCrumpsData} />
      <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4">
        <div className="xl:w-2/6 lg:w-2/5 w-80 md:block hidden">
          <img className="w-full" alt="img of a girl posing" src={image} />
        </div>
        <div className="md:hidden">
          <img className="w-full" alt="img of a girl posing" src={image} />
          {/* <div className="flex items-center justify-between mt-3 space-x-4 md:space-x-0">
          <img
            alt="img-tag-one"
            className="md:w-48 md:h-48 w-full"
            src={image}
          />
        </div> */}
        </div>
        <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
          <div className="border-b border-gray-200 pb-6">
            <h1
              className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
            >
              {name}
            </h1>
            <p className="text-sm pt-3 leading-none text-gray-600">
              <span className="italic">by:&nbsp;</span>
              {designer}
            </p>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">Colours</p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 uppercase">
                {color?.key}
              </p>
              <div
                className={`
                border-2
                border-black
                w-6
								h-6
								ml-3
								mr-4
								cursor-pointer
                bg-gray-400
                `}
                style={{ backgroundColor: `${color?.key}` }}
              ></div>
              <svg
                className="cursor-pointer"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L1 9"
                  stroke="#4B5563"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="py-4 border-b border-gray-200 flex items-center justify-between">
            <p className="text-base leading-4 text-gray-800">Size</p>
            <div className="flex items-center justify-center">
              <p className="text-sm leading-none text-gray-600 mr-3">{size}</p>
              <svg
                className="cursor-pointer"
                width="6"
                height="10"
                viewBox="0 0 6 10"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 1L5 5L1 9"
                  stroke="#4B5563"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>
          <div className="flex justify-between items-center py-3">
            <div>
              <span class="title-font font-medium text-2xl text-gray-900">
                {getPrice({ centAmount, fractionDigits })}
              </span>{" "}
              {currencyCode}
            </div>
            <div className="w-36">
              <CartBtn />
            </div>
          </div>
          <div>
            <p className="text-base lg:leading-tight leading-normal text-gray-600 mt-7">
              {description}
            </p>
          </div>
          <div>
            <div className="border-t border-b py-4 mt-7 border-gray-200">
              <div
                onClick={() => setShow(!show)}
                className="flex justify-between items-center cursor-pointer"
              >
                <p className="text-base leading-4 text-gray-800">
                  More Details
                </p>
                <button
                  className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                  aria-label="show or hide"
                >
                  <svg
                    className={
                      "transform " + (show ? "rotate-180" : "rotate-0")
                    }
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L5 5L1 1"
                      stroke="#4B5563"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={
                  "pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
                  (show ? "block" : "hidden")
                }
                id="sect"
              >
                {" "}
                {attributes.map((attribute) => (
                  <p className="text-base leading-4 mt-7 text-gray-600">
                    <span className="font-semibold">{attribute.name}</span>:{" "}
                    {`${attribute.value}`}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div>
            <div className="border-b py-4 border-gray-200">
              <div
                onClick={() => setShow2(!show2)}
                className="flex justify-between items-center cursor-pointer"
              >
                <p className="text-base leading-4 text-gray-800">
                  Shipping and returns
                </p>
                <button
                  className="
									cursor-pointer
									focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
									rounded
								"
                  aria-label="show or hide"
                >
                  <svg
                    className={
                      "transform " + (show2 ? "rotate-180" : "rotate-0")
                    }
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 1L5 5L1 1"
                      stroke="#4B5563"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
              <div
                className={
                  "pt-4 text-base leading-normal pr-12 mt-4 text-gray-600 " +
                  (show2 ? "block" : "hidden")
                }
                id="sect"
              >
                You will be responsible for paying for your own shipping costs
                for returning your item. Shipping costs are nonrefundable.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PdpContainer;
