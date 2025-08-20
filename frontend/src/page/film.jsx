import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import '../style/film.css';

export default function Film() {
  const { id } = useParams();
  const [film, setFilm] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/films/${id}`);
        setFilm(res.data);
      } catch (err) {
        console.error("Erreur de récupération du film:", err);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilm();
  }, [id]);

  if (isLoading) {
    return (
      <div className="film-container loading">
        <p>Chargement du film...</p>
      </div>
    );
  }

  if (isError || !film) {
    return (
      <div className="film-container error">
        <h2>Erreur de chargement</h2>
        <p>Le film n'a pas pu être récupéré.</p>
        <Link to="/accueil" className="back-link">Retour à la liste</Link>
      </div>
    );
  }

  return (
    <div className="film">
    

      <div className="film-content">
        <div className="image">
          <img src={`http://localhost:5000/images/${film.image}`} alt={film.titre} />
        </div>
        <div className="details">
          <h1>{film.titre}</h1>
          <p className="description">{film.description}</p>
        
        </div>
      </div>
      
      <div className="video">
        <video controls className="film-video">
          <source src={`http://localhost:5000/videos/${film.filename}`} type="video/mp4" />
          
        </video>
      </div>
    </div>
  );
}