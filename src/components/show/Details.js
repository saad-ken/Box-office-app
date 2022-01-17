import React from "react";
import { DetailsWrapper } from "./Details.styled";

const Details = ({ status, network, premiered }) => {
  return (
    <DetailsWrapper>
      <p>
        Status: <span>{status}</span>
      </p>
      <p>
        Premiered {premiered} on :
        <span>{network ? ` ${network.name}` : null}</span>
      </p>
    </DetailsWrapper>
  );
};

export default Details;
