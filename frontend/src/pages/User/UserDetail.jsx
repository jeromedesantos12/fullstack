// IMPORT
import React, { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { apiGetById } from "../../config/api";
import { ProtectedUser } from "../../utils/protected/ProtectedUser";
import swal from "sweetalert";

// COMPONENT
const UserDetail = () => {
  // LOCAL STORAGE
  const token = localStorage.getItem("token");

  // USE STATE
  const [username, setUsername] = useState("");
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
      const { success, error } = await apiGetById(token, "user", id);
      if (success) {
        console.log(success);
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

  // RENDER
  return (
    <ProtectedUser
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
                        <h5 className="card-title">{username}</h5>
                      </div>
                      <ul className="list-group list-group-flush">
                        <li className="list-group-item">
                          <i className="bi bi-people-fill me-3"></i>
                          {role}
                        </li>

                        <li className="list-group-item">
                          <i className="bi bi bi-envelope-fill me-3"></i>
                          {email}
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
