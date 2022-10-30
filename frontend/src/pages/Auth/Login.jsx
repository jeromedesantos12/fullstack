// IMPORT
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiLogin } from "../../config/api";
import { validLogin } from "../../utils/validation/validUser";
import ProtectedAuth from "../../utils/protected/ProtectedAuth";
import swal from "sweetalert";
// COMPONENT
const Login = () => {
  // ENV
  const SERVER_URL = import.meta.env.VITE_SERVER_URL;

  // USE STATE
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // TEXT MERAH
  const [txtemail, setTxtemail] = useState("");
  const [txtpassword, setTxtPassword] = useState("");
  const [loginemail, setLoginEmail] = useState("");
  const [loginpassword, setLoginPassword] = useState("");

  // REDIRECT
  const navigate = useNavigate();

  // API <- "VALUE"
  const attr = { email, password };

  // SET KOSONG
  const kosong = () => {
    setEmail("");
    setPassword("");
  };

  // VALIDASI FRONTEND
  const validation = () => {
    const value = validLogin(email, password);
    if (Object.keys(value).length > 0) {
      setTxtemail(value.email);
      setTxtPassword(value.password);
    }
    return value;
  };

  // LOGIN
  const loginAuth = async () => {
    const valid = validation();
    try {
      const { success, error } = await apiLogin(attr);
      if (success) {
        console.log(success.message);
        kosong();
        navigate("/");
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      if (
        error.authEmail ||
        error.authPassword ||
        Object.keys(valid).length > 0
      ) {
        setLoginEmail(error.authEmail);
        setLoginPassword(error.authPassword);
        return false;
      }
      swal("ERROR!", "Login gagal!", "error");
      kosong();
    }
  };

  const googleAuth = () => {
    window.open(`${SERVER_URL}/auth/google`, "_self");
  };

  const facebookAuth = () => {
    window.open(`${SERVER_URL}/auth/facebook/callback`, "_self");
  };

  // RENDER
  return (
    <ProtectedAuth
      content={
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center vh-100">
            <div className="col col-md-4">
              <div className="card p-3">
                <div className="card-body">
                  <form>
                    <div className="row mb-3">
                      <div className="col">
                        <div className="mb-3">
                          <input
                            type="text"
                            placeholder="Email"
                            className={
                              txtemail || loginemail
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            id="email"
                            value={email}
                            onChange={(e) => {
                              setEmail(e.target.value);
                              setTxtemail("");
                              setLoginEmail("");
                            }}
                          />
                          {txtemail && (
                            <div className="form-text text-danger">
                              {txtemail}
                            </div>
                          )}
                          {loginemail && (
                            <div className="form-text text-danger">
                              {loginemail}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <input
                            type="password"
                            placeholder="Password"
                            className={
                              txtpassword || loginpassword
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            id="password"
                            value={password}
                            onChange={(e) => {
                              setPassword(e.target.value);
                              setTxtPassword("");
                              setLoginPassword("");
                            }}
                          />
                          {txtpassword && (
                            <div className="form-text text-danger">
                              {txtpassword}
                            </div>
                          )}
                          {loginpassword && (
                            <div className="form-text text-danger">
                              {loginpassword}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-grid d-md-flex gap-2 row px-2">
                      <button
                        className="col btn btn-danger mb-1"
                        onClick={(e) => {
                          e.preventDefault();
                          googleAuth();
                        }}
                      >
                        <i className="bi bi-google me-3" />
                        Google
                      </button>
                      <button
                        className="col btn btn-primary mb-1"
                        onClick={(e) => {
                          e.preventDefault();
                          facebookAuth();
                        }}
                      >
                        <i className="bi bi-facebook me-3" />
                        Facebook
                      </button>
                      <button
                        className="btn btn-success mb-2"
                        onClick={(e) => {
                          e.preventDefault();
                          loginAuth();
                        }}
                      >
                        Login
                      </button>
                      <Link
                        to={"/register"}
                        className="text-secondary text-center text-decoration-none"
                      >
                        Belum punya akun ?
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

// EXPORT
export default Login;
