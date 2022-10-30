import React from "react";
import { Link } from "react-router-dom";
import { Gap } from "../../import/components/atoms";
import { ProtectedStudent } from "../../utils/protected/ProtectedStudent";

const NotFound = () => {
  // LOCAL STORAGE
  const token = localStorage.getItem("token");

  // RENDER
  return (
    <ProtectedStudent
      token={token}
      content={
        <div className="container">
          <Gap height={40} />
          <div className="row d-flex justify-content-center">
            <div className="col col-md-12 text-center">
              <h1 className="display-1 fw-bold">404</h1>
              <p className="fs-3">
                <span className="text-danger">Opps!</span> Page not found.
              </p>
              <p className="lead">
                Halaman yang anda cari tidak ditemukan pada dokumen manapun.
              </p>
              <Link to="/" className="btn btn-success">
                Home
              </Link>
            </div>
          </div>
        </div>
      }
    />
  );
};

// EXPORT
export default NotFound;
