import { useState, useEffect } from 'react';
import { ArrowDown, Code, Github, Linkedin, Mail, Download, Twitter, Facebook } from 'lucide-react';
import { Button } from '@/components/ui/button';

const HeroSection = () => {
  const [currentTagline, setCurrentTagline] = useState(0);
  const taglines = [
    "Blockchain & Software Developer",
    "Web3 Infrastructure Builder",
    "Building Secure, Scalable Systems"
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTagline((prev) => (prev + 1) % taglines.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [taglines.length]);

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = '/assets/Sharif CV.pdf'; // CV file in public/assets/
    link.download = 'Sharif_Iddrisu_CV.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2300f5ff' fill-opacity='0.05'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}
        ></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-pulse opacity-60"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 6}s`,
              animationDuration: `${4 + Math.random() * 6}s`
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Profile Section */}
        <div className="mb-6 sm:mb-8 lg:mb-10 relative flex justify-center">
          <div className="relative">
            {/* Profile Image */}
            <div className="w-36 h-36 sm:w-44 sm:h-44 md:w-52 md:h-52 lg:w-60 lg:h-60 xl:w-64 xl:h-64 mx-auto rounded-full glass-effect p-1.5 neon-glow shadow-2xl">
              <img
                src="/assets/1.jpg" // Make sure this path is correct and the image is in public/assets/
                alt="Sharif Iddrisu"
                className="w-full h-full object-cover rounded-full ring-2 ring-cyan-400/20"
              />
            </div>
            {/* Decorative Circles */}
            <div className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4 lg:-top-6 lg:-right-6 w-10 h-10 sm:w-14 sm:h-14 lg:w-18 lg:h-18 border-2 border-cyan-400/60 rounded-full animate-spin opacity-70"></div>
            <div className="absolute -bottom-3 -left-3 sm:-bottom-4 sm:-left-4 lg:-bottom-6 lg:-left-6 w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 border-2 border-blue-400/50 rounded-full animate-pulse opacity-50"></div>
            {/* Subtle Glow */}
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 animate-pulse"></div>
          </div>
        </div>

        {/* Greeting */}
        <div className="mb-4 sm:mb-6 lg:mb-8">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-light text-gray-300 mb-2 sm:mb-3 lg:mb-4">
            Hello, I'm{' '}
            <span className="text-gradient font-semibold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
              Sharif Iddrisu
            </span>
          </h1>
        </div>

        {/* Animated Tagline */}
        <div className="mb-6 sm:mb-8 lg:mb-10 h-14 sm:h-16 lg:h-20 xl:h-24 flex items-center justify-center">
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-orbitron font-bold text-gradient bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent leading-tight px-2">
            {taglines[currentTagline]}
          </h2>
        </div>

        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl text-gray-400 mb-6 sm:mb-8 lg:mb-12 xl:mb-16 max-w-4xl mx-auto leading-relaxed px-2">
          Computer Science Student | Blockchain & Software Developer | Passionate About{' '}
          <span className="text-cyan-400 font-medium">Web3 Infrastructure</span> and{' '}
          <span className="text-blue-400 font-medium">Open Source Development</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6 justify-center items-center mb-8 sm:mb-12 lg:mb-16 xl:mb-20 px-2">
          <Button
            size="lg"
            onClick={() => scrollToSection('projects')}
            className="w-full sm:w-auto glass-effect hover-glow px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 border-0 shadow-lg"
          >
            <Code className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            View Projects
          </Button>
          <Button
            onClick={handleDownloadCV}
            size="lg"
            className="w-full sm:w-auto glass-effect hover-glow px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg font-semibold bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 border-0 shadow-lg text-white"
          >
            <Download className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Download CV
          </Button>
          <Button
            variant="outline"
            size="lg"
            onClick={() => scrollToSection('contact')}
            className="w-full sm:w-auto glass-effect hover-glow px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base lg:text-lg border-2 border-cyan-400 text-cyan-400 hover:bg-cyan-400 hover:text-slate-900 shadow-lg"
          >
            <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
            Get In Touch
          </Button>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-8 lg:mb-12 xl:mb-16">
          <a
            href="https://github.com/noblex1"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect p-3 sm:p-4 rounded-full hover-glow transition-all duration-300 group"
            aria-label="GitHub Profile"
          >
            <Github className="h-5 w-5 sm:h-6 sm:w-6 text-cyan-400 group-hover:text-white transition-colors" />
          </a>
          <a
            href="https://www.linkedin.com/in/sharifiddrisu/"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect p-3 sm:p-4 rounded-full hover-glow transition-all duration-300 group"
            aria-label="LinkedIn Profile"
          >
            <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-blue-400 group-hover:text-white transition-colors" />
          </a>
          <a
            href="https://x.com/SharifIddr31325"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect p-3 sm:p-4 rounded-full hover-glow transition-all duration-300 group"
            aria-label="X (Twitter) Profile"
          >
            <Twitter className="h-5 w-5 sm:h-6 sm:w-6 text-gray-300 group-hover:text-white transition-colors" />
          </a>
          <a
            href="https://facebook.com/baba.sharif.545"
            target="_blank"
            rel="noopener noreferrer"
            className="glass-effect p-3 sm:p-4 rounded-full hover-glow transition-all duration-300 group"
            aria-label="Facebook Profile"
          >
            <Facebook className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500 group-hover:text-white transition-colors" />
          </a>
        </div>

        {/* Scroll Indicator */}
        <div className="animate-bounce cursor-pointer" onClick={() => scrollToSection('about')}>
          <ArrowDown className="h-6 w-6 sm:h-7 sm:w-7 lg:h-8 lg:w-8 text-cyan-400 mx-auto opacity-80 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
