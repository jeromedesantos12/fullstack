// IMPORT
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiSearch, apiDelete } from "../../config/api";
import { Danger } from "../../import/components/atoms";
import { ProtectedUser } from "../../utils/protected/ProtectedUser";
import swal from "sweetalert";

// COMPONENT
const UserList = () => {
  // LOCAL STORAGE
  const token = localStorage.getItem("token");

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
      const { success, error } = await apiGet(token, "user");
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
      const { success, error } = await apiSearch(
        token,
        "user",
        "input",
        search
      );
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
      const { success, error } = await apiDelete(token, "user", id);
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
      token={token}
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
                    placeholder="Cari username atau role..."
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
                          <th scope="col">Username</th>
                          <th scope="col">Role</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {users.map((user, index) => (
                          <tr key={user._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{user.username}</td>
                            <td>{user.role}</td>
                            <td>
                              <div className="d-grid gap-2 d-md-flex justify-content">
                                <Link
                                  to={`detail/${user._id}`}
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                >
                                  <i className="bi bi-people-fill me-1" />
                                  Detail
                                </Link>
                                <Link
                                  to={`form/${user._id}`}
                                  type="button"
                                  className="btn btn-warning btn-sm"
                                >
                                  <i className="bi bi-pencil-square me-1" />
                                  Edit
                                </Link>
                                <button
                                  onClick={() => deleteAlert(user._id)}
                                  className="btn btn-danger btn-sm"
                                >
                                  <i className="bi bi-trash-fill me-1" />
                                  Delete
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
