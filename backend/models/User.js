const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const User = new mongoose.Schema({
    email: { type: String, unique: true },
    nom: { type: String },
    mdp: { type: String },
    role: { type: String, enum: ["admin", "user"], default: "user" }
});


User.pre("save", async function (next) {
    this.mdp = await bcrypt.hash(this.mdp, 10);
    next();
});

module.exports = mongoose.model("User", User);
