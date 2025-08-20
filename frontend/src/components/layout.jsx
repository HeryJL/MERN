import React, { useEffect, useState } from "react";
import Navbar from "./navbar";

import "../style/layout.css";
import { Navigate, useNavigate } from "react-router-dom";

const Layout = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const nom = localStorage.getItem('nom');

    if (!nom) {
      navigate('/login');
    }

  }, []);
  return (
    <div className="layout">
      <Navbar />
      <main className="content">{children}</main>
    </div>
  );
};

export default Layout;
