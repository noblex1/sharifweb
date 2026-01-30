import express, { Request, Response } from 'express';
import Project from '../models/Project.js';
import { authenticateToken, isAdmin } from '../middleware/auth.js';
import { AuthRequest } from '../types/index.js';

const router = express.Router();

// Get all published projects (public)
router.get('/', async (_req: Request, res: Response): Promise<void> => {
  try {
    const projects = await Project.find({ isPublished: true })
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch projects', 
      error: error.message 
    });
  }
});

// Get all projects including unpublished (admin only)
router.get('/all', authenticateToken, isAdmin, async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    const projects = await Project.find()
      .sort({ order: 1, createdAt: -1 });
    
    res.json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch projects', 
      error: error.message 
    });
  }
});

// Get single project
router.get('/:id', async (req: Request, res: Response): Promise<void> => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
      return;
    }

    res.json({
      success: true,
      data: project
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch project', 
      error: error.message 
    });
  }
});

// Create project (admin only)
router.post('/', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = new Project(req.body);
    await project.save();

    res.status(201).json({
      success: true,
      message: 'Project created successfully',
      data: project
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create project', 
      error: error.message 
    });
  }
});

// Update project (admin only)
router.put('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!project) {
      res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
      return;
    }

    res.json({
      success: true,
      message: 'Project updated successfully',
      data: project
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update project', 
      error: error.message 
    });
  }
});

// Delete project (admin only)
router.delete('/:id', authenticateToken, isAdmin, async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);

    if (!project) {
      res.status(404).json({ 
        success: false, 
        message: 'Project not found' 
      });
      return;
    }

    res.json({
      success: true,
      message: 'Project deleted successfully'
    });
  } catch (error: any) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to delete project', 
      error: error.message 
    });
  }
});

export default router;
