// IMPORT
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MainApp, NotFound, Profile } from "./import/pages/MainApp";
import { Login, Register } from "./import/pages/Auth";
import {
  StudentList,
  StudentForm,
  StudentDetail,
} from "./import/pages/Student";
import { UserList, UserForm, UserDetail } from "./import/pages/User";

// COMPONENT
function App() {
  // RENDER
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/" element={<MainApp />}>
            <Route path="/" element={<StudentList />} />
            <Route path="form/" element={<StudentForm />} />
            <Route path="form/:id" element={<StudentForm />} />
            <Route path="detail/:id" element={<StudentDetail />} />

            <Route path="user/" element={<UserList />} />
            <Route path="user/form/" element={<UserForm />} />
            <Route path="user/form/:id" element={<UserForm />} />
            <Route path="user/detail/:id" element={<UserDetail />} />

            <Route path="profile/:id" element={<Profile />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

// EXPORT
export default App;
