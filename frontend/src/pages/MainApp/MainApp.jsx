// IMPORT
import React from "react";
import { Outlet } from "react-router-dom";
import { Header, Footer } from "../../import/components/molecules";
import { Gap } from "../../import/components/atoms";
import { ProtectedStudent } from "../../utils/protected/ProtectedStudent";

// COMPONENT
const MainApp = () => {
  // LOCAL STORAGE
  const token = localStorage.getItem("token");

  // RENDER
  return (
    <ProtectedStudent
      token={token}
      content={
        <div className="min-vh-100 position-relative">
          <Header />
          <Gap height={100} />
          <Outlet />
          <Gap height={100} />
          <Footer />
        </div>
      }
    />
  );
};

// EXPORT
export default MainApp;
