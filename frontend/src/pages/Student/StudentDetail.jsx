// IMPORT
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { apiGetById } from "../../config/api";
import { ProtectedStudent } from "../../utils/protected/ProtectedStudent";
import swal from "sweetalert";

// COMPONENT
const StudentDetail = () => {
  // LOCAL STORAGE
  const token = localStorage.getItem("token");

  // USE STATE
  const [nim, setNIM] = useState("");
  const [nama, setNama] = useState("");
  const [gender, setGender] = useState("");
  const [telp, setTelp] = useState("");
  const [jurusan, setJurusan] = useState("");

  // AMBIL PARAMETER URL
  const { id } = useParams();

  // REDIRECT
  const navigate = useNavigate();

  // USE EFFECT
  useEffect(() => {
    getIdData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  // GET BY ID
  const getIdData = async () => {
    try {
      const { success, error } = await apiGetById(token, "student", id);
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

  // RENDER
  return (
    <ProtectedStudent
      token={token}
      content={
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col">
                      <div className="card-header">
                        <h5 className="card-title">{nama}</h5>
                        <h6 className="card-subtitle mb-2 text-muted">{nim}</h6>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <i className="bi bi-heart-fill me-3"></i>
                          {gender}
                        </li>
                        <li className="list-group-item">
                          <i className="bi bi-telephone-fill me-3"></i>
                          {telp}
                        </li>
                        <li className="list-group-item">
                          <i className="bi bi-chat-left-dots-fill me-3"></i>
                          {jurusan}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col d-flex justify-content-end">
                      <Link
                        to={"/"}
                        type="button"
                        className="btn btn btn-secondary"
                      >
                        Kembali
                      </Link>
                    </div>
                  </div>
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
export default StudentDetail;
