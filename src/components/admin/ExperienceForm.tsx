import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Switch } from '@/components/ui/switch';

interface ExperienceFormProps {
  experience?: any;
  onClose: () => void;
}

const ExperienceForm = ({ experience, onClose }: ExperienceFormProps) => {
  const [formData, setFormData] = useState({
    company: '',
    position: '',
    period: '',
    location: '',
    description: '',
    achievements: '',
    contactName: '',
    contactRole: '',
    contactEmail: '',
    contactPhone: '',
    order: 0,
    isPublished: true
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (experience) {
      setFormData({
        company: experience.company || '',
        position: experience.position || '',
        period: experience.period || '',
        location: experience.location || '',
        description: experience.description || '',
        achievements: experience.achievements?.join('\n') || '',
        contactName: experience.contact?.name || '',
        contactRole: experience.contact?.role || '',
        contactEmail: experience.contact?.email || '',
        contactPhone: experience.contact?.phone || '',
        order: experience.order || 0,
        isPublished: experience.isPublished ?? true
      });
    }
  }, [experience]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      company: formData.company,
      position: formData.position,
      period: formData.period,
      location: formData.location,
      description: formData.description,
      achievements: formData.achievements.split('\n').map(a => a.trim()).filter(Boolean),
      contact: {
        name: formData.contactName,
        role: formData.contactRole,
        email: formData.contactEmail,
        phone: formData.contactPhone
      },
      order: formData.order,
      isPublished: formData.isPublished
    };

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

      const url = experience
        ? `${import.meta.env.VITE_API_URL}/api/experiences/${experience._id}`
        : `${import.meta.env.VITE_API_URL}/api/experiences`;

      const response = await fetch(url, {
        method: experience ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (data.success) {
        toast({
          title: 'Success! ✅',
          description: experience ? 'Experience updated successfully' : 'Experience created successfully',
          duration: 3000,
        });
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to save experience',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error saving experience:', error);
      toast({
        title: 'Error',
        description: 'Failed to save experience. Please check your connection.',
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
            {experience ? 'Edit Experience' : 'Add New Experience'}
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
              <Label htmlFor="company" className="text-gray-300">Company *</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="position" className="text-gray-300">Position *</Label>
              <Input
                id="position"
                value={formData.position}
                onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="period" className="text-gray-300">Period *</Label>
              <Input
                id="period"
                value={formData.period}
                onChange={(e) => setFormData({ ...formData, period: e.target.value })}
                placeholder="e.g., 06/2025 - 08/2025"
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location" className="text-gray-300">Location *</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                placeholder="e.g., Tamale, Ghana"
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

          <div className="space-y-2">
            <Label htmlFor="achievements" className="text-gray-300">Achievements (one per line) *</Label>
            <Textarea
              id="achievements"
              value={formData.achievements}
              onChange={(e) => setFormData({ ...formData, achievements: e.target.value })}
              rows={5}
              placeholder="Achievement 1&#10;Achievement 2&#10;Achievement 3"
              className="bg-slate-800/50 border-slate-700 text-white"
              required
            />
          </div>

          <div className="border-t border-white/10 pt-6">
            <h3 className="text-lg font-semibold text-white mb-4">Reference Contact</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="contactName" className="text-gray-300">Name *</Label>
                <Input
                  id="contactName"
                  value={formData.contactName}
                  onChange={(e) => setFormData({ ...formData, contactName: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactRole" className="text-gray-300">Role *</Label>
                <Input
                  id="contactRole"
                  value={formData.contactRole}
                  onChange={(e) => setFormData({ ...formData, contactRole: e.target.value })}
                  placeholder="e.g., CEO"
                  className="bg-slate-800/50 border-slate-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactEmail" className="text-gray-300">Email *</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  value={formData.contactEmail}
                  onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                  className="bg-slate-800/50 border-slate-700 text-white"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="contactPhone" className="text-gray-300">Phone *</Label>
                <Input
                  id="contactPhone"
                  value={formData.contactPhone}
                  onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                  placeholder="(+233) 597 244 448"
                  className="bg-slate-800/50 border-slate-700 text-white"
                  required
                />
              </div>
            </div>
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
                Publish this experience
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
              {loading ? 'Saving...' : (experience ? 'Update Experience' : 'Create Experience')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ExperienceForm;
