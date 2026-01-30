import express, { Request, Response } from 'express';
import Certificate from '../models/Certificate.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { AuthRequest } from '../types/index.js';

const router = express.Router();

// Get all published certificates (public)
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const certificates = await Certificate.find({ isPublished: true })
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: certificates.length,
      data: certificates
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch certificates', 
      error: error.message 
    });
  }
});

// Get all certificates including unpublished (admin only)
router.get('/all', authenticateToken, isAdmin, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const certificates = await Certificate.find()
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: certificates.length,
      data: certificates
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch certificates', 
      error: error.message 
    });
  }
});

// Get single certificate
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const certificate = await Certificate.findById(req.params.id);
    
    if (!certificate) {
      res.status(404).json({ 
        success: false, 
        message: 'Certificate not found' 
      });
      return;
    }

    res.json({
      success: true,
      data: certificate
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch certificate', 
      error: error.message 
    });
  }
});

// Create certificate (admin only)
router.post('/', authenticateToken, isAdmin, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const certificate = new Certificate(_req.body);
    await certificate.save();

    res.status(201).json({
      success: true,
      message: 'Certificate created successfully',
      data: certificate
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create certificate', 
      error: error.message 
    });
  }
});

// Update certificate (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const certificate = await Certificate.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!certificate) {
      res.status(404).json({ 
        success: false, 
        message: 'Certificate not found' 
      });
      return;
    }

    res.json({
      success: true,
      message: 'Certificate updated successfully',
      data: certificate
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update certificate', 
      error: error.message 
    });
  }
});

// Delete certificate (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const certificate = await Certificate.findByIdAndDelete(req.params.id);

    if (!certificate) {
      res.status(404).json({ 
        success: false, 
        message: 'Certificate not found' 
      });
      return;
    }

    res.json({
      success: true,
      message: 'Certificate deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete certificate', 
      error: error.message 
    });
  }
});

export default router;
