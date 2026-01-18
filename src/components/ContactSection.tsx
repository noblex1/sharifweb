
import { useState } from 'react';
import { Github, Linkedin, ArrowRight, Mail, MapPin, User, MessageSquare, Send, Twitter, Facebook, Phone, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted!');
    console.log('Form data state:', formData);
    
    // Validate form data
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      console.error('Form validation failed:', formData);
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Create form data with all required fields for Web3Forms
      const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY;
      
      if (!accessKey) {
        console.error('Web3Forms access key is missing. Environment variable VITE_WEB3FORMS_ACCESS_KEY is not set.');
        toast({
          title: "Configuration Error",
          description: "Contact form is not properly configured. Please contact me directly via email.",
          variant: "destructive",
        });
        setIsSubmitting(false);
        return;
      }
      
      const formDataToSend = new FormData();
      formDataToSend.append('access_key', accessKey);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('subject', formData.subject);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('from_name', formData.name);
      formDataToSend.append('replyto', formData.email);
      formDataToSend.append('botcheck', '');
      
      // Add origin for better tracking
      formDataToSend.append('website', window.location.origin);
      
      console.log('Sending form data to Web3Forms:', {
        origin: window.location.origin,
        hasAccessKey: !!accessKey,
        name: formData.name,
        email: formData.email,
        subject: formData.subject
      });
      
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
        },
        body: formDataToSend
      });
      
      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error:', errorText);
        throw new Error(`HTTP error! status: ${response.status}, message: ${errorText}`);
      }
      
      const result = await response.json();
      console.log('Web3Forms response:', result);
      
      if (result.success) {
        toast({
          title: "Message Sent Successfully!",
          description: "Thank you for reaching out. I'll get back to you soon!",
        });
        setFormData({ name: '', email: '', subject: '', message: '' });
      } else {
        const errorMessage = result.message || result.error || 'Failed to send message';
        console.error('Web3Forms error:', errorMessage, result);
        throw new Error(errorMessage);
      }
    } catch (error) {
      console.error('Error sending message:', error);
      
      // Provide more specific error messages
      let errorMessage = "Something went wrong. Please try again or contact me directly via email.";
      
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          errorMessage = "Network error. Please check your connection and try again.";
        } else if (error.message.includes('HTTP error')) {
          errorMessage = `Server error (${error.message}). Please try again later.`;
        } else if (error.message.includes('access key')) {
          errorMessage = "Configuration error. Please contact me directly via email.";
        } else {
          errorMessage = error.message || errorMessage;
        }
      }
      
      toast({
        title: "Error Sending Message",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 relative bg-slate-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-gradient mb-4 sm:mb-6">
            Let's Connect
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8">
            Ready to collaborate on something amazing? Let's build the future together.
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
          {/* Enhanced Contact Info */}
          <div className="space-y-6 sm:space-y-8">
            <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
                <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
                Get In Touch
              </h3>
              <div className="space-y-6 sm:space-y-8">
                <div className="flex items-start gap-4">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-neon-cyan mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-neon-cyan mb-2">Location</h4>
                    <p className="text-gray-300 text-sm sm:text-base">Kumasi, Ashanti Region, Ghana</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-neon-blue mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-neon-blue mb-2">Email</h4>
                    <a href="mailto:sharifiddrisu156@gmail.com" className="text-gray-300 text-sm sm:text-base hover:text-cyan-400 transition-colors">
                      sharifiddrisu156@gmail.com
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-purple-400 mb-2">Phone</h4>
                    <a href="tel:+233241600434" className="text-gray-300 text-sm sm:text-base hover:text-cyan-400 transition-colors">
                      +233 24 160 0434
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Globe className="h-5 w-5 sm:h-6 sm:w-6 text-green-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-green-400 mb-2">Portfolio</h4>
                    <a href="https://sharifiddrisu-online.netlify.app/" target="_blank" rel="noopener noreferrer" className="text-gray-300 text-sm sm:text-base hover:text-cyan-400 transition-colors">
                      sharifiddrisu-online.netlify.app
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Social Links */}
            <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-2xl">
              <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8">Connect With Me</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a
                  href="https://github.com/noblex1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-effect p-4 sm:p-6 rounded-xl hover-glow flex items-center justify-center gap-3 text-neon-cyan hover:text-white transition-all duration-300 group"
                >
                  <Github className="h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <span className="font-medium text-sm sm:text-base block">GitHub</span>
                    <span className="text-xs text-gray-400">View my code</span>
                  </div>
                </a>
                <a
                  href="https://www.linkedin.com/in/sharifiddrisu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-effect p-4 sm:p-6 rounded-xl hover-glow flex items-center justify-center gap-3 text-neon-blue hover:text-white transition-all duration-300 group"
                >
                  <Linkedin className="h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <span className="font-medium text-sm sm:text-base block">LinkedIn</span>
                    <span className="text-xs text-gray-400">Professional network</span>
                  </div>
                </a>
                <a
                  href="https://x.com/SharifIddr31325"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-effect p-4 sm:p-6 rounded-xl hover-glow flex items-center justify-center gap-3 text-gray-300 hover:text-white transition-all duration-300 group"
                >
                  <Twitter className="h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <span className="font-medium text-sm sm:text-base block">X (Twitter)</span>
                    <span className="text-xs text-gray-400">Follow updates</span>
                  </div>
                </a>
                <a
                  href="https://facebook.com/baba.sharif.545"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-effect p-4 sm:p-6 rounded-xl hover-glow flex items-center justify-center gap-3 text-blue-500 hover:text-white transition-all duration-300 group"
                >
                  <Facebook className="h-6 w-6 sm:h-8 sm:w-8 group-hover:scale-110 transition-transform" />
                  <div className="text-left">
                    <span className="font-medium text-sm sm:text-base block">Facebook</span>
                    <span className="text-xs text-gray-400">Connect socially</span>
                  </div>
                </a>
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
              <Send className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
              Send Message
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium text-gray-300">
                    Full Name 
                  </label>
                  <Input
                    id="name"
                    name="name"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    className="glass-effect border-white/20 focus:border-neon-cyan bg-transparent text-white placeholder:text-gray-400 h-12"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium text-gray-300">
                    Email Address 
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="glass-effect border-white/20 focus:border-neon-cyan bg-transparent text-white placeholder:text-gray-400 h-12"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium text-gray-300">
                  Subject 
                </label>
                <Input
                  id="subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={formData.subject}
                  onChange={handleChange}
                  className="glass-effect border-white/20 focus:border-neon-cyan bg-transparent text-white placeholder:text-gray-400 h-12"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium text-gray-300">
                  Message
                </label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project or idea..."
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  className="glass-effect border-white/20 focus:border-neon-cyan bg-transparent text-white placeholder:text-gray-400 resize-none"
                  required
                />
              </div>
              
              <Button
                type="submit"
                size="lg"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-blue hover:to-neon-cyan font-semibold py-3 sm:py-4 hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
