import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { X } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';

interface CertificateFormProps {
  certificate?: any;
  onClose: () => void;
}

const CertificateForm = ({ certificate, onClose }: CertificateFormProps) => {
  const [formData, setFormData] = useState({
    title: '',
    issuer: '',
    type: '',
    event: '',
    period: '',
    description: '',
    category: '',
    gradient: 'from-blue-500 to-cyan-500',
    credentialUrl: '',
    order: 0,
    isPublished: true
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (certificate) {
      setFormData({
        title: certificate.title || '',
        issuer: certificate.issuer || '',
        type: certificate.type || '',
        event: certificate.event || '',
        period: certificate.period || '',
        description: certificate.description || '',
        category: certificate.category || '',
        gradient: certificate.gradient || 'from-blue-500 to-cyan-500',
        credentialUrl: certificate.credentialUrl || '',
        order: certificate.order || 0,
        isPublished: certificate.isPublished ?? true
      });
    }
  }, [certificate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      ...formData,
      type: formData.type || null,
      event: formData.event || null,
      credentialUrl: formData.credentialUrl || null
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

      const url = certificate
        ? `${import.meta.env.VITE_API_URL}/api/certificates/${certificate._id}`
        : `${import.meta.env.VITE_API_URL}/api/certificates`;

      const response = await fetch(url, {
        method: certificate ? 'PUT' : 'POST',
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
          description: certificate ? 'Certificate updated successfully' : 'Certificate created successfully',
          duration: 3000,
        });
        setTimeout(() => {
          onClose();
        }, 500);
      } else {
        toast({
          title: 'Error',
          description: data.message || 'Failed to save certificate',
          variant: 'destructive'
        });
      }
    } catch (error) {
      console.error('Error saving certificate:', error);
      toast({
        title: 'Error',
        description: 'Failed to save certificate. Please check your connection.',
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
            {certificate ? 'Edit Certificate' : 'Add New Certificate'}
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
              <Label htmlFor="title" className="text-gray-300">Certificate Title *</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="issuer" className="text-gray-300">Issuer *</Label>
              <Input
                id="issuer"
                value={formData.issuer}
                onChange={(e) => setFormData({ ...formData, issuer: e.target.value })}
                placeholder="e.g., Sui Network"
                className="bg-slate-800/50 border-slate-700 text-white"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="type" className="text-gray-300">Type</Label>
              <Input
                id="type"
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                placeholder="e.g., On-chain NFT Certificate"
                className="bg-slate-800/50 border-slate-700 text-white"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="event" className="text-gray-300">Event</Label>
              <Input
                id="event"
                value={formData.event}
                onChange={(e) => setFormData({ ...formData, event: e.target.value })}
                placeholder="e.g., Virtual Youth Summit 2025"
                className="bg-slate-800/50 border-slate-700 text-white"
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
                placeholder="e.g., 11/2025 - 11/2025"
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
                placeholder="e.g., Blockchain, Cybersecurity"
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
                  <SelectItem value="from-red-500 to-pink-500">Red to Pink</SelectItem>
                  <SelectItem value="from-orange-500 to-red-500">Orange to Red</SelectItem>
                  <SelectItem value="from-green-500 to-emerald-500">Green to Emerald</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="credentialUrl" className="text-gray-300">Credential URL</Label>
              <Input
                id="credentialUrl"
                type="url"
                value={formData.credentialUrl}
                onChange={(e) => setFormData({ ...formData, credentialUrl: e.target.value })}
                placeholder="https://..."
                className="bg-slate-800/50 border-slate-700 text-white"
              />
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
                Publish this certificate
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
              {loading ? 'Saving...' : (certificate ? 'Update Certificate' : 'Create Certificate')}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CertificateForm;
