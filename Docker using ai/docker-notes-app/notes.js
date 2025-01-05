const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

const NOTES_FILE = '/app/data/notes.json';

// Initialize data directory and file
if (!fs.existsSync(path.dirname(NOTES_FILE))) {
    fs.mkdirSync(path.dirname(NOTES_FILE), { recursive: true });
}
if (!fs.existsSync(NOTES_FILE)) {
    fs.writeFileSync(NOTES_FILE, JSON.stringify([]));
}

// Get all notes
app.get('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(NOTES_FILE));
    res.json(notes);
});

// Add a note
app.post('/notes', (req, res) => {
    const notes = JSON.parse(fs.readFileSync(NOTES_FILE));
    const newNote = {
        id: Date.now(),
        text: req.body.text,
        created: new Date()
    };
    notes.push(newNote);
    fs.writeFileSync(NOTES_FILE, JSON.stringify(notes, null, 2));
    res.json(newNote);
});

app.listen(3000, () => console.log('Server running on port 3000'));