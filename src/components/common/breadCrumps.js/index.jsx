import React from "react";
import { Link, useNavigate } from "react-router-dom";

const BreadCrumps = ({ data }) => {
  const navigate = useNavigate()
  return (
    <div className="my-4 container max-w-7xl mx-auto">
      {data.map((obj, index) => (
        <Link className="text-gray-700 text-sm" to={obj.link === -1 ? '...' : obj.link} onClick={()=>navigate(obj.link)}>
          <span className={obj?.active && "font-bold"}>{obj.label} </span>
          {index < data.length - 1 && <span className="px-1">&#8827;</span>}
        </Link>
      ))}
    </div>
  );
};

export default BreadCrumps;
