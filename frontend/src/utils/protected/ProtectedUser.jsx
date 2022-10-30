// IMPORT
import { Navigate } from "react-router-dom";
import { apiVerify } from "../../config/api";
import React, { useState, useEffect } from "react";

// PROTECT HALAMAN USER
const ProtectedUser = ({ content }) => {
  // USE STATE
  const [verify, setVerify] = useState(""); // ada atau nggak tokennya?
  const [info, setInfo] = useState(""); // token ada && role: user (kunci)

  // USE EFFECT
  useEffect(() => {
    verifyToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CEK TOKEN
  const verifyToken = async () => {
    try {
      const { success, error } = await apiVerify();
      if (success) {
        console.log(success.message);
        setVerify({ success: true });
        setInfo(success.info);
      } else {
        throw error;
      }
    } catch (error) {
      console.error(error);
      setVerify({ error: true });
    }
  };

  // PROTECT HALAMAN
  const { success, error } = verify;
  const { role } = info;
  if (success && role === "USER") {
    return (
      <Navigate to="/" className="d-none">
        {content}
      </Navigate>
    );
  } else if (success) {
    return <div className="d-block">{content}</div>;
  } else if (error) {
    return (
      <Navigate to="/login" className="d-none">
        {content}
      </Navigate>
    );
  }
};

// EXPORT
export default ProtectedUser;
