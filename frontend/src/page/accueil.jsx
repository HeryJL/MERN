// Accueil.js
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import ModalFilm from "../components/modal"; // Import du nouveau composant
import '../style/accueil.css';

export default function Accueil() {
  const [films, setFilms] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);
  const [filmToEdit, setFilmToEdit] = useState(null);

  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchFilms();
  }, []);

  const fetchFilms = () => {
    axios.get("http://localhost:5000/api/films")
      .then(res => setFilms(res.data))
      
  };

  const modif = (film) => {
    setEditId(film._id);
    setFilmToEdit(film);
    setShowModal(true);
  };

  const suppr = async (id) => {
    if (!window.confirm("Voulez-vous vraiment supprimer ce film ?")) return;
    try {
      await axios.delete(`http://localhost:5000/api/films/${id}`);
      fetchFilms();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="accueil-container">
      <h1>Nos Films</h1>

      {role === "admin" && (
        <button className="btn-add-film" onClick={() => setShowModal(true)}>+ Ajouter un film</button>
      )}

      <div className="films-grid">
        {films.map(film => (
          <div key={film._id} className="film-card-wrapper">
            <Link to={`/film/${film._id}`} className="film-card">
              <div className="film-poster">
                <img src={`http://localhost:5000/images/${film.image}`} alt={film.titre} />
              </div>
              <div className="film-info">
                <h3>{film.titre}</h3>
                <p>{film.category}</p>
              </div>
            </Link>
            {role === "admin" && (
              <div className="film-actions">
                <button className="btn-edit" onClick={() => modif(film)}>Modifier</button>
                <button className="btn-delete" onClick={() => suppr(film._id)}>Supprimer</button>
              </div>
            )}
          </div>
        ))}
      </div>

   
      <ModalFilm 
        showModal={showModal}
        setShowModal={setShowModal}
        editId={editId}
        filmToEdit={filmToEdit}
        fetchFilms={fetchFilms}
      />
    </div>
  );
}