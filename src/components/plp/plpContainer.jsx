import { useLazyQuery, useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../../graphQl/queries/productQuery";
import BreadCrumps from "../common/breadCrumps.js";
import Loader from "../common/loader";
import PlpCard from "./plpCard";

const PlpContainer = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();

  const searchParam = searchQuery.get("search");

  const [getAllProducts, { data, loading, error }] = useLazyQuery(getProducts);

  useEffect(() => {
    getAllProducts({ variables: { search: searchParam } });
  }, [searchParam]);

  // const { loading, error, data } = useQuery(getProducts);

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
      link: "..",
      active: true,
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
      <div>
        <button>Show More</button>
      </div>
    </>
  );
};

export default PlpContainer;
