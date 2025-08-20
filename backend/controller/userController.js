const User = require("../models/User");
const bcrypt = require("bcryptjs");

// inscription
exports.inscript = async (req, res) => {
  try {
    const { email, mdp, nom,role } = req.body;
    const verif = await User.findOne({ email });
    if (verif) {
      return res.status(400).json("Email déjà utilisé" );
    }
    const user = new User({ email, mdp, nom, role });
    await user.save();
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// connexion
exports.connect = async (req, res) => {
    const { email, mdp } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json("Utilisateur non trouvé" );
        const verif = await bcrypt.compare(mdp, user.mdp);
        if (!verif) return res.status(401).json("Mot de passe incorrect");
        res.json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.listeUser = async (req, res) => {
    try {
        const users = await User.find(); 
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.modifUser = async (req, res) => {
        const { email, mdp, nom, role } = req.body;
        const user = await User.findById(req.params.id)
        if (email) user.email = email;
        if (nom) user.nom = nom;
        if (mdp) user.mdp = await bcrypt.hash(mdp, 10);
        await user.save();
        res.json(user);
};


exports.suppUser = async (req, res) => {
        const user = await User.findByIdAndDelete(req.params.id);
        res.json( "supprimé" );
};