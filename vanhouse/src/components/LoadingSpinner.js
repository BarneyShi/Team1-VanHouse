import React from "react";
import { Spinner } from "react-bootstrap";
import "../styles/loadingSpinner.css";

function LoadingSpinner() {
  return (
    <div className="loading_trans_div">
      <Spinner
        animation="border"
        className="loading_spinner"
        variant="primary"
      />
    </div>
  );
}

export default LoadingSpinner;
