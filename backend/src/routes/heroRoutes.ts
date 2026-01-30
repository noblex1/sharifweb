import express from 'express';
import Hero from '../models/Hero.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get hero section (public)
router.get('/', async (_req, res) => {
  try {
    const hero = await Hero.findOne({ isPublished: true });
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching hero section' });
  }
});

// Get hero section for admin (includes unpublished)
router.get('/admin', authenticateToken, async (_req, res) => {
  try {
    const hero = await Hero.findOne();
    res.json({ success: true, data: hero });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching hero section' });
  }
});

// Create or update hero section
router.post('/', authenticateToken, async (req, res) => {
  try {
    const existingHero = await Hero.findOne();
    
    if (existingHero) {
      const updated = await Hero.findByIdAndUpdate(
        existingHero._id,
        req.body,
        { new: true, runValidators: true }
      );
      res.json({ success: true, data: updated });
    } else {
      const hero = await Hero.create(req.body);
      res.status(201).json({ success: true, data: hero });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error saving hero section' });
  }
});

// Toggle publish status
router.patch('/publish', authenticateToken, async (_req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ success: false, message: 'Hero section not found' });
    }
    
    hero.isPublished = !hero.isPublished;
    await hero.save();
    
    return res.json({ success: true, data: hero });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error toggling publish status' });
  }
});

export default router;
