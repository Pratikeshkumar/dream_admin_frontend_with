import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const withRouter = (Component) => {
  const NavigateWithRouter = (props) => {
    const navigate = useNavigate();

    return <Component {...props} navigate={navigate} />;
  };

  return NavigateWithRouter;
};

export default withRouter;
