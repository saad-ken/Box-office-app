import React from "react";
import { Link } from "react-router-dom";

const ShowCard = ({ id, name, image, summary }) => {
  const summaryAsText = summary
    ? `${summary.split(" ").slice(0, 11).join(" ").replace(/<.+?>/g, "")}...`
    : "No description";

  return (
    <div>
      <div>
        <img src={image} alt="show" />
      </div>
      <h1>{name}</h1>
      <p>{summaryAsText}</p>
      <Link to={`/show/${id}`}>Read more</Link>
      <button type="button">Star me</button>
    </div>
  );
};

export default ShowCard;
