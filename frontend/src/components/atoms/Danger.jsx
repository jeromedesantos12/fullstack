import React from "react";

// DATA TIDAK DITEMUKAN
const Danger = ({ text }) => {
  return (
    <div className="alert alert-danger" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-3"></i>
      {text}
    </div>
  );
};

export default Danger;
