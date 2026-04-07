const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// connect to MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/flashcards");

// schema for flashcards
const FlashcardSchema = new mongoose.Schema({
  question: String,
  answer: String,
  setName: String
});

const Flashcard = mongoose.model("Flashcard", FlashcardSchema);

// CREATE
app.post("/flashcards", async (req, res) => {
  const card = new Flashcard(req.body);
  await card.save();
  res.json(card);
});

// READ
app.get("/flashcards", async (req, res) => {
  const cards = await Flashcard.find();
  res.json(cards);
});

// UPDATE
app.put("/flashcards/:id", async (req, res) => {
  const updated = await Flashcard.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  res.json(updated);
});

// DELETE
app.delete("/flashcards/:id", async (req, res) => {
  await Flashcard.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

// start server
app.listen(5000, () => console.log("Server running on port 5000"));
