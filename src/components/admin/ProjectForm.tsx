import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface ProjectFormProps {
  project?: any;
  onClose: () => void;
}

const ProjectForm = ({ project, onClose }: ProjectFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    status: 'In Development',
    technologies: '',
    features: '',
    period: '',
    githubUrl: '',
    liveUrl: '',
    gradient: 'from-blue-500 to-cyan-500',
    order: 0,
    isPublished: true
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (project) {
      setFormData({
        title: project.title || '',
        description: project.description || '',
        category: project.category || '',
        status: project.status || 'In Development',
        technologies: project.technologies?.join(', ') || '',
        features: project.features?.join(', ') || '',
        period: project.period || '',
        githubUrl: project.githubUrl || '',
        liveUrl: project.liveUrl || '',
        gradient: project.gradient || 'from-blue-500 to-cyan-500',
        order: project.order || 0,
        isPublished: project.isPublished ?? true
      });
    }
  }, [project]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      technologies: formData.technologies.split(',').map(t => t.trim()).filter(Boolean),
      features: formData.features.split(',').map(f => f.trim()).filter(Boolean),
      githubUrl: formData.githubUrl || null,
      liveUrl: formData.liveUrl || null
    };

    console.log('Submitting project:', payload);

    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        toast({
          title: 'Authentication Error',
          description: 'Please login again',
          variant: 'destructive'
        });
        setLoading(false);
        return;
      }

      const url = project
        ? `${import.meta.env.VITE_API_URL}/api/projects/${project._id}`
        : `${import.meta.env.VITE_API_URL}/api/projects`;

      console.log('API URL:', url);
      console.log('Method:', project ? 'PUT' : 'POST');

      const response = await fetch(url, {
        method: project ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      console.log('Response status:', response.status);

      const data = await response.json();
      console.log('Response data:', data);

      if (data.success) {
        toast({
          title: 'Success! ✅',
          description: project ? 'Project updated successfully' : 'Project created successfully',
          duration: 3000,
        });
        // Small delay to show toast before closing
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to save project',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error saving project:', error);
      toast({
        title: 'Error',
        description: 'Failed to save project. Please check your connection.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="glass-effect border border-white/10 rounded-2xl w-full max-w-3xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-gradient">
            {project ? 'Edit Project' : 'Add New Project'}
          </h2>
          <Button
            onClick={onClose}
            variant="ghost"
            size="icon"
            className="text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="title" className="text-gray-300">Project Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">Category *</Label>
              <Input
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., AI & Cybersecurity"
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description *</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="bg-slate-800/50 border-slate-700 text-white"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="status" className="text-gray-300">Status *</Label>
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="In Development">In Development</SelectItem>
                  <SelectItem value="Completed">Completed</SelectItem>
                  <SelectItem value="Archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="period" className="text-gray-300">Period *</Label>
              <Input
                id="period"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="e.g., 01/2026 - Present"
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="technologies" className="text-gray-300">Technologies (comma-separated) *</Label>
            <Input
              id="technologies"
              value={formData.technologies}
              onChange={(e) => setFormData({ ...formData, technologies: e.target.value })}
              placeholder="React, TypeScript, Node.js"
              className="bg-slate-800/50 border-slate-700 text-white"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="features" className="text-gray-300">Key Features (comma-separated) *</Label>
            <Input
              id="features"
              value={formData.features}
              onChange={(e) => setFormData({ ...formData, features: e.target.value })}
              placeholder="Feature 1, Feature 2, Feature 3"
              className="bg-slate-800/50 border-slate-700 text-white"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="githubUrl" className="text-gray-300">GitHub URL</Label>
              <Input
                id="githubUrl"
                type="url"
                value={formData.githubUrl}
                onChange={(e) => setFormData({ ...formData, githubUrl: e.target.value })}
                placeholder="https://github.com/..."
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="liveUrl" className="text-gray-300">Live Demo URL</Label>
              <Input
                id="liveUrl"
                type="url"
                value={formData.liveUrl}
                onChange={(e) => setFormData({ ...formData, liveUrl: e.target.value })}
                placeholder="https://..."
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="gradient" className="text-gray-300">Gradient Colors</Label>
              <Select
                value={formData.gradient}
                onValueChange={(value) => setFormData({ ...formData, gradient: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="from-blue-500 to-cyan-500">Blue to Cyan</SelectItem>
                  <SelectItem value="from-purple-500 to-indigo-500">Purple to Indigo</SelectItem>
                  <SelectItem value="from-red-500 to-orange-500">Red to Orange</SelectItem>
                  <SelectItem value="from-green-500 to-emerald-500">Green to Emerald</SelectItem>
                  <SelectItem value="from-pink-500 to-rose-500">Pink to Rose</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="order" className="text-gray-300">Display Order</Label>
              <Input
                id="order"
                type="number"
                value={formData.order}
                onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Switch
              id="isPublished"
              checked={formData.isPublished}
              onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
            />
            <Label htmlFor="isPublished" className="text-gray-300">
              Publish this project
            </Label>
          </div>

          <div className="flex gap-4 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="flex-1 border-gray-600 text-gray-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={loading}
              className="flex-1 bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-900 font-semibold"
            >
              {loading ? 'Saving...' : (project ? 'Update Project' : 'Create Project')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectForm;
