
import { Book, Code, ArrowRight, MapPin, Calendar } from 'lucide-react';

const AboutSection = () => {
  const achievements = [
    {
      icon: <Book className="h-6 w-6 sm:h-8 sm:w-8 text-neon-cyan" />,
      title: "University for Development Studies",
      description: "Computer Science Student",
      year: "2022 - Present",
      location: "Ghana"
    },
    {
      icon: <Code className="h-6 w-6 sm:h-8 sm:w-8 text-neon-blue" />,
      title: "HackerBoost",
      description: "Active Member & Developer",
      year: "2023 - Present",
      location: "Community"
    }
  ];

  const skills = [
    "Artificial Intelligence",
    "Cybersecurity",
    "Software Engineering",
    "Python Development",
    "JavaScript/React",
    "Machine Learning"
  ];

  return (
    <section id="about" className="py-16 sm:py-20 lg:py-24 relative bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-gradient mb-4 sm:mb-6">
            About Me
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8">
            Passionate about creating innovative solutions through technology
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-start max-w-7xl mx-auto">
          {/* Bio Content */}
          <div className="space-y-6 sm:space-y-8">
            <div className="glass-effect p-6 sm:p-8 lg:p-10 rounded-2xl hover-glow transition-all duration-300">
              <div className="flex items-center gap-3 mb-6">
                <MapPin className="h-5 w-5 text-cyan-400" />
                <span className="text-cyan-400 font-medium">Kumasi, Ghana</span>
              </div>
              
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">
                I'm a passionate Computer Science student from{' '}
                <span className="text-neon-cyan font-semibold">Kumasi, Ghana</span>, 
                currently pursuing my degree at the University for Development Studies. 
                My journey in technology is driven by an insatiable curiosity about{' '}
                <span className="text-neon-blue font-semibold">Artificial Intelligence</span> and{' '}
                <span className="text-neon-cyan font-semibold">Cybersecurity</span>.
              </p>
              
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">
                As a budding software engineer, I believe in the power of code to solve 
                real-world problems and create meaningful impact. I'm actively involved 
                with <span className="text-neon-blue font-semibold">HackerBoost</span>, 
                where I collaborate with like-minded developers to build innovative solutions.
              </p>

              <p className="text-base sm:text-lg leading-relaxed text-gray-300">
                When I'm not coding, you'll find me exploring the latest developments in 
                AI research, studying cybersecurity frameworks, or contributing to open-source 
                projects that make technology more accessible to everyone.
              </p>
            </div>

            {/* Enhanced Skills Grid */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <Code className="h-5 w-5 text-cyan-400" />
                Core Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {skills.map((skill, index) => (
                  <div 
                    key={skill}
                    className="glass-effect p-3 sm:p-4 rounded-lg text-center hover-glow cursor-pointer group transition-all duration-300"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <span className="text-sm sm:text-base font-medium text-neon-cyan group-hover:text-white transition-colors">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Enhanced Timeline */}
          <div className="space-y-6 sm:space-y-8">
            <h3 className="text-2xl sm:text-3xl font-orbitron font-bold text-center mb-8 text-gradient">
              Education & Experience
            </h3>
            
            {achievements.map((achievement, index) => (
              <div 
                key={index}
                className="relative glass-effect p-6 sm:p-8 rounded-2xl hover-glow transition-all duration-300 group"
              >
                {/* Enhanced Timeline Line */}
                {index < achievements.length - 1 && (
                  <div className="absolute left-6 sm:left-8 top-16 sm:top-20 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-neon-cyan to-transparent"></div>
                )}
                
                <div className="flex items-start space-x-4 sm:space-x-6">
                  <div className="flex-shrink-0 p-2 sm:p-3 glass-effect rounded-full group-hover:neon-glow transition-all duration-300">
                    {achievement.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-lg sm:text-xl font-semibold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                      {achievement.title}
                    </h4>
                    <p className="text-gray-400 mb-3 text-sm sm:text-base">{achievement.description}</p>
                    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 text-xs sm:text-sm">
                      <span className="text-neon-cyan font-medium flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {achievement.year}
                      </span>
                      <span className="text-gray-500 flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {achievement.location}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
