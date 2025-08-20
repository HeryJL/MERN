const Film = require("../models/Film");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if(file.fieldname === "video") cb(null, "videos/");
    if(file.fieldname === "image") cb(null, "images/");
  },
  filename: (req, file, cb) => cb(null, file.originalname)
});

const upload = multer({ storage }).fields([
  { name: "video", maxCount: 1 },
  { name: "image", maxCount: 1 }
]);

exports.ajout = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      const film = new Film({
        titre: req.body.titre,
        description: req.body.description,
        category: req.body.category,
        filename: req.files.video[0].filename,
        image: req.files.image[0].filename
      });
      await film.save();
      res.json(film);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

exports.recupFilm = async (req, res) => {
    try {
        const film = await Film.findById(req.params.id);
        res.json(film);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// liste an le film
exports.listeFilm = async (req, res) => {
    const films = await Film.find();
    res.json(films);
};

exports.modifFilm = async (req, res) => {
  upload(req, res, async (err) => {
    try {
     

      const updates = {
        titre: req.body.titre,
        description: req.body.description,
        category: req.body.category
      };

     
      if (req.files) {
        if (req.files.video) {
          updates.filename = req.files.video[0].filename;
        }
        if (req.files.image) {
          updates.image = req.files.image[0].filename;
        }
      }

      const film = await Film.findByIdAndUpdate(
        req.params.id,
        { $set: updates },
        { new: true, runValidators: true }
      );
   

      res.json(film);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  });
};

// Supprimer film 
exports.suppFilm = async (req, res) => {
  try {
    const film = await Film.findByIdAndDelete(req.params.id);
    
    res.json("supprimer");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
