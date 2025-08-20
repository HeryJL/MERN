import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaHome, FaFilm, FaSignInAlt, FaUserPlus, FaSignOutAlt, FaUser } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../style/navbar.css";

const Navbar = () => {
  
  const location = useLocation();
  const navigate = useNavigate();
  const [nom, setNom] = useState("");

  useEffect(() => {

    setNom(localStorage.getItem('nom'));

  }, []);

  const deconn = (e) => {
    e.preventDefault();
    localStorage.removeItem('nom');
    localStorage.removeItem('userId');
    navigate('/login');

  };

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <Link
        to={"/accueil"}
        className="nav-logo"
      >
        <FaFilm className="logo-icon" />
        <span>FilmKO</span>
      </Link>

      <ul className="nav-links  active ">
        <>
          <li className={isActive('/accueil')}>
            <Link to={'/accueil'}>
              <FaHome className="nav-icon" />
              <span>Accueil</span>
            </Link>
          </li>


          <li>
            <Link >
              <FaUser className="nav-icon" />
              <span>{nom}</span>
           </Link>
          </li>


          <li>
           <button 
              className="logout-btn" 
              onClick={deconn}
              
            >
              <FaSignOutAlt className="nav-icon" />
              <span>Déconnexion</span>
            </button>
          </li>
        </>

      </ul>
    </nav>
  );
};

export default Navbar;