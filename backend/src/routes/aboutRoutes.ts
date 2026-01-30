import express from 'express';
import About from '../models/About.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get about section (public)
router.get('/', async (_req, res) => {
  try {
    const about = await About.findOne({ isPublished: true });
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching about section' });
  }
});

// Get about section for admin (includes unpublished)
router.get('/admin', authenticateToken, async (_req, res) => {
  try {
    const about = await About.findOne();
    res.json({ success: true, data: about });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching about section' });
  }
});

// Create or update about section
router.post('/', authenticateToken, async (req, res) => {
  try {
    const existingAbout = await About.findOne();
    
    if (existingAbout) {
      const updated = await About.findByIdAndUpdate(
        existingAbout._id,
        req.body,
        { new: true, runValidators: true }
      );
      res.json({ success: true, data: updated });
    } else {
      const about = await About.create(req.body);
      res.status(201).json({ success: true, data: about });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error saving about section' });
  }
});

// Toggle publish status
router.patch('/publish', authenticateToken, async (_req, res) => {
  try {
    const about = await About.findOne();
    if (!about) {
      return res.status(404).json({ success: false, message: 'About section not found' });
    }
    
    about.isPublished = !about.isPublished;
    await about.save();
    
    return res.json({ success: true, data: about });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error toggling publish status' });
  }
});

export default router;
