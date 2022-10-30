// IMPORT
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { apiGetById } from "../../config/api";
import ProtectedUser from "../../utils/protected/ProtectedUser";
import swal from "sweetalert";

// COMPONENT
const UserDetail = () => {
  // USE STATE
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");

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
      const { success, error } = await apiGetById("user", id);
      if (success) {
        console.log(success);
        setNama(success.user.nama);
        setEmail(success.user.email);
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

  // RENDER
  return (
    <ProtectedUser
      content={
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-3">
              <div className="card">
                <div className="card-body">
                  <div className="row mb-4">
                    <div className="col">
                      <div className="card-header">
                        <h5 className="card-title text-center">{nama}</h5>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li
                          className={
                            role === "ADMIN"
                              ? "list-group-item badge bg-secondary text-light p-2"
                              : "list-group-item badge bg-secondary bg-opacity-25 text-dark p-2"
                          }
                        >
                          {role}
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="row">
                    <div className="col d-flex justify-content-end">
                      <Link
                        to={"/user"}
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
export default UserDetail;
