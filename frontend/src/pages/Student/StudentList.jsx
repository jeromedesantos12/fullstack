// IMPORT
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiGet, apiSearch, apiDelete } from "../../config/api";
import { Danger } from "../../import/components/atoms";
import { ProtectedStudent } from "../../utils/protected/ProtectedStudent";
import swal from "sweetalert";

// COMPONENT
const StudentList = () => {
  // LOCAL STORAGE
  const token = localStorage.getItem("token");

  // USE STATE
  const [students, setStudents] = useState([]);
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
      const { success, error } = await apiGet(token, "student", token);
      if (success) {
        setStudents(success.students);
        setAlert("");
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      setStudents([]);
      setAlert(<Danger text={"Data tidak ditemukan!"} />);
    }
  };

  // GET QUERY
  const searchData = async () => {
    try {
      const { success, error } = await apiSearch(
        token,
        "student",
        "input",
        search
      );
      if (success) {
        setStudents(success.result);
        setAlert("");
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      setStudents([]);
      setAlert(<Danger text={"Data tidak ditemukan!"} />);
    }
  };

  // DELETE
  const deleteData = async (id) => {
    try {
      const { success, error } = await apiDelete(token, "student", id);
      if (success) {
        console.log(success.deleted_student);
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
    }
    const result = students.filter((student) => student._id !== id);
    setStudents(result);
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
    <ProtectedStudent
      token={token}
      content={
        <div className="container">
          <div className="row d-flex justify-content-center">
            <div className="col col-md-9">
              <div className="row mb-4">
                <div className="col col-md-4">
                  <h3>Students Data</h3>
                </div>
                <div className="col">
                  <input
                    className="form-control"
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Cari nim atau nama..."
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
                          <th scope="col">NIM</th>
                          <th scope="col">Nama</th>
                          <th scope="col">Jurusan</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="table-group-divider">
                        {students.map((student, index) => (
                          <tr key={student._id}>
                            <th scope="row">{index + 1}</th>
                            <td>{student.nim}</td>
                            <td>{student.nama}</td>
                            <td>{student.jurusan}</td>
                            <td>
                              <div className="d-grid gap-2 d-md-flex justify-content">
                                <Link
                                  to={`detail/${student._id}`}
                                  type="button"
                                  className="btn btn-primary btn-sm"
                                >
                                  <i className="bi bi-people-fill me-1" />
                                  Detail
                                </Link>
                                <Link
                                  to={`form/${student._id}`}
                                  type="button"
                                  className="btn btn-warning btn-sm"
                                >
                                  <i className="bi bi-pencil-square me-1" />
                                  Edit
                                </Link>
                                <button
                                  onClick={() => deleteAlert(student._id)}
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
export default StudentList;
