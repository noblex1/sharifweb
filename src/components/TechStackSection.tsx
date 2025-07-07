
import { useState } from 'react';
import { Code, Wrench, Zap, TrendingUp } from 'lucide-react';

const TechStackSection = () => {
  const [activeCategory, setActiveCategory] = useState('languages');

  const techStack = {
    languages: [
      { name: 'Python', level: 90, icon: '🐍', description: 'AI/ML Development' },
      { name: 'JavaScript', level: 85, icon: '⚡', description: 'Web Development' },
      { name: 'TypeScript', level: 80, icon: '🔷', description: 'Type Safety' },
      { name: 'C++', level: 75, icon: '⚙️', description: 'System Programming' },
      { name: 'Java', level: 70, icon: '☕', description: 'Enterprise Apps' },
    ],
    frameworks: [
      { name: 'React', level: 90, icon: '⚛️', description: 'Frontend Library' },
      { name: 'Node.js', level: 85, icon: '🟢', description: 'Backend Runtime' },
      { name: 'TensorFlow', level: 80, icon: '🧠', description: 'Machine Learning' },
      { name: 'FastAPI', level: 75, icon: '🚀', description: 'Python Web Framework' },
      { name: 'Express', level: 70, icon: '🌐', description: 'Web Server Framework' },
    ],
    tools: [
      { name: 'Git', level: 90, icon: '📝', description: 'Version Control' },
      { name: 'VS Code', level: 95, icon: '💻', description: 'Code Editor' },
      { name: 'Linux', level: 85, icon: '🐧', description: 'Operating System' },
      { name: 'Docker', level: 70, icon: '🐳', description: 'Containerization' },
      { name: 'Kali Linux', level: 80, icon: '🔒', description: 'Cybersecurity' },
    ]
  };

  const categories = [
    { key: 'languages', label: 'Languages', icon: Code, color: 'text-cyan-400' },
    { key: 'frameworks', label: 'Frameworks', icon: Wrench, color: 'text-blue-400' },
    { key: 'tools', label: 'Tools', icon: Zap, color: 'text-purple-400' }
  ];

  return (
    <section id="tech-stack" className="py-16 sm:py-20 lg:py-24 relative bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-gradient mb-4 sm:mb-6">
            Tech Stack
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8">
            Technologies and tools I use to bring ideas to life
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full"></div>
        </div>

        {/* Enhanced Category Tabs */}
        <div className="flex justify-center mb-8 sm:mb-12 lg:mb-16">
          <div className="glass-effect p-1 sm:p-2 rounded-2xl max-w-full overflow-x-auto">
            <div className="flex gap-1 sm:gap-2 min-w-max">
              {categories.map((category) => {
                const IconComponent = category.icon;
                return (
                  <button
                    key={category.key}
                    onClick={() => setActiveCategory(category.key)}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 text-sm sm:text-base ${
                      activeCategory === category.key
                        ? 'bg-gradient-to-r from-neon-cyan to-neon-blue text-slate-900 shadow-lg'
                        : `text-gray-400 hover:text-white hover:bg-white/5 ${category.color}`
                    }`}
                  >
                    <IconComponent className="h-4 w-4 sm:h-5 sm:w-5" />
                    <span className="whitespace-nowrap">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Enhanced Tech Grid */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {techStack[activeCategory as keyof typeof techStack].map((tech, index) => (
              <div
                key={tech.name}
                className="glass-effect p-6 sm:p-8 rounded-2xl hover-glow group cursor-pointer transition-all duration-300 hover:scale-105"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center justify-between mb-4 sm:mb-6">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <span className="text-2xl sm:text-3xl">{tech.icon}</span>
                    <div>
                      <h3 className="text-lg sm:text-xl font-semibold text-white group-hover:text-neon-cyan transition-colors">
                        {tech.name}
                      </h3>
                      <p className="text-xs sm:text-sm text-gray-400 mt-1">
                        {tech.description}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm sm:text-base text-neon-cyan font-bold">{tech.level}%</span>
                    <div className="flex items-center gap-1 mt-1">
                      <TrendingUp className="h-3 w-3 text-green-400" />
                      <span className="text-xs text-green-400">Expert</span>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Progress Bar */}
                <div className="w-full bg-slate-800 rounded-full h-2 sm:h-3 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-neon-cyan to-neon-blue transition-all duration-1000 ease-out rounded-full relative"
                    style={{ 
                      width: `${tech.level}%`,
                      boxShadow: '0 0 10px rgba(0, 245, 255, 0.5)'
                    }}
                  >
                    <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Floating Tech Icons */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute text-2xl sm:text-3xl lg:text-4xl opacity-20 animate-float"
              style={{
                left: `${5 + (i * 8)}%`,
                top: `${10 + (i % 4) * 25}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${6 + (i % 4)}s`
              }}
            >
              {['🚀', '⚡', '🔥', '💎', '🌟', '⚙️', '🔧', '💻', '🎯', '🔮', '✨', '🎨'][i]}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
