const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const { summarizeText } = require('./summarizer'); // Ensure this path is correct

require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a schema for storing summaries
const summarySchema = new mongoose.Schema({
  originalText: String,
  summarizedText: String
});

const Summary = mongoose.model('Summary', summarySchema);

// API endpoint for text summarization
app.post('/api/summarize', async (req, res) => {
  const textToSummarize = req.body.text;

  try {
    console.log('Summarizing text:', textToSummarize);
    const summarizedText = await summarizeText(textToSummarize);
    console.log('Summarized text:', summarizedText);

    // Save to MongoDB
    const summary = new Summary({
      originalText: textToSummarize,
      summarizedText: summarizedText
    });
    
    console.log('Saving summary:', summary);
    await summary.save();
    console.log('Summary saved!');

    res.json({ summarizedText });
  } catch (error) {
    console.error('Error during summarization:', error);
    res.status(500).json({ error: 'Failed to summarize the text.' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
