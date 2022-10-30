// IMPORT
import { Navigate } from "react-router-dom";
import { apiVerify } from "../../config/api";
import React, { useState, useEffect } from "react";

// PROTECT HALAMAN STUDENT
const ProtectedStudent = ({ content }) => {
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
    return <div className="d-block">{content}</div>;
  } else if (error) {
    return (
      <Navigate to="/login" className=" d-none">
        {content}
      </Navigate>
    );
  }
};

// EXPORT
export default ProtectedStudent;
