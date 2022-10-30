// IMPORT
import { Navigate } from "react-router-dom";
import { apiVerify } from "../../config/api";
import React, { useState, useEffect } from "react";

// PROTECT HALAMAN AUTH
export const ProtectedAuth = ({ token, content }) => {
  // USE STATE
  const [valid, setValid] = useState("");

  // USE EFFECT
  useEffect(() => {
    tokenValid();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // CEK ROLE
  const tokenValid = async () => {
    try {
      const { success, error } = await apiVerify(token);
      if (success) setValid({ success: success.message });
      if (error) throw error;
    } catch (error) {
      setValid({ error: error });
    }
  };

  // PROTECT HALAMAN
  const { success, error } = valid;
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
