import React, { useEffect } from "react";
import { useLazyQuery, useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";

// GQL Query to fetch all products
import { getProducts } from "../../graphQl/queries/productQuery";

// Components
import BreadCrumps from "../common/breadCrumps.js";
import Loader from "../common/loader";
import PlpCard from "./plpCard";
import useProducts from "../../talon/useProducts";

/**
 *
 */
const PlpContainer = () => {
  const { data, loading, error, breadCrumpsData } = useProducts();

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>No Product Found1</h1>;
  }

  return (
    <>
      <BreadCrumps data={breadCrumpsData} />
      <div className="container max-w-7xl flex flex-wrap justify-between mx-auto gap-5 max-sm:justify-center">
        {data?.products.map((product) => (
          <PlpCard data={product} key={product.id} />
        ))}
      </div>
      <div>
        <button>Show More</button>
      </div>
    </>
  );
};

export default PlpContainer;
