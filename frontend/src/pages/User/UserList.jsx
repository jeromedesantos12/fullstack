// IMPORT
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiSearch, apiDelete } from "../../config/api";
import ProtectedUser from "../../utils/protected/ProtectedUser";
import Danger from "../../components/atoms/Danger";
import swal from "sweetalert";

// COMPONENT
const UserList = () => {
  // USE STATE
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [alert, setAlert] = useState("");

  // USE EFFECT
  useEffect(() => {
    search === "" ? getData() : searchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  // GET ALL
  const getData = async () => {
    try {
      const { success, error } = await apiGet("user");
      if (success) {
        setUsers(success.users);
        setAlert("");
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
      setAlert(<Danger text={"Data tidak ditemukan!"} />);
    }
  };

  // GET QUERY
  const searchData = async () => {
    try {
      const { success, error } = await apiSearch("user", "input", search);
      if (success) {
        setUsers(success.result);
        setAlert("");
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      setUsers([]);
      setAlert(<Danger text={"Data tidak ditemukan!"} />);
    }
  };

  // DELETE
  const deleteData = async (id) => {
    try {
      const { success, error } = await apiDelete("user", id);
      if (success) {
        console.log(success.deleted_user);
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
    const result = users.filter((user) => user._id !== id);
    setUsers(result);
  };

  // DELETE ALERT
  const deleteAlert = async (id) => {
    try {
      const ok = await swal({
        title: "Hapus data ini?",
        text: "Data yang dihapus akan hilang!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      });
      if (ok) {
        deleteData(id);
        swal("OK! Data telah dihapus!", {
          icon: "success",
        });
      } else {
        swal("Data masih ada!");
      }
    } catch (error) {
      console.error(error);
    }
  };

  // RENDER
  return (
    <ProtectedUser
      content={
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-9">
              <div className="row mb-4">
                <div className="col col-md-4">
                  <h3>Users Data</h3>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari email atau role..."
                  />
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div
                    className="mb-3"
                    style={{ maxHeight: "290px", overflow: "auto" }}
                  >
                    <table className="table">
                      <thead>
                        <tr>
                          <th scope="col">#</th>
                          <th scope="col">Email</th>
                          <th scope="col">Role</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {users.map((user, index) => (
                          <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>
                              <div className="fst-italic">{user.email}</div>
                            </td>
                            <td>
                              <div
                                className={
                                  user.role === "ADMIN"
                                    ? "badge bg-secondary p-2"
                                    : "badge bg-secondary bg-opacity-25 text-dark p-2"
                                }
                              >
                                {user.role}
                              </div>
                            </td>
                            <td>
                              <div className="d-grid gap-2 d-md-flex justify-content">
                                <Link
                                  to={`detail/${user._id}`}
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                >
                                  <i className="bi bi-people-fill" />
                                </Link>
                                <Link
                                  to={`form/${user._id}`}
                                  type="button"
                                  className="btn btn-warning btn-sm"
                                >
                                  <i className="bi bi-pencil-square" />
                                </Link>
                                <button
                                  onClick={() => deleteAlert(user._id)}
                                  className="btn btn-danger btn-sm"
                                >
                                  <i className="bi bi-trash-fill " />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {alert}
                  </div>
                </div>
              </div>
              <div className="row">
                <Link to="form" className="col btn btn-success">
                  Tambah Data Baru
                </Link>
              </div>
            </div>
          </div>
        </div>
      }
    />
  );
};

// EXPORT
export default UserList;
