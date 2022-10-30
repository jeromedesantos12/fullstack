// IMPORT
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiLogin } from "../../config/api";
import { validLogin } from "../../utils/validation/validUser";
import { ProtectedAuth } from "../../utils/protected/ProtectedAuth";
import swal from "sweetalert";

// COMPONENT
const Login = () => {
  // LOCAL STORAGE
  const token = localStorage.getItem("token");

  // USE STATE
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");

  // TEXT MERAH
  const [txtuser, setTxtUser] = useState("");
  const [txtpassword, setTxtPassword] = useState("");

  // TEXT MERAH (VALIDASI DUPLIKAT BACKEND)
  const [loginuser, setLoginUser] = useState("");
  const [loginpassword, setLoginPassword] = useState("");

  // REDIRECT
  const navigate = useNavigate();

  // api <- VALUE
  const attr = { user, password };

  // SET KOSONG
  const kosong = () => {
    setUser("");
    setPassword("");
  };

  // VALIDASI FRONTEND
  const validation = () => {
    const value = validLogin(user, password);
    if (Object.keys(value).length > 0) {
      setTxtUser(value.user);
      setTxtPassword(value.password);
    }
    return value;
  };

  // LOGIN
  const login = async () => {
    const valid = validation();
    try {
      const { success, error } = await apiLogin(attr);
      if (success) {
        console.log(success.token);
        localStorage.setItem("token", success.token);
        swal("OK!", "Login Berhasil!", "success");
        kosong();
        navigate("/");
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      if (
        error.authUser ||
        error.authPassword ||
        Object.keys(valid).length > 0
      ) {
        setLoginUser(error.authUser);
        setLoginPassword(error.authPassword);
        return false;
      }
      swal("ERROR!", "Login gagal!", "error");
      kosong();
    }
  };

  // RENDER
  return (
    <ProtectedAuth
      token={token}
      content={
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center vh-100">
            <div className="col col-md-3">
              <div className="card p-3">
                <div className="card-body">
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      login();
                    }}
                  >
                    <div className="row mb-3">
                      <div className="col">
                        <div className="mb-3">
                          <input
                            type="text"
                            placeholder="Username atau email"
                            className={
                              txtuser || loginuser
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            id="user"
                            value={user}
                            onChange={(e) => {
                              setUser(e.target.value);
                              setTxtUser("");
                              setLoginUser("");
                            }}
                          />
                          {txtuser && (
                            <div className="form-text text-danger">
                              {txtuser}
                            </div>
                          )}
                          {loginuser && (
                            <div className="form-text text-danger">
                              {loginuser}
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
                    <div className="row px-2">
                      <button className="btn btn-success mb-3">Login</button>
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
