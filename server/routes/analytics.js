const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// Get analytics for a specific video
router.get('/:videoId', (req, res) => {
  const { videoId } = req.params;
  const dbPath = path.join(__dirname, '../db.json');

  if (!fs.existsSync(dbPath)) {
    return res.status(404).json({ error: 'Database not found' });
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  const video = db.videos.find((v) => v.id === videoId);

  if (!video) {
    return res.status(404).json({ error: 'Video not found' });
  }

  const analytics = {
    videoId: video.id,
    filename: video.filename,
    uploadedAt: video.uploadedAt,
    size: video.size,
    duration: video.endTime ? video.endTime - video.startTime : null,
    startTime: video.startTime,
    endTime: video.endTime,
  };

  res.json(analytics);
});

// Get all videos
router.get('/', (req, res) => {
  const dbPath = path.join(__dirname, '../db.json');

  if (!fs.existsSync(dbPath)) {
    return res.json({ videos: [] });
  }

  const db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));

  const analytics = db.videos.map((video) => ({
    videoId: video.id,
    filename: video.filename,
    uploadedAt: video.uploadedAt,
    size: video.size,
    duration: video.endTime ? video.endTime - video.startTime : null,
  }));

  res.json({ videos: analytics });
});

module.exports = router;
