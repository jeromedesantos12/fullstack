// IMPORT
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { apiGetById, apiAdd, apiUpdate } from "../../config/api";
import { validAdd, validUpdate } from "../../utils/validation/validUser";
import ProtectedUser from "../../utils/protected/ProtectedUser";
import swal from "sweetalert";

// COMPONENT
const UserForm = () => {
  // USE STATE
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [role, setRole] = useState("");

  // TEXT MERAH
  const [txtnama, setTxtNama] = useState("");
  const [txtemail, setTxtEmail] = useState("");
  const [txtpassword, setTxtPassword] = useState("");
  const [txtpasswordConfirmation, setTxtPasswordConfirmation] = useState("");
  const [txtrole, setTxtRole] = useState("");
  const [duplicateemail, setDuplicateEmail] = useState("");

  // PARAMETER ID DI URL
  const { id } = useParams();

  // REDIRECT
  const navigate = useNavigate();

  // API <- "VALUE"
  const attrAdd = {
    nama,
    email,
    password,
    passwordConfirmation,
    role,
  };

  const attrUpdate = {
    nama,
    email,
    password,
    passwordConfirmation,
    role,
  };

  // SET KOSONG
  const kosong = () => {
    setNama("");
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");
    setRole("");
  };

  // USE EFFECT
  useEffect(() => {
    if (id) getIdData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // GET BY ID
  const getIdData = async () => {
    try {
      const { success, error } = await apiGetById("user", id);
      if (success) {
        setRole(success.user.role);
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      swal("ERROR!", "Data tidak ditemukan!", "error");
      navigate("/user");
    }
  };

  // VALIDASI ADD
  const validationAdd = () => {
    const value = validAdd(nama, email, password, passwordConfirmation, role);
    if (Object.keys(value).length > 0) {
      setTxtNama(value.nama);
      setTxtEmail(value.email);
      setTxtPassword(value.password);
      setTxtPasswordConfirmation(value.passwordConfirmation);
      setTxtRole(value.role);
    }
    return value;
  };

  // VALIDASI UPDATE
  const validationUpdate = () => {
    const value = validUpdate(role);
    if (Object.keys(value).length > 0) {
      setTxtRole(value.role);
    }
    return value;
  };

  // ADD
  const addData = async () => {
    const valid = validationAdd();
    try {
      const { success, error } = await apiAdd("user", attrAdd);
      if (success) {
        console.log(success.added_user);
        swal("OK!", "Data berhasil disimpan!", "success");
        kosong();
        navigate("/user");
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
      navigate("/user");
    }
  };

  // UPDATE
  const updateData = async () => {
    const valid = validationUpdate();
    try {
      const { success, error } = await apiUpdate("user", attrUpdate, id);
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
      if (Object.keys(valid).length > 0) {
        return false;
      }
      swal("ERROR!", "Data gagal diubah!", "error");
      kosong();
      navigate("/user");
    }
  };

  // RENDER
  return (
    <ProtectedUser
      content={
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-6">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  id ? updateData() : addData();
                }}
              >
                <div className="row mb-3">
                  <div className="col">
                    <div className={id ? "d-none" : "d-block"}>
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
                    <div className="mb-3">
                      <label className="form-label" htmlFor="role">
                        Role
                      </label>
                      <div>
                        <select
                          className={
                            txtrole ? "form-select is-invalid" : "form-select"
                          }
                          type="text"
                          id="role"
                          value={role}
                          onChange={(e) => {
                            setRole(e.target.value);
                            setTxtRole("");
                          }}
                        >
                          <option value="" disabled>
                            Pilih Role
                          </option>
                          <option value="ADMIN">ADMIN</option>
                          <option value="USER">USER</option>
                        </select>
                      </div>
                      {txtrole && (
                        <div className="form-text text-danger">{txtrole}</div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-flex justify-content-end">
                  <button type="submit" className="btn btn-success">
                    {id ? "Ubah" : "Simpan"}
                  </button>
                  <Link
                    to={"/user"}
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
      }
    />
  );
};

// EXPORT
export default UserForm;
