
import { Github, ArrowRight, ExternalLink, Calendar, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ProjectsSection = () => {
  const projects = [
    {
      id: 1,
      title: "SafeNet",
      description: "Blockchain-based public safety alert platform that leverages decentralized technology to provide secure, transparent, and reliable public safety notifications. Built using Sui blockchain and Move smart contracts to ensure immutability and trust in critical safety communications.",
      technologies: ["Move (Sui)", "React", "TypeScript", "Blockchain", "Sui Network"],
      category: "Blockchain & Public Safety",
      status: "In Development",
      gradient: "from-blue-500 to-cyan-500",
      features: ["Smart Contracts", "Decentralized Alerts", "Blockchain Security"],
      period: "01/2026 - Present",
      githubUrl: "https://github.com/noblex1/SafeNet-V2",
      liveUrl: null
    },
    {
      id: 2,
      title: "WalBox",
      description: "Decentralized file storage solution built on blockchain technology, enabling secure and distributed file storage with enhanced data integrity and accessibility. Utilizes smart contracts for storage management and access control.",
      technologies: ["Move (Sui)", "React/Next.js", "TypeScript", "Blockchain", "Web3"],
      category: "Decentralized Storage",
      status: "Completed",
      gradient: "from-purple-500 to-indigo-500",
      features: ["Decentralized Storage", "Smart Contracts", "File Management"],
      period: "11/2025 - 12/2025",
      githubUrl: "https://github.com/Sui-North/WalBox",
      liveUrl: "https://walbox.vercel.app/"
    },
    {
      id: 3,
      title: "NetWard AI",
      description: "AI-Powered Phishing Detection & Threat Intelligence Platform. A futuristic, AI-powered web security tool that detects phishing links, spoofed websites, and unauthorized redirects in real-time. Designed with advanced threat intelligence and machine learning, NetWard AI scans every URL to protect users from hidden cyber threats.",
      technologies: ["AI/ML", "React", "TypeScript", "Threat Intelligence", "Cybersecurity"],
      category: "AI & Cybersecurity",
      status: "Completed",
      gradient: "from-red-500 to-orange-500",
      features: ["Phishing Detection", "Real-time Scanning", "Threat Intelligence"],
      period: "2025",
      githubUrl: "https://github.com/noblex1/NetWard.ai",
      liveUrl: "https://net-ward-ai.vercel.app/"
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 max-w-7xl mx-auto">
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
                  <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {project.description}
                  </p>

                  {/* Project Period */}
                  {project.period && (
                    <div className="mb-6 flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                      <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                      <span>{project.period}</span>
                    </div>
                  )}

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
                    {project.githubUrl && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        className="flex-1 glass-effect border-neon-cyan/50 text-neon-cyan hover:bg-neon-cyan hover:text-slate-900 group-hover:scale-105 transition-all duration-300 font-medium"
                        onClick={() => window.open(project.githubUrl, '_blank')}
                      >
                        <Github className="mr-2 h-4 w-4" />
                        View Code
                      </Button>
                    )}
                    {project.liveUrl && (
                      <Button 
                        size="sm"
                        className="flex-1 bg-gradient-to-r from-neon-cyan to-neon-blue hover:from-neon-blue hover:to-neon-cyan group-hover:scale-105 transition-all duration-300 font-medium"
                        onClick={() => window.open(project.liveUrl, '_blank')}
                      >
                        <ExternalLink className="mr-2 h-4 w-4" />
                        Live Demo
                      </Button>
                    )}
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
