// IMPORT
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ProtectedUser } from "../../utils/protected/ProtectedUser";
import swal from "sweetalert";
import jwtDecode from "jwt-decode";

// COMPONENT
const Header = () => {
  // LOCAL STORAGE
  const token = localStorage.getItem("token");
  let decodedToken = token ? jwtDecode(token) : null;

  // USE STATE
  const [student, setStudent] = useState(false);
  const [user, setUser] = useState(false);

  // USE EFFECT
  useEffect(() => {
    if (window.location.pathname === "/") {
      setStudent(true);
    } else if (window.location.pathname === "/user") {
      setUser(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // REDIRECT
  const navigate = useNavigate();

  // DELETE ALERT
  const logoutAlert = async () => {
    try {
      const ok = await swal({
        title: "Logout sekarang?",
        text: "Access token akan dicabut setelah logout!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (ok) {
        localStorage.removeItem("token");
        navigate("/login");
        swal("OK! Anda telah logout!", {
          icon: "success",
        });
      } else {
        swal("Anda masih login!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // RENDER
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark w-100 position-fixed top-0">
      <div className="container">
        <Link to="/" className="navbar-brand fw-bold">
          STUDENT APP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div className="navbar-nav">
            <Link
              to="/"
              className={
                student ? "nav-item nav-link active" : "nav-item nav-link"
              }
              onClick={() => {
                setStudent(true);
                setUser(false);
              }}
            >
              Students
            </Link>

            <ProtectedUser
              token={token}
              content={
                <Link
                  to="/user"
                  className={
                    user ? "nav-item nav-link active" : "nav-item nav-link"
                  }
                  onClick={() => {
                    setUser(true);
                    setStudent(false);
                  }}
                >
                  Users
                </Link>
              }
            />
            <Link
              to={token ? `profile/${decodedToken.id}` : null}
              className="nav-item nav-link"
            >
              Profile
            </Link>

            <div
              onClick={() => {
                logoutAlert();
              }}
              className="nav-item nav-link"
            >
              Logout
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// EXPORT
export default Header;
