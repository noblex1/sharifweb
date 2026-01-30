import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface HeroData {
  name: string;
  taglines: string[];
  subtitle: string;
  profileImage: string;
  cvUrl: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  isPublished: boolean;
}

export default function HeroForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<HeroData>({
    name: '',
    taglines: [],
    subtitle: '',
    profileImage: '',
    cvUrl: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      facebook: '',
    },
    isPublished: true,
  });
  const [newTagline, setNewTagline] = useState('');

  useEffect(() => {
    fetchHero();
  }, []);

  const fetchHero = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/hero/admin`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success && data.data) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching hero:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/hero`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: "Success!",
          description: "Hero section updated successfully",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error('Error saving hero:', error);
      toast({
        title: "Error",
        description: "Failed to save hero section",
        variant: "destructive",
      });
    }
  };

  const addTagline = () => {
    if (newTagline.trim()) {
      setFormData(prev => ({
        ...prev,
        taglines: [...prev.taglines, newTagline.trim()]
      }));
      setNewTagline('');
    }
  };

  const removeTagline = (index: number) => {
    setFormData(prev => ({
      ...prev,
      taglines: prev.taglines.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label>Taglines (rotating text)</Label>
        <div className="flex gap-2">
          <Input
            value={newTagline}
            onChange={(e) => setNewTagline(e.target.value)}
            placeholder="Add a tagline"
            className="bg-slate-800 border-slate-700"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTagline())}
          />
          <Button type="button" onClick={addTagline} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2 mt-2">
          {formData.taglines.map((tagline, index) => (
            <div key={index} className="flex items-center gap-2 bg-slate-800 p-2 rounded">
              <span className="flex-1 text-sm">{tagline}</span>
              <button type="button" onClick={() => removeTagline(index)} className="text-red-400 hover:text-red-300">
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="subtitle">Subtitle</Label>
        <Textarea
          id="subtitle"
          value={formData.subtitle}
          onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
          rows={3}
          required
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="profileImage">Profile Image Path</Label>
        <Input
          id="profileImage"
          value={formData.profileImage}
          onChange={(e) => setFormData({ ...formData, profileImage: e.target.value })}
          placeholder="/assets/1.jpg"
          required
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="cvUrl">CV URL</Label>
        <Input
          id="cvUrl"
          value={formData.cvUrl}
          onChange={(e) => setFormData({ ...formData, cvUrl: e.target.value })}
          placeholder="/assets/Sharif CV.pdf"
          required
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-4">
        <Label>Social Links</Label>
        <div className="grid grid-cols-1 gap-3">
          <Input
            placeholder="GitHub URL"
            value={formData.socialLinks.github}
            onChange={(e) => setFormData({ 
              ...formData, 
              socialLinks: { ...formData.socialLinks, github: e.target.value }
            })}
            className="bg-slate-800 border-slate-700"
          />
          <Input
            placeholder="LinkedIn URL"
            value={formData.socialLinks.linkedin}
            onChange={(e) => setFormData({ 
              ...formData, 
              socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
            })}
            className="bg-slate-800 border-slate-700"
          />
          <Input
            placeholder="Twitter URL"
            value={formData.socialLinks.twitter}
            onChange={(e) => setFormData({ 
              ...formData, 
              socialLinks: { ...formData.socialLinks, twitter: e.target.value }
            })}
            className="bg-slate-800 border-slate-700"
          />
          <Input
            placeholder="Facebook URL"
            value={formData.socialLinks.facebook}
            onChange={(e) => setFormData({ 
              ...formData, 
              socialLinks: { ...formData.socialLinks, facebook: e.target.value }
            })}
            className="bg-slate-800 border-slate-700"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="isPublished"
          checked={formData.isPublished}
          onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
          className="w-4 h-4"
        />
        <Label htmlFor="isPublished">Published</Label>
      </div>

      <Button type="submit" className="w-full">
        Save Hero Section
      </Button>
    </form>
  );
}
