const express = require('express');
const path = require('path');
const summarizeText = require('./summarizer');
const mongoose = require('mongoose');
const Summary = require('./models/summary');
require('dotenv').config();

const app = express();
const cors = require('cors');
app.use(cors());

// Middleware
app.use(express.json()); // Using Express's built-in body parser
app.use(express.static(path.join(__dirname, 'public')));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log("MongoDB Atlas connected"))
.catch(err => console.error("MongoDB connection error:", err));

// API route
app.post('/api/summarize', async (req, res) => {
    const { text_to_summarize } = req.body;
    try {
        const summarizedText = await summarizeText(text_to_summarize);
        const summary = new Summary({
            originalText: text_to_summarize,
            summarizedText: summarizedText
        });

        await summary.save();
        res.json({ summarizedText });
    } catch (error) {
        console.error("Error in summarization process:", error);
        res.status(500).json({ error: 'Error summarizing text' });
    }
});

// Serve HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
