// IMPORT
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { apiRegister } from "../../config/api";
import { validProfile } from "../../utils/validation/validUser";
import ProtectedAuth from "../../utils/protected/ProtectedAuth";
import swal from "sweetalert";

// COMPONENT
const Register = () => {
  // USE STATE
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  // TEXT MERAH
  const [txtnama, setTxtNama] = useState("");
  const [txtemail, setTxtEmail] = useState("");
  const [txtpassword, setTxtPassword] = useState("");
  const [txtpasswordConfirmation, setTxtPasswordConfirmation] = useState("");
  const [duplicateemail, setDuplicateEmail] = useState("");

  // REDIRECT
  const navigate = useNavigate();

  // API <- "VALUE"
  const attr = { nama, email, password, passwordConfirmation };

  // SET KOSONG
  const kosong = () => {
    setNama("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  // VALIDASI FRONTEND
  const validation = () => {
    const value = validProfile(nama, email, password, passwordConfirmation);
    if (Object.keys(value).length > 0) {
      setTxtNama(value.nama);
      setTxtEmail(value.email);
      setTxtPassword(value.password);
      setTxtPasswordConfirmation(value.passwordConfirmation);
    }
    return value;
  };

  // REGISTER
  const registerData = async () => {
    const valid = validation();
    try {
      const { success, error } = await apiRegister("user", attr);
      if (success) {
        console.log(success.registered_user);
        swal("OK!", "Data berhasil disimpan!", "success");
        kosong();
        navigate("/login");
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      if (error.addEmail || Object.keys(valid).length > 0) {
        setDuplicateEmail(error.addEmail);
        return false;
      }
      swal("ERROR!", "Data gagal disimpan!", "error");
      kosong();
    }
  };

  // RENDER
  return (
    <ProtectedAuth
      content={
        <div className="container">
          <div className="row d-flex align-items-center justify-content-center vh-100">
            <div className="col col-md-6">
              <div className="card p-3">
                <div className="card-header bg-white pt-4">
                  <h3 className=" fw-bold">
                    <i className="bi bi-people-fill me-1" /> Register
                  </h3>
                </div>
                <div className="card-body mt-3">
                  <form
                    onSubmit={(error) => {
                      error.preventDefault();
                      registerData();
                    }}
                  >
                    <div className="row mb-3">
                      <div className="col">
                        <div className="mb-3">
                          <label className="form-label" htmlFor="nama">
                            Nama
                          </label>
                          <input
                            type="text"
                            placeholder="Masukkan Nama"
                            className={
                              txtnama
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            id="nama"
                            value={nama}
                            onChange={(error) => {
                              setNama(error.target.value);
                              setTxtNama("");
                            }}
                          />
                          {txtnama && (
                            <div className="form-text text-danger">
                              {txtnama}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="email">
                            Email
                          </label>
                          <input
                            type="text"
                            placeholder="Masukkan Email"
                            className={
                              txtemail || duplicateemail
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            id="email"
                            value={email}
                            onChange={(error) => {
                              setEmail(error.target.value);
                              setTxtEmail("");
                            }}
                          />
                          {txtemail && (
                            <div className="form-text text-danger">
                              {txtemail}
                            </div>
                          )}
                          {duplicateemail && (
                            <div className="form-text text-danger">
                              {duplicateemail}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label className="form-label" htmlFor="password">
                            Password
                          </label>
                          <input
                            type="password"
                            placeholder="Masukkan Password"
                            className={
                              txtpassword
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            id="password"
                            value={password}
                            onChange={(error) => {
                              setPassword(error.target.value);
                              setTxtPassword("");
                            }}
                          />
                          {txtpassword && (
                            <div className="form-text text-danger">
                              {txtpassword}
                            </div>
                          )}
                        </div>
                        <div className="mb-3">
                          <label
                            className="form-label"
                            htmlFor="passwordConfirmation"
                          >
                            Password Confirmation
                          </label>
                          <input
                            type="password"
                            placeholder="Masukkan Password Confirmation"
                            className={
                              txtpasswordConfirmation
                                ? "form-control is-invalid"
                                : "form-control"
                            }
                            id="passwordConfirmation"
                            value={passwordConfirmation}
                            onChange={(error) => {
                              setPasswordConfirmation(error.target.value);
                              setTxtPasswordConfirmation("");
                            }}
                          />
                          {txtpasswordConfirmation && (
                            <div className="form-text text-danger">
                              {txtpasswordConfirmation}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="d-grid gap-2 d-flex justify-content-end">
                      <button type="submit" className="btn btn-success">
                        Register
                      </button>
                      <Link
                        to={"/login"}
                        type="button"
                        className="btn btn-secondary"
                      >
                        Kembali
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
export default Register;
