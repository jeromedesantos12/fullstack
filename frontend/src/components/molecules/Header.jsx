// IMPORT
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiLogout, apiVerify } from "../../config/api";
import swal from "sweetalert";

// COMPONENT
const Header = () => {
  // USE STATE
  const [student, setStudent] = useState(false);
  const [user, setUser] = useState(false);
  const [profile, setProfile] = useState(false);

  const [verify, setVerify] = useState(""); // ada atau nggak tokennya?
  const [info, setInfo] = useState(""); // token ada && role: user (kunci) cuma bedanya tidak diredirect
  const { success } = verify;
  const { id, role } = info;

  // USE EFFECT
  useEffect(() => {
    hashSanitize();
    verifyToken();
    if (window.location.pathname === "/") {
      setStudent(true);
    } else if (window.location.pathname === "/user") {
      setUser(true);
    } else if (window.location.pathname === `/profile/${id}`) {
      setProfile(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // REDIRECT
  const navigate = useNavigate();

  // BERSIHKAN PATH HASH "#_=_" DARI LOGIN FB
  const hashSanitize = () => {
    if (window.location.hash && window.location.hash == "#_=_") {
      window.history.pushState("", document.title, window.location.pathname);
    }
  };

  // CEK TOKEN
  const verifyToken = async () => {
    try {
      const { success, error } = await apiVerify();
      if (success) {
        console.log(success.message);
        setVerify({ success: true });
        setInfo(success.info);
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      setVerify({ error: true });
    }
  };

  // LOGOUT
  const logout = async () => {
    try {
      const { success, error } = await apiLogout();
      if (success) {
        console.log(success.message);
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
  };

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
        logout();
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
                setProfile(false);
              }}
            >
              <i className="bi bi-book-half me-2" />
            </Link>

            <div className={success && role === "USER" ? "d-none" : "d-block"}>
              <Link
                to="/user"
                className={
                  user ? "nav-item nav-link active" : "nav-item nav-link"
                }
                onClick={() => {
                  setUser(true);
                  setStudent(false);
                  setProfile(false);
                }}
              >
                <i className="bi bi-person-fill me-2" />
              </Link>
            </div>

            <Link
              to={success ? `profile/${id}` : null}
              className={
                profile ? "nav-item nav-link active" : "nav-item nav-link"
              }
              onClick={() => {
                setProfile(true);
                setUser(false);
                setStudent(false);
              }}
            >
              <i className="bi bi-gear-fill me-2" />
            </Link>

            <div
              onClick={() => {
                logoutAlert();
              }}
              className="nav-item nav-link"
            >
              <i className="bi bi-power me-2" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

// EXPORT
export default Header;
