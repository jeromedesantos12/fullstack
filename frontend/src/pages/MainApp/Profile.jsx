// IMPORT
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { apiGetById, apiProfile } from "../../config/api";
import { validProfile } from "../../utils/validation/validUser";
import ProtectedStudent from "../../utils/protected/ProtectedStudent";
import swal from "sweetalert";

// COMPONENT
const UserForm = () => {
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

  // PARAMETER ID DI URL
  const { id } = useParams();

  // API <- "VALUE"
  const attr = {
    nama,
    email,
    password,
    passwordConfirmation,
  };

  // SET KOSONG
  const kosong = () => {
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
      const { success, error } = await apiGetById("user", id);
      if (success) {
        setNama(success.user.nama);
        setEmail(success.user.email);
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      swal("ERROR!", "Data tidak ditemukan!", "error");
    }
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

  // UPDATE
  const profileData = async () => {
    const valid = validation();
    try {
      const { success, error } = await apiProfile(attr, id);
      if (success) {
        console.log(success.updated_user);
        swal("OK!", "Data berhasil diubah!", "success");
        kosong();
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      if (error.profileEmail || Object.keys(valid).length > 0) {
        setDuplicateEmail(error.profileEmail);
        return false;
      }
      swal("ERROR!", "Data gagal diubah!", "error");
      kosong();
    }
  };

  // RENDER
  return (
    <ProtectedStudent
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
                      <label className="form-label" htmlFor="nama">
                        Nama
                      </label>
                      <input
                        type="text"
                        placeholder="Masukkan Nama"
                        className={
                          txtnama ? "form-control is-invalid" : "form-control"
                        }
                        id="nama"
                        value={nama}
                        onChange={(e) => {
                          setNama(e.target.value);
                          setTxtNama("");
                        }}
                      />
                      {txtnama && (
                        <div className="form-text text-danger">{txtnama}</div>
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
