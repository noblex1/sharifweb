import express, { Request, Response } from 'express';
import TechStack from '../models/TechStack.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { AuthRequest } from '../types/index.js';

const router = express.Router();

// Get all published tech stack items (public)
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const techStack = await TechStack.find({ isPublished: true })
      .sort({ category: 1, order: 1 });
    
    res.json({
      success: true,
      count: techStack.length,
      data: techStack
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch tech stack', 
      error: error.message 
    });
  }
});

// Get all tech stack items including unpublished (admin only)
router.get('/all', authenticateToken, isAdmin, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const techStack = await TechStack.find()
      .sort({ category: 1, order: 1 });
    
    res.json({
      success: true,
      count: techStack.length,
      data: techStack
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch tech stack', 
      error: error.message 
    });
  }
});

// Get single tech stack item
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const techItem = await TechStack.findById(req.params.id);
    
    if (!techItem) {
      res.status(404).json({ 
        success: false, 
        message: 'Tech stack item not found' 
      });
      return;
    }

    res.json({
      success: true,
      data: techItem
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch tech stack item', 
      error: error.message 
    });
  }
});

// Create tech stack item (admin only)
router.post('/', authenticateToken, isAdmin, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const techItem = new TechStack(_req.body);
    await techItem.save();

    res.status(201).json({
      success: true,
      message: 'Tech stack item created successfully',
      data: techItem
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create tech stack item', 
      error: error.message 
    });
  }
});

// Update tech stack item (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const techItem = await TechStack.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!techItem) {
      res.status(404).json({ 
        success: false, 
        message: 'Tech stack item not found' 
      });
      return;
    }

    res.json({
      success: true,
      message: 'Tech stack item updated successfully',
      data: techItem
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update tech stack item', 
      error: error.message 
    });
  }
});

// Delete tech stack item (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const techItem = await TechStack.findByIdAndDelete(req.params.id);

    if (!techItem) {
      res.status(404).json({ 
        success: false, 
        message: 'Tech stack item not found' 
      });
      return;
    }

    res.json({
      success: true,
      message: 'Tech stack item deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete tech stack item', 
      error: error.message 
    });
  }
});

export default router;
