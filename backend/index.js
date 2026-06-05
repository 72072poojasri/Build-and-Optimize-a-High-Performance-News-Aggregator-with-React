const express = require('express');
const cors = require('cors');
const hn = require('./hnApi');

const app = express();

app.use(cors());
app.use(express.json());

// Get top stories
app.get('/api/topstories', async (req, res) => {
  const limit = parseInt(req.query.limit, 10) || 50;

  try {
    const stories = await hn.getTopStories(limit);
    res.json(stories);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Get single story
app.get('/api/item/:id', async (req, res) => {
  try {
    const item = await hn.getItem(req.params.id);
    res.json(item);
  } catch (err) {
    res.status(500).json({
      error: err.message
    });
  }
});

// Health check endpoint for Docker
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy'
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});