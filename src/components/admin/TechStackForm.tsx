import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface TechStackFormProps {
  techItem?: any;
  onClose: () => void;
}

const TechStackForm = ({ techItem, onClose }: TechStackFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'languages' as 'languages' | 'frameworks' | 'tools',
    level: 50,
    icon: '',
    description: '',
    order: 0,
    isPublished: true
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (techItem) {
      setFormData({
        name: techItem.name || '',
        category: techItem.category || 'languages',
        level: techItem.level || 50,
        icon: techItem.icon || '',
        description: techItem.description || '',
        order: techItem.order || 0,
        isPublished: techItem.isPublished ?? true
      });
    }
  }, [techItem]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

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

      const url = techItem
        ? `${import.meta.env.VITE_API_URL}/api/tech-stack/${techItem._id}`
        : `${import.meta.env.VITE_API_URL}/api/tech-stack`;

      const response = await fetch(url, {
        method: techItem ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success! ✅',
          description: techItem ? 'Tech stack updated successfully' : 'Tech stack created successfully',
          duration: 3000,
        });
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to save tech stack',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error saving tech stack:', error);
      toast({
        title: 'Error',
        description: 'Failed to save tech stack. Please check your connection.',
        variant: 'destructive'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="glass-effect border border-white/10 rounded-2xl w-full max-w-2xl my-8">
        <div className="flex justify-between items-center p-6 border-b border-white/10">
          <h2 className="text-2xl font-bold text-gradient">
            {techItem ? 'Edit Tech Stack' : 'Add New Tech Stack'}
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
              <Label htmlFor="name" className="text-gray-300">Technology Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., TypeScript"
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="text-gray-300">Category *</Label>
              <Select
                value={formData.category}
                onValueChange={(value: any) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-slate-800/50 border-slate-700 text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="languages">Languages</SelectItem>
                  <SelectItem value="frameworks">Frameworks</SelectItem>
                  <SelectItem value="tools">Tools</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="icon" className="text-gray-300">Icon (Emoji) *</Label>
              <Input
                id="icon"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="e.g., 🔷 ⚡ 🚀"
                className="bg-slate-800/50 border-slate-700 text-white text-2xl"
                maxLength={2}
                required
              />
              <p className="text-xs text-gray-500">Use an emoji (Windows: Win+. | Mac: Cmd+Ctrl+Space)</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="level" className="text-gray-300">Proficiency Level (%) *</Label>
              <Input
                id="level"
                type="number"
                min="0"
                max="100"
                value={formData.level}
                onChange={(e) => setFormData({ ...formData, level: parseInt(e.target.value) || 0 })}
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
              <div className="w-full bg-slate-800 rounded-full h-2 mt-2">
                <div
                  className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full transition-all"
                  style={{ width: `${formData.level}%` }}
                />
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-gray-300">Description *</Label>
            <Input
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="e.g., Type-Safe Development"
              className="bg-slate-800/50 border-slate-700 text-white"
              required
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
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

            <div className="flex items-center space-x-2 pt-8">
              <Switch
                id="isPublished"
                checked={formData.isPublished}
                onCheckedChange={(checked) => setFormData({ ...formData, isPublished: checked })}
              />
              <Label htmlFor="isPublished" className="text-gray-300">
                Publish this tech
              </Label>
            </div>
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
              {loading ? 'Saving...' : (techItem ? 'Update Tech' : 'Create Tech')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TechStackForm;
