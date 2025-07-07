
import { Github, ArrowRight, ExternalLink, Calendar, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "NetWard AI",
      description: "Advanced phishing detection system using machine learning algorithms to protect users from malicious websites and emails with real-time threat analysis.",
      technologies: ["Python", "TensorFlow", "React", "Node.js", "MongoDB"],
      category: "Cybersecurity",
      status: "In Development",
      gradient: "from-red-500 to-pink-500",
      features: ["Real-time Detection", "ML Models", "Web Protection"]
    },
    {
      id: 2,
      title: "Smart ChatBot",
      description: "NLP-powered conversational AI assistant that understands context and provides intelligent responses for various domains with natural language processing.",
      technologies: ["Python", "OpenAI", "FastAPI", "React", "PostgreSQL"],
      category: "Artificial Intelligence",
      status: "Completed",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Context Awareness", "Multi-domain", "API Integration"]
    },
    {
      id: 3,
      title: "SecurePass",
      description: "Advanced password generator and manager with encryption, breach monitoring, and secure vault functionality for enhanced digital security.",
      technologies: ["JavaScript", "Electron", "Node.js", "MongoDB", "Crypto"],
      category: "Cybersecurity",
      status: "Completed",
      gradient: "from-green-500 to-emerald-500",
      features: ["Encryption", "Breach Monitor", "Secure Vault"]
    },
    {
      id: 4,
      title: "CyberVault",
      description: "Data protection tracker that monitors file integrity, detects unauthorized access, and provides comprehensive security analytics dashboard.",
      technologies: ["Python", "SQLite", "Tkinter", "Cryptography", "Flask"],
      category: "Security Analytics",
      status: "In Development",
      gradient: "from-purple-500 to-indigo-500",
      features: ["File Monitoring", "Access Control", "Analytics"]
    }
  ];

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 relative bg-slate-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-gradient mb-4 sm:mb-6">
            Featured Projects
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8">
            Explore my latest work in AI, cybersecurity, and software development
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full"></div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
          {projects.map((project) => (
            <div key={project.id} className="group perspective">
              <div className="relative preserve-3d transition-all duration-700 hover:scale-105">
                {/* Enhanced Project Card */}
                <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-2xl border border-white/10 hover:border-neon-cyan/50 transition-all duration-300 h-full flex flex-col">
                  {/* Enhanced Header */}
                  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start mb-6 gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                        {project.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                        <span className="text-xs sm:text-sm px-3 py-1 rounded-full bg-gradient-to-r from-neon-cyan/20 to-neon-blue/20 text-neon-cyan border border-neon-cyan/30 font-medium">
                          {project.category}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                          project.status === 'Completed' 
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                    </div>
                    <Code2 className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 group-hover:text-cyan-400 transition-colors flex-shrink-0" />
                  </div>

                  {/* Enhanced Description */}
                  <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {project.description}
                  </p>

                  {/* Key Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Key Features</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.features.map((feature) => (
                        <span
                          key={feature}
                          className="text-xs px-2 py-1 bg-slate-700/50 text-gray-300 rounded-md border border-slate-600 hover:border-neon-cyan/50 transition-colors cursor-default"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Technologies */}
                  <div className="mb-8 flex-1">
                    <h4 className="text-sm font-semibold text-gray-400 mb-3">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-xs px-3 py-1 bg-slate-800/70 text-gray-300 rounded-full border border-slate-700 hover:border-neon-cyan/50 transition-colors cursor-default font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Enhanced Action Buttons */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                    <Button 
                      variant="outline" 
                      size="sm"
                      className="flex-1 glass-effect border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-slate-900 group-hover:scale-105 transition-all duration-300 font-medium"
                    >
                      <Github className="mr-2 h-4 w-4" />
                      View Code
                    </Button>
                    <Button 
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-blue hover:to-neon-cyan group-hover:scale-105 transition-all duration-300 font-medium"
                    >
                      <ExternalLink className="mr-2 h-4 w-4" />
                      Live Demo
                    </Button>
                  </div>
                </div>

                {/* Enhanced Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-r ${project.gradient} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 -z-10 blur-xl`}></div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced View All Projects Button */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <Button 
            variant="outline" 
            size="lg"
            className="glass-effect border-2 border-neon-cyan text-neon-cyan hover:bg-neon-cyan hover:text-slate-900 px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-semibold hover:scale-105 transition-all duration-300"
          >
            View All Projects
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
