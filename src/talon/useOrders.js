import { useQuery } from "@apollo/client";
import React from "react";
import { fetchAllOrdersQuery } from "../graphQl/queries/orderQuery";

const useOrders = () => {
  const { data, loading, error } = useQuery(fetchAllOrdersQuery);

  return { orders:data?.fetchOrders, loading, error };
};

export default useOrders;
