
import { useState } from "react";
import axios from "axios";
import '../style/accueil.css';

export default function ModalFilm({ showModal, setShowModal, editId, filmToEdit, fetchFilms }) {
  const [titre, setTitre] = useState(editId ? filmToEdit.titre : "");
  const [description, setDescription] = useState(editId ? filmToEdit.description : "");
  const [category, setCategory] = useState(editId ? filmToEdit.category : "");
  const [video, setVideo] = useState(null);
  const [image, setImage] = useState(null);

  const handleAddOrEditFilm = async (e) => {
    e.preventDefault();
    

    const formData = new FormData();
    formData.append("titre", titre);
    formData.append("description", description);
    formData.append("category", category);
    if (video) formData.append("video", video);
    if (image) formData.append("image", image);

    try {
      if (editId) {
        // Modifier
        await axios.put(`http://localhost:5000/api/films/${editId}`, formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      } else {
        // Ajouter
        await axios.post("http://localhost:5000/api/films/ajout", formData, {
          headers: { "Content-Type": "multipart/form-data" }
        });
      }
      setShowModal(false);
      resetForm();
      fetchFilms();
    } catch (err) {
      console.error(err);
    }
  };

  const resetForm = () => {
    setTitre("");
    setDescription("");
    setCategory("");
    setVideo(null);
    setImage(null);
  };

  const handleClose = () => {
    setShowModal(false);
    resetForm();
  };

  if (!showModal) return null;

  return (
    <div className="modal-overlay" onClick={handleClose}>
      <div className="modal-container" onClick={e => e.stopPropagation()}>
        <h2>{editId ? "Modifier un Film" : "Ajouter un Film"}</h2>
        <form onSubmit={handleAddOrEditFilm}>
          <input 
            type="text" 
            placeholder="Titre" 
            value={titre} 
            onChange={e => setTitre(e.target.value)} 
            required
          />
          <input 
            type="text" 
            placeholder="Catégorie" 
            value={category} 
            onChange={e => setCategory(e.target.value)} 
            required
          />
          <textarea 
            placeholder="Description" 
            value={description} 
            onChange={e => setDescription(e.target.value)} 
          />
          <input 
            type="file" 
            accept="video/*" 
            onChange={e => setVideo(e.target.files[0])} 
          />
          <input 
            type="file" 
            accept="image/*" 
            onChange={e => setImage(e.target.files[0])} 
          />
          <button type="submit" className="btn-submit">
            {editId ? "Modifier" : "Ajouter"}
          </button>
        </form>
        <button className="btn-close" onClick={handleClose}>X</button>
      </div>
    </div>
  );
}