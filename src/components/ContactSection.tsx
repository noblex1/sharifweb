
import { useState } from 'react';
import { Github, Linkedin, ArrowRight, Mail, MapPin, User, MessageSquare, Send } from 'lucide-react';
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
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message Sent!",
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
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
                  <User className="h-5 w-5 sm:h-6 sm:w-6 text-neon-blue mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-neon-blue mb-2">Education</h4>
                    <p className="text-gray-300 text-sm sm:text-base">University for Development Studies</p>
                    <p className="text-gray-400 text-xs sm:text-sm mt-1">Computer Science Student</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <MessageSquare className="h-5 w-5 sm:h-6 sm:w-6 text-purple-400 mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="text-lg sm:text-xl font-semibold text-purple-400 mb-2">Interests</h4>
                    <p className="text-gray-300 text-sm sm:text-base">AI Development, Cybersecurity, Open Source</p>
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
                  href="https://linkedin.com/in/sharifiddrisu"
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
              </div>
            </div>
          </div>

          {/* Enhanced Contact Form */}
          <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-2xl">
            <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-3">
              <Send className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400" />
              Send Message
            </h3>
            <form action="https://api.web3forms.com/submit" method="POST" onSubmit={handleSubmit} className="space-y-6">
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
                <input type="hidden" name="access_key" value="94aea3cd-7864-41df-8bd8-b4410da94d78"></input>
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
