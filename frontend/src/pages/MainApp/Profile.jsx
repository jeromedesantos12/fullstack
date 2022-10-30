// IMPORT
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { apiGetById, apiProfile } from "../../config/api";
import { validProfile } from "../../utils/validation/validUser";
import { ProtectedStudent } from "../../utils/protected/ProtectedStudent";
import swal from "sweetalert";

// COMPONENT
const UserForm = () => {
  // LOCAL STORAGE
  const token = localStorage.getItem("token");

  // USE STATE
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("");

  // TEXT MERAH
  const [txtusername, setTxtUsername] = useState("");
  const [txtemail, setTxtEmail] = useState("");
  const [txtpassword, setTxtPassword] = useState("");
  const [txtpasswordConfirmation, setTxtPasswordConfirmation] = useState("");

  // TEXT MERAH (VALIDASI DUPLIKAT BACKEND)
  const [duplicateusername, setDuplicateUsername] = useState("");
  const [duplicateemail, setDuplicateEmail] = useState("");

  // PARAMETER ID DI URL
  const { id } = useParams();

  // REDIRECT
  const navigate = useNavigate();

  // API <- "VALUE"
  const attr = {
    username,
    email,
    password,
    passwordConfirmation,
  };

  // SET KOSONG
  const kosong = () => {
    setUsername("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
  };

  // USE EFFECT
  useEffect(() => {
    getIdData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // GET BY ID
  const getIdData = async () => {
    try {
      const { success, error } = await apiGetById(token, "user", id);
      if (success) {
        setUsername(success.user.username);
        setEmail(success.user.email);
        setRole(success.user.role);
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      swal("ERROR!", "Data tidak ditemukan!", "error");
      navigate("/");
    }
  };

  // VALIDASI FRONTEND
  const validation = () => {
    const value = validProfile(username, email, password, passwordConfirmation);
    if (Object.keys(value).length > 0) {
      setTxtUsername(value.username);
      setTxtEmail(value.email);
      setTxtPassword(value.password);
      setTxtPasswordConfirmation(value.passwordConfirmation);
    }
    return value;
  };

  // UPDATE
  const profileData = async () => {
    const valid = validation();
    try {
      const { success, error } = await apiProfile(token, "user", attr, id);
      if (success) {
        console.log(success.updated_user);
        swal("OK!", "Data berhasil diubah!", "success");
        kosong();
        navigate("/user");
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      if (
        error.profileUsername ||
        error.profileEmail ||
        Object.keys(valid).length > 0
      ) {
        setDuplicateUsername(error.profileUsername);
        setDuplicateEmail(error.profileEmail);
        return false;
      }
      swal("ERROR!", "Data gagal diubah!", "error");
      kosong();
      navigate("/user");
    }
  };

  // RENDER
  return (
    <ProtectedStudent
      token={token}
      content={
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  profileData();
                }}
              >
                <div className="row mb-3">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="username">
                        Username
                      </label>
                      <input
                        type="text"
                        placeholder="Masukkan Username"
                        className={
                          txtusername || duplicateusername
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="username"
                        value={username}
                        onChange={(e) => {
                          setUsername(e.target.value);
                          setTxtUsername("");
                          setDuplicateUsername("");
                        }}
                      />
                      {txtusername && (
                        <div className="form-text text-danger">
                          {txtusername}
                        </div>
                      )}
                      {duplicateusername && (
                        <div className="form-text text-danger">
                          {duplicateusername}
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
                        onChange={(e) => {
                          setEmail(e.target.value);
                          setTxtEmail("");
                          setDuplicateEmail("");
                        }}
                      />
                      {txtemail && (
                        <div className="form-text text-danger">{txtemail}</div>
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
                        onChange={(e) => {
                          setPassword(e.target.value);
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
                        onChange={(e) => {
                          setPasswordConfirmation(e.target.value);
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
                    Ubah
                  </button>
                  <Link to={"/"} type="button" className="btn btn-secondary">
                    Kembali
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      }
    />
  );
};

// EXPORT
export default UserForm;
