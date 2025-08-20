import React, { useState } from "react";
import { FaUserAlt, FaLock, FaEye, FaEyeSlash, FaSpinner } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/login.css";

export default function Inscription() {
    const [formData, setFormData] = useState({
        email: "",
        nom: "",
        mdp: "",
       
    });
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const inscrire = async (e) => {
        e.preventDefault();
     

        try {
            const res = await axios.post("http://localhost:5000/api/users/inscript", formData);
            
       
            localStorage.setItem("role", res.data.role);
            localStorage.setItem("nom", res.data.nom);
            localStorage.setItem("userId", res.data._id);

           

            navigate("/accueil");
        } catch (err) {
        
            console.error(err);
        } 
    };

    return (
        <div className="container">
            <div className="card">
                <div className="header">
                    <h2>Inscription</h2>
                    <p>Créez votre compte FilmKO</p>
                </div>
                
               
                
                <form onSubmit={inscrire}>
                    <div className="input-group">
                        <div className="champ">
                            <FaUserAlt className="icon" />
                            <input
                                type="text"
                                name="nom"
                                placeholder="Nom complet"
                                value={formData.nom}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="champ">
                            <IoIosMail className="icon" />
                            <input
                                type="email"
                                name="email"
                                placeholder="Adresse email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        
                        <div className="champ">
                            <FaLock className="icon" />
                            <input
                                type="password"
                                name="mdp" placeholder="Mot de passe" value={formData.mdp} 
                                onChange={handleChange} 
                                required
                            />
                            
                        </div>
                    </div>
                    
                    <button type="submit" className="login-btn">
                        S'inscrire
                    </button>
                </form>
                
                <div className="link">
                    Déjà un compte ? <a href="/login">Se connecter</a>
                </div>
            </div>
        </div>
    );
}