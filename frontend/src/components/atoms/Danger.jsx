// IMPORT
import React from "react";

// COMPONENT
const Danger = ({ text }) => {
  // RENDER
  return (
    <div className="alert alert-danger" role="alert">
      <i className="bi bi-exclamation-triangle-fill me-3"></i>
      {text}
    </div>
  );
};

// EXPORT
export default Danger;
