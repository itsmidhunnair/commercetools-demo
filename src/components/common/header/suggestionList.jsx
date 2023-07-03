import { useSearchParams } from "react-router-dom";

const SuggestionList = ({ data, setValue, setSuggestions }) => {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <ul
      className="absolute bg-gray-100 top-10 w-full rounded-lg px-2"
      onClick={(e) => {
        setSearchParams({ search: e.target.innerText }, { replace: true });
        setValue("search", e.target.innerText);
        setSuggestions();
      }}
    >
      {data?.map((keyword) => (
        <li
          dataValue={keyword}
          className="py-2 border-b-2 border-gray-200 last:border-0 hover:bg-gray-200"
        >
          {keyword?.text}
        </li>
      ))}
    </ul>
  );
};

export default SuggestionList;
