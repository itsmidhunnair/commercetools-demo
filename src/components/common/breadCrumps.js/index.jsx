import React from "react";
import { Link } from "react-router-dom";

const BreadCrumps = ({ data }) => {
  return (
    <div className="my-4 container max-w-7xl mx-auto">
      {data.map((obj, index) => (
        <Link className="text-gray-700 text-sm" to={obj.link}>
          <span className={obj?.active && 'font-bold'}>{obj.label} </span>
          {index < data.length - 1 && <span className="px-1">&#8827;</span>}
        </Link>
      ))}
    </div>
  );
};

export default BreadCrumps;
