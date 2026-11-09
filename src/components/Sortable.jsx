import React from "react";
import { LuChevronDown, LuChevronUp } from "react-icons/lu";
import { useParams, useSearchParams } from "react-router-dom";

const Sortable = ({ children, handleSort, sort_by, align }) => {
  const handleSortAsc = () => {
    handleSort({
      sort_by: sort_by,
      sort_direction: "asc",
    });
  };

  const handleSortDesc = () => {
    handleSort({
      sort_by: sort_by,
      sort_direction: "desc",
    });
  };

  return (
    <div
      className={`flex items-center gap-1 ${
        align === "right" ? "justify-end" : "justify-start"
      }`}
    >
      <span className=" flex flex-col">
        <button className=" hover:bg-stone-300" onClick={handleSortAsc}>
          <LuChevronUp />
        </button>
        <button className=" hover:bg-stone-300" onClick={handleSortDesc}>
          <LuChevronDown />
        </button>
      </span>
      <span>{children}</span>
    </div>
  );
};

export default Sortable;
