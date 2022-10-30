// IMPORT
import React from "react";

// COMPONENT
const Footer = () => {
  // RENDER
  return (
    <footer className="text-black text-center p-3 bg-secondary bg-opacity-25 w-100 position-absolute bottom-0">
      <div className="container">
        <i className="bi bi-c-circle me-1" />
        Created by
        <a
          href="https://github.com/jeromedesantos12"
          className="text-black fw-bold text-decoration-none ms-2"
        >
          Jeremy Santoso
        </a>
      </div>
    </footer>
  );
};

// EXPORT
export default Footer;
