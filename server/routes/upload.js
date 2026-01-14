const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();

// Configure multer for video uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadDir = path.join(__dirname, '../videos');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const videoId = uuidv4();
    cb(null, `${videoId}.webm`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 500 * 1024 * 1024 }, // 500MB limit
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('video/')) {
      cb(null, true);
    } else {
      cb(new Error('Only video files are allowed'));
    }
  },
});

// Upload endpoint
router.post('/', upload.single('video'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No video file provided' });
  }

  const videoData = {
    id: req.file.filename.split('.')[0],
    filename: req.file.filename,
    originalName: req.file.originalname,
    size: req.file.size,
    path: `/videos/${req.file.filename}`,
    uploadedAt: new Date(),
    startTime: req.body.startTime || 0,
    endTime: req.body.endTime || null,
  };

  // Save metadata to db.json
  const dbPath = path.join(__dirname, '../db.json');
  let db = { videos: [] };

  if (fs.existsSync(dbPath)) {
    db = JSON.parse(fs.readFileSync(dbPath, 'utf8'));
  }

  db.videos.push(videoData);
  fs.writeFileSync(dbPath, JSON.stringify(db, null, 2));

  res.json({
    message: 'Video uploaded successfully',
    video: videoData,
  });
});

module.exports = router;
