import React from "react";

const ShowDateTime = ({ timestamp, className = "" }) => {
  const date = new Date(timestamp);

  const currentDate = date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
  const currentTime = date.toLocaleTimeString("en-GB", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return (
    <div className={className}>
      <p className=" text-xs text-nowrap">{currentDate}</p>
      <p className=" text-xs text-nowrap">{currentTime}</p>
    </div>
  );
};

export default ShowDateTime;
