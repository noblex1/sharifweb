import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Plus, X } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface Achievement {
  icon: string;
  title: string;
  description: string;
  year: string;
  location: string;
}

interface AboutData {
  bio: string;
  location: string;
  skills: string[];
  achievements: Achievement[];
  isPublished: boolean;
}

export default function AboutForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<AboutData>({
    bio: '',
    location: '',
    skills: [],
    achievements: [],
    isPublished: true,
  });
  const [newSkill, setNewSkill] = useState('');

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/about/admin`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success && data.data) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/about`, {
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
          description: "About section updated successfully",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error('Error saving about:', error);
      toast({
        title: "Error",
        description: "Failed to save about section",
        variant: "destructive",
      });
    }
  };

  const addSkill = () => {
    if (newSkill.trim()) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const removeSkill = (index: number) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter((_, i) => i !== index)
    }));
  };

  const addAchievement = () => {
    setFormData(prev => ({
      ...prev,
      achievements: [...prev.achievements, {
        icon: '',
        title: '',
        description: '',
        year: '',
        location: ''
      }]
    }));
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.map((ach, i) => 
        i === index ? { ...ach, [field]: value } : ach
      )
    }));
  };

  const removeAchievement = (index: number) => {
    setFormData(prev => ({
      ...prev,
      achievements: prev.achievements.filter((_, i) => i !== index)
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={6}
          required
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          required
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label>Skills</Label>
        <div className="flex gap-2">
          <Input
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            placeholder="Add a skill"
            className="bg-slate-800 border-slate-700"
            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addSkill())}
          />
          <Button type="button" onClick={addSkill} size="sm">
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.skills.map((skill, index) => (
            <div key={index} className="flex items-center gap-1 bg-cyan-500/20 px-3 py-1 rounded-full">
              <span className="text-sm">{skill}</span>
              <button type="button" onClick={() => removeSkill(index)} className="text-red-400 hover:text-red-300">
                <X className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <Label>Achievements</Label>
          <Button type="button" onClick={addAchievement} size="sm">
            <Plus className="h-4 w-4 mr-1" /> Add Achievement
          </Button>
        </div>
        {formData.achievements.map((achievement, index) => (
          <div key={index} className="p-4 bg-slate-800 rounded-lg space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Achievement {index + 1}</span>
              <Button type="button" onClick={() => removeAchievement(index)} size="sm" variant="destructive">
                <X className="h-4 w-4" />
              </Button>
            </div>
            <Input
              placeholder="Icon (e.g., Book, Code)"
              value={achievement.icon}
              onChange={(e) => updateAchievement(index, 'icon', e.target.value)}
              className="bg-slate-700 border-slate-600"
            />
            <Input
              placeholder="Title"
              value={achievement.title}
              onChange={(e) => updateAchievement(index, 'title', e.target.value)}
              className="bg-slate-700 border-slate-600"
            />
            <Input
              placeholder="Description"
              value={achievement.description}
              onChange={(e) => updateAchievement(index, 'description', e.target.value)}
              className="bg-slate-700 border-slate-600"
            />
            <Input
              placeholder="Year (e.g., 01/2023 - Present)"
              value={achievement.year}
              onChange={(e) => updateAchievement(index, 'year', e.target.value)}
              className="bg-slate-700 border-slate-600"
            />
            <Input
              placeholder="Location"
              value={achievement.location}
              onChange={(e) => updateAchievement(index, 'location', e.target.value)}
              className="bg-slate-700 border-slate-600"
            />
          </div>
        ))}
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
        Save About Section
      </Button>
    </form>
  );
}
