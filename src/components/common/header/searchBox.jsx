import { size } from "lodash";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import useSearch from "../../../hooks/useSearch";
import SuggestionList from "./suggestionList";

const SearchBox = () => {
  const [searchQuery, setSearchQuery] = useSearchParams();

  const { register, handleSubmit, setValue } = useForm();

  useEffect(() => {
    setValue("search", searchQuery.get("search"));
  }, [searchQuery]);

  const { suggestFunction, suggestions, loading, submitForm, setSuggestions } =
    useSearch();

  return (
    <div className="relative">
      <form onSubmit={handleSubmit(submitForm)}>
        <div className="relative">
          <input
            {...register("search")}
            onChange={(e) => {
              suggestFunction(e);
            }}
            type="search"
            className="pl-10 pr-2 h-10 py-1 rounded-lg border border-gray-200 focus:border-gray-300 focus:outline-none focus:shadow-inner leading-none"
            placeholder="Search"
          />

          <button type="submit">
            <svg
              className="h-6 w-6 text-gray-300 ml-2 mt-2 stroke-current absolute top-0 left-0"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
        </div>
      </form>
      {size(suggestions) > 0 && (
        <SuggestionList
          data={suggestions?.suggest}
          setValue={setValue}
          setSuggestions={setSuggestions}
        />
      )}
    </div>
  );
};

export default SearchBox;
