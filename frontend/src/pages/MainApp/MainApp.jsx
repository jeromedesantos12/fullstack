// IMPORT
import React from "react";
import { Outlet } from "react-router-dom";
import ProtectedStudent from "../../utils/protected/ProtectedStudent";
import Header from "../../components/molecules/Header";
import Footer from "../../components/molecules/Footer";
import Gap from "../../components/atoms/Gap";

// COMPONENT
const MainApp = () => {
  // RENDER
  return (
    <ProtectedStudent
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
