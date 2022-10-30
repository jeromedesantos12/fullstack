// IMPORT
import { Navigate } from "react-router-dom";
import { apiVerify } from "../../config/api";
import React, { useState, useEffect } from "react";
import jwtDecode from "jwt-decode";

// PROTECT HALAMAN USER
export const ProtectedUser = ({ token, content }) => {
  // USE STATE
  const [valid, setValid] = useState("");
  let decodedToken = token ? jwtDecode(token) : null;

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
  if (window.location.pathname === "/user" && decodedToken.role === "user") {
    return (
      <Navigate to="/" className="d-none">
        {content}
      </Navigate>
    );
  } else if (decodedToken.role === "user") {
    return <div className="d-none">{content}</div>;
  }
  if (success) {
    return <div className="d-block">{content}</div>;
  } else if (error) {
    return (
      <Navigate to="/login" className="d-none">
        {content}
      </Navigate>
    );
  }
};
