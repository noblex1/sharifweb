import express, { Request, Response } from 'express';
import Experience from '../models/Experience.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { AuthRequest } from '../types/index.js';

const router = express.Router();

// Get all published experiences (public)
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const experiences = await Experience.find({ isPublished: true })
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch experiences', 
      error: error.message 
    });
  }
});

// Get all experiences including unpublished (admin only)
router.get('/all', authenticateToken, isAdmin, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const experiences = await Experience.find()
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: experiences.length,
      data: experiences
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch experiences', 
      error: error.message 
    });
  }
});

// Get single experience
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const experience = await Experience.findById(req.params.id);
    
    if (!experience) {
      res.status(404).json({ 
        success: false, 
        message: 'Experience not found' 
      });
      return;
    }

    res.json({
      success: true,
      data: experience
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch experience', 
      error: error.message 
    });
  }
});

// Create experience (admin only)
router.post('/', authenticateToken, isAdmin, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const experience = new Experience(_req.body);
    await experience.save();

    res.status(201).json({
      success: true,
      message: 'Experience created successfully',
      data: experience
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create experience', 
      error: error.message 
    });
  }
});

// Update experience (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const experience = await Experience.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!experience) {
      res.status(404).json({ 
        success: false, 
        message: 'Experience not found' 
      });
      return;
    }

    res.json({
      success: true,
      message: 'Experience updated successfully',
      data: experience
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update experience', 
      error: error.message 
    });
  }
});

// Delete experience (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const experience = await Experience.findByIdAndDelete(req.params.id);

    if (!experience) {
      res.status(404).json({ 
        success: false, 
        message: 'Experience not found' 
      });
      return;
    }

    res.json({
      success: true,
      message: 'Experience deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete experience', 
      error: error.message 
    });
  }
});

export default router;
