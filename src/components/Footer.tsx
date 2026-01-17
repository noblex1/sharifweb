import { Github, Linkedin, Code } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 sm:py-16 lg:py-20 border-t border-white/10 bg-slate-900/80">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8 lg:gap-12">
          <div className="text-center lg:text-left">
            <h3 className="text-2xl sm:text-3xl lg:text-4xl font-orbitron font-bold text-gradient mb-3 sm:mb-4">
              Sharif Iddrisu
            </h3>
            <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-md">
              Building the future with code, one project at a time.
            </p>
            <div className="flex items-center justify-center lg:justify-start gap-2 mt-3 sm:mt-4 text-sm sm:text-base text-gray-500">
              <Code className="h-4 w-4" />
              <span>Computer Science Student</span>
            </div>
          </div>
          
          <div className="flex flex-col items-center lg:items-end gap-6">
            <div className="flex items-center gap-4 sm:gap-6">
              <a
                href="https://github.com/noblex1"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect p-3 sm:p-4 rounded-full hover-glow transition-all duration-300 group"
                aria-label="GitHub Profile"
              >
                <Github className="h-5 w-5 sm:h-6 sm:w-6 text-neon-cyan group-hover:text-white transition-colors" />
              </a>
              <a
                href="https://www.linkedin.com/in/sharifiddrisu/"
                target="_blank"
                rel="noopener noreferrer"
                className="glass-effect p-3 sm:p-4 rounded-full hover-glow transition-all duration-300 group"
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="h-5 w-5 sm:h-6 sm:w-6 text-neon-blue group-hover:text-white transition-colors" />
              </a>
            </div>
            
            <div className="text-center lg:text-right">
              <p className="text-sm sm:text-base text-gray-400 mb-2">
                Available for freelance opportunities
              </p>
              <p className="text-xs sm:text-sm text-gray-500">
                Kumasi, Ghana • Open to remote work
              </p>
            </div>
          </div>
        </div>
        
        <div className="mt-8 sm:mt-12 lg:mt-16 pt-6 sm:pt-8 border-t border-white/10">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs sm:text-sm text-gray-400">
            <p className="text-center sm:text-left">
              © {currentYear} Sharif Iddrisu. All rights reserved.
            </p>
            <p className="text-center sm:text-right flex items-center gap-1">
              Designed & Developed by{' '}
              <span className="text-neon-cyan font-medium">Sharif Iddrisu</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
