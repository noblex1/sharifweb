import express from 'express';
import Contact from '../models/Contact.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get contact section (public)
router.get('/', async (_req, res) => {
  try {
    const contact = await Contact.findOne({ isPublished: true });
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contact section' });
  }
});

// Get contact section for admin (includes unpublished)
router.get('/admin', authenticateToken, async (_req, res) => {
  try {
    const contact = await Contact.findOne();
    res.json({ success: true, data: contact });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching contact section' });
  }
});

// Create or update contact section
router.post('/', authenticateToken, async (req, res) => {
  try {
    const existingContact = await Contact.findOne();
    
    if (existingContact) {
      const updated = await Contact.findByIdAndUpdate(
        existingContact._id,
        req.body,
        { new: true, runValidators: true }
      );
      res.json({ success: true, data: updated });
    } else {
      const contact = await Contact.create(req.body);
      res.status(201).json({ success: true, data: contact });
    }
  } catch (error) {
    res.status(400).json({ success: false, message: 'Error saving contact section' });
  }
});

// Toggle publish status
router.patch('/publish', authenticateToken, async (_req, res) => {
  try {
    const contact = await Contact.findOne();
    if (!contact) {
      return res.status(404).json({ success: false, message: 'Contact section not found' });
    }
    
    contact.isPublished = !contact.isPublished;
    await contact.save();
    
    return res.json({ success: true, data: contact });
  } catch (error) {
    return res.status(500).json({ success: false, message: 'Error toggling publish status' });
  }
});

export default router;
