// IMPORT
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { apiGetById, apiAdd, apiUpdate } from "../../config/api";
import { validStudent } from "../../utils/validation/validStudent";
import ProtectedStudent from "../../utils/protected/ProtectedStudent";
import swal from "sweetalert";

// COMPONENT
const StudentForm = () => {
  // USE STATE
  const [nim, setNIM] = useState("");
  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("");
  const [telp, setTelp] = useState("");
  const [jurusan, setJurusan] = useState("");

  // TEXT MERAH
  const [txtnim, setTxtNIM] = useState("");
  const [txtnama, setTxtNama] = useState("");
  const [txtgender, setTxtGender] = useState("");
  const [txttelp, setTxtTelp] = useState("");
  const [txtjurusan, setTxtJurusan] = useState("");

  // TEXT MERAH (VALIDASI DUPLIKAT BACKEND)
  const [duplicatenim, setDuplicateNIM] = useState("");
  const [duplicatetelp, setDuplicateTelp] = useState("");

  // PARAMETER ID DI URL
  const { id } = useParams();

  // REDIRECT
  const navigate = useNavigate();

  // API <- "VALUE"
  const attr = {
    nim,
    nama,
    gender,
    telp,
    jurusan,
  };

  // SET KOSONG
  const kosong = () => {
    setNIM("");
    setNama("");
    setGender("");
    setTelp("");
    setJurusan("");
  };

  // USE EFFECT
  useEffect(() => {
    if (id) getIdData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // GET BY ID
  const getIdData = async () => {
    try {
      const { success, error } = await apiGetById("student", id);
      if (success) {
        setNIM(success.student.nim);
        setNama(success.student.nama);
        setGender(success.student.gender);
        setTelp(success.student.telp);
        setJurusan(success.student.jurusan);
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
    const value = validStudent(nim, nama, gender, telp, jurusan);
    if (Object.keys(value).length > 0) {
      setTxtNIM(value.nim);
      setTxtNama(value.nama);
      setTxtGender(value.gender);
      setTxtTelp(value.telp);
      setTxtJurusan(value.jurusan);
    }
    return value;
  };

  // ADD
  const addData = async () => {
    const valid = validation();
    try {
      const { success, error } = await apiAdd("student", attr);
      if (success) {
        console.log(success.added_student);
        swal("OK!", "Data berhasil disimpan!", "success");
        kosong();
        navigate("/");
      } else {
        throw error;
      }
    } catch (error) {
      console.log(valid);
      console.error(error);
      if (error.addNIM || error.addTelp || Object.keys(valid).length > 0) {
        setDuplicateNIM(error.addNIM);
        setDuplicateTelp(error.addTelp);
        return false;
      }
      swal("ERROR!", "Data gagal disimpan!", "error");
      kosong();
      navigate("/");
    }
  };

  // UPDATE
  const updateData = async () => {
    const valid = validation();
    try {
      const { success, error } = await apiUpdate("student", attr, id);
      if (success) {
        console.log(success.updated_student);
        swal("OK!", "Data berhasil diubah!", "success");
        kosong();
        navigate("/");
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      if (
        error.updateNIM ||
        error.updateTelp ||
        Object.keys(valid).length > 0
      ) {
        setDuplicateNIM(error.updateNIM);
        setDuplicateTelp(error.updateTelp);
        return false;
      }
      swal("ERROR!", "Data gagal diubah!", "error");
      kosong();
      navigate("/");
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
                  id ? updateData() : addData();
                }}
              >
                <div className="row mb-3">
                  <div className="col">
                    <div className="mb-3">
                      <label className="form-label" htmlFor="nim">
                        NIM
                      </label>
                      <input
                        type="text"
                        placeholder="Masukkan NIM"
                        className={
                          txtnim || duplicatenim
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="nim"
                        value={nim}
                        onChange={(e) => {
                          setNIM(e.target.value);
                          setTxtNIM("");
                          setDuplicateNIM("");
                        }}
                      />
                      {txtnim && (
                        <div className="form-text text-danger">{txtnim}</div>
                      )}
                      {duplicatenim && (
                        <div className="form-text text-danger">
                          {duplicatenim}
                        </div>
                      )}
                    </div>
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
                      <label className="form-label" htmlFor="gender">
                        Gender
                      </label>
                      <div>
                        <select
                          type="text"
                          className={
                            txtgender ? "form-select is-invalid" : "form-select"
                          }
                          id="gender"
                          value={gender}
                          onChange={(e) => {
                            setGender(e.target.value);
                            setTxtGender("");
                          }}
                        >
                          <option disabled value="">
                            Pilih Gender
                          </option>
                          <option value="Pria">Pria</option>
                          <option value="Wanita">Wanita</option>
                        </select>
                      </div>
                      {txtgender && (
                        <div className="form-text text-danger">{txtgender}</div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="telp">
                        Telp
                      </label>
                      <input
                        type="text"
                        placeholder="Masukkan Telp"
                        className={
                          txttelp || duplicatetelp
                            ? "form-control is-invalid"
                            : "form-control"
                        }
                        id="telp"
                        value={telp}
                        onChange={(e) => {
                          setTelp(e.target.value);
                          setTxtTelp("");
                          setDuplicateTelp("");
                        }}
                      />
                      {txttelp && (
                        <div className="form-text text-danger">{txttelp}</div>
                      )}
                      {duplicatetelp && (
                        <div className="form-text text-warning">
                          {duplicatetelp}
                        </div>
                      )}
                    </div>
                    <div className="mb-3">
                      <label className="form-label" htmlFor="jurusan">
                        Jurusan
                      </label>
                      <div>
                        <select
                          className={
                            txtjurusan
                              ? "form-select is-invalid"
                              : "form-select"
                          }
                          type="text"
                          id="jurusan"
                          value={jurusan}
                          onChange={(e) => {
                            setJurusan(e.target.value);
                            setTxtJurusan("");
                          }}
                        >
                          <option value="" disabled>
                            Pilih Jurusan
                          </option>
                          <option value="Teknik Informasi">
                            Teknik Informasi
                          </option>
                          <option value="Sistem Informasi">
                            Sistem Informasi
                          </option>
                          <option value="Teknik Komputer Jaringan">
                            Teknik Komputer Jaringan
                          </option>
                        </select>
                      </div>
                      {txtjurusan && (
                        <div className="form-text text-danger">
                          {txtjurusan}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="d-grid gap-2 d-flex justify-content-end">
                  <button type="submit" className="btn btn-success">
                    {id ? "Ubah" : "Simpan"}
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
export default StudentForm;
