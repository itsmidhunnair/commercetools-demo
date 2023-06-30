import { useQuery } from "@apollo/client";
import React from "react";
import { getProducts } from "../../graphQl/query";
import BreadCrumps from "../common/breadCrumps.js";
import Loader from "../common/loader";
import PlpCard from "./plpCard";

const PlpContainer = () => {
  const { loading, error, data } = useQuery(getProducts);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h1>No Product Found1</h1>;
  }
  const breadCrumpsData = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Products",
      link: "/products",
    },
  ];

  return (
    <>
      <BreadCrumps data={breadCrumpsData} />
      <div className="container max-w-7xl flex flex-wrap justify-between mx-auto gap-5 max-sm:justify-center">
        {data?.products.map((product) => (
          <PlpCard data={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default PlpContainer;
