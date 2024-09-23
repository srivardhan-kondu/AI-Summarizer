
const axios = require('axios');
require('dotenv').config(); // Ensure .env variables are loaded
async function summarizeText(text) {
    let data = JSON.stringify({
        "inputs": text,
        "parameters": {
            "max_length": 100000,
            "min_length": 30
        }
    });

    let config = {
        method: 'post',
        url: 'https://api-inference.huggingface.co/models/facebook/bart-large-cnn',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + process.env['ACCESS_TOKEN']
        },
        data: data
    };

    try {
        const response = await axios.request(config);
        return response.data[0].summary_text;
    } catch (err) {
        console.log(err);
        throw new Error("Failed to summarize the text.");
    }
}

module.exports = summarizeText;
        