import { Box } from "@chakra-ui/react";
import React from "react";

const Loader = () => {
  return (
    <div className="lds-ring">
      <div />
      <div />
      <div />
      <div />
    </div>
  );
};

export default Loader;
