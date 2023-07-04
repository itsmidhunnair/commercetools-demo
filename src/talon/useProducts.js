import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { getProducts } from "../graphQl/queries/productQuery";

const useProducts = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();

  const searchParam = searchQuery.get("search");

  const [getAllProducts, { data, loading, error }] = useLazyQuery(getProducts);

  useEffect(() => {
    getAllProducts({ variables: { search: searchParam } });
  }, [searchParam]);

  // To Render BreadCrumps Dynamically
  const breadCrumpsData = [
    {
      label: "Home",
      link: "/",
    },
    {
      label: "Products",
      link: "/products",
      active: true,
    },
  ];

  // const { loading, error, data } = useQuery(getProducts);
  return { data, loading, error, breadCrumpsData };
};

export default useProducts;
