// IMPORT
import { Navigate } from "react-router-dom";
import { apiVerify } from "../../config/api";
import React, { useState, useEffect } from "react";

// PROTECT HALAMAN AUTH
const ProtectedAuth = ({ content }) => {
  // USE STATE
  const [verify, setVerify] = useState("");

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
  if (success) {
    return (
      <Navigate to="/" className="bg-secondary bg-opacity-25 d-none">
        {content}
      </Navigate>
    );
  } else if (error) {
    return <div className="bg-secondary bg-opacity-25 d-block">{content}</div>;
  }
};

// EXPORT
export default ProtectedAuth;
