import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

interface ContactData {
  location: string;
  email: string;
  phone: string;
  portfolio: string;
  socialLinks: {
    github: string;
    linkedin: string;
    twitter: string;
    facebook: string;
  };
  isPublished: boolean;
}

export default function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ContactData>({
    location: '',
    email: '',
    phone: '',
    portfolio: '',
    socialLinks: {
      github: '',
      linkedin: '',
      twitter: '',
      facebook: '',
    },
    isPublished: true,
  });

  useEffect(() => {
    fetchContact();
  }, []);

  const fetchContact = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/contact/admin`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success && data.data) {
        setFormData(data.data);
      }
    } catch (error) {
      console.error('Error fetching contact:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/api/contact`, {
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
          description: "Contact section updated successfully",
        });
        setTimeout(() => {
          window.location.reload();
        }, 500);
      }
    } catch (error) {
      console.error('Error saving contact:', error);
      toast({
        title: "Error",
        description: "Failed to save contact section",
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
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
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          required
          className="bg-slate-800 border-slate-700"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="portfolio">Portfolio URL</Label>
        <Input
          id="portfolio"
          value={formData.portfolio}
          onChange={(e) => setFormData({ ...formData, portfolio: e.target.value })}
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
        Save Contact Section
      </Button>
    </form>
  );
}
