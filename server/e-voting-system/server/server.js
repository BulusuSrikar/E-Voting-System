const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json()); // For parsing JSON data

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Create a Schema for the voting system
const voteSchema = new mongoose.Schema({
    candidate: String,
    votes: { type: Number, default: 0 }
});

// Create a Model based on the schema
const Vote = mongoose.model('Vote', voteSchema);

// API to get all candidates
app.get('/candidates', async (req, res) => {
    const candidates = await Vote.find();
    res.json(candidates);
});

// API to record a vote
app.post('/vote', async (req, res) => {
    const { candidate } = req.body;
    const votedCandidate = await Vote.findOne({ candidate });

    if (votedCandidate) {
        votedCandidate.votes += 1;
        await votedCandidate.save();
        res.json({ message: "Vote recorded!" });
    } else {
        res.status(400).json({ message: "Candidate not found" });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port 5000`));
