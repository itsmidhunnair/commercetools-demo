import { useLazyQuery } from "@apollo/client";
import { debounce } from "lodash";
import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { getSuggestions } from "../graphQl/queries/searchQuery";

const useSearch = () => {
  const navigate = useNavigate();

  const [suggestions, setSuggestions] = useState();

  // const [searchParams, setSearchParams] = useSearchParams();

  const [getSuggestedKeywords, { data, loading }] =
    useLazyQuery(getSuggestions);

  useEffect(() => {
    setSuggestions(data);
  }, [data]);

  const handleChange = (e) => {
    if (e.target.value === "") {
      setSuggestions(null);
      return;
    } else {
      getSuggestedKeywords({ variables: { search: e.target.value } });
    }
  };

  /**
   * Will trigger the change function after 400ms
   */
  const suggestFunction = debounce(handleChange, 400);

  const submitForm = ({ search }) => {
    navigate(`/products?search=${search}`);
    // setSearchParams({ search }, { replace: true });
  };

  return {
    suggestFunction,
    suggestions,
    loading,
    submitForm,
    setSuggestions,
  };
};

export default useSearch;
