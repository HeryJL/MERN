import React, { useState } from "react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../style/login.css';

export default function Login() {
   const [formData, setFormData] = useState({
          email: "",
          nom: "",
          mdp: "",
         
      });

   const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

 
  const navigate = useNavigate();
  const seConnecter = async (e) => {
     e.preventDefault();

    try {
      const res = await axios.post("http://localhost:5000/api/users/connect", formData);
      console.log(res.data)
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("nom", res.data.nom)
      
      navigate("/accueil");

    } catch (err) {
      console.error(err);
    } 
  };

  return (
    <div className="container">
      <div className="card">
        <div className="header">
          <h2>Connexion</h2>
          <p>Bienvenue sur FilmKO</p>
        </div>

        
        <form onSubmit={seConnecter}>
          <div className="input-group">
            <div className="champ">
              <FaUserAlt className="icon" />
              <input  type="email" name="email"  placeholder="Adresse email" value={formData.email} 
              onChange={handleChange} required
              />
            </div>
            
            <div className="champ">
              <FaLock className="icon" />
              <input type="password" name="mdp" placeholder="Mot de passe" value={formData.mdp} 
              onChange={handleChange} required />
            </div>
            
           
          </div>
          
          <button type="submit" className="login-btn">
              Se connecter
          </button>
        </form>
        
        <div className="link">
          Pas encore de compte ? <a href="/inscription">S'inscrire</a>
        </div>
      </div>
    </div>
  );
}