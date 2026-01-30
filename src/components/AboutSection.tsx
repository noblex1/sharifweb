import { useState, useEffect } from 'react';
import { Book, Code, ArrowRight, MapPin, Calendar } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

const AboutSection = () => {
  const [aboutData, setAboutData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAbout();
  }, []);

  const fetchAbout = async () => {
    try {
      const response = await fetch(`${API_URL}/api/about`);
      const data = await response.json();
      if (data.success && data.data) {
        setAboutData(data.data);
      }
    } catch (error) {
      console.error('Error fetching about:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback data for development
  const fallbackData = {
    bio: "I'm a motivated Computer Science undergraduate from Kumasi, Ghana, currently pursuing my degree at the University for Development Studies. I'm a graduate of the Sui Blockchain Bootcamp with hands-on experience in software development, blockchain systems, and cybersecurity fundamentals.",
    location: "Kumasi, Ghana",
    skills: [
      "TypeScript",
      "JavaScript",
      "Move (Sui Blockchain)",
      "React / Next.js",
      "Linux",
      "Blockchain Development"
    ],
    achievements: [
      {
        icon: "Book",
        title: "University for Development Studies",
        description: "Bachelor of Science in Computer Science",
        year: "01/2023 - Present",
        location: "Tamale, Ghana"
      },
      {
        icon: "Code",
        title: "HackerBoost Developer Hub",
        description: "Intern - Software Development Unit",
        year: "06/2025 - 08/2025",
        location: "Tamale, Ghana"
      }
    ]
  };

  const data = aboutData || fallbackData;
  const iconMap: any = { Book, Code };

  if (loading) {
    return (
      <section id="about" className="py-16 sm:py-20 lg:py-24 relative bg-slate-900/50">
        <div className="container mx-auto px-4 text-center">
          <div className="text-cyan-400 text-xl">Loading...</div>
        </div>
      </section>
    );
  }

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
                <span className="text-cyan-400 font-medium">{data.location}</span>
              </div>
              
              <p className="text-base sm:text-lg leading-relaxed text-gray-300 mb-6">
                {data.bio}
              </p>
            </div>

            {/* Enhanced Skills Grid */}
            <div>
              <h3 className="text-xl sm:text-2xl font-semibold text-white mb-6 flex items-center gap-2">
                <Code className="h-5 w-5 text-cyan-400" />
                Core Skills
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {data.skills.map((skill: string, index: number) => (
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
            
            {data.achievements.map((achievement: any, index: number) => {
              const IconComponent = iconMap[achievement.icon] || Code;
              return (
                <div 
                  key={index}
                  className="relative glass-effect p-6 sm:p-8 rounded-2xl hover-glow transition-all duration-300 group"
                >
                  {/* Enhanced Timeline Line */}
                  {index < data.achievements.length - 1 && (
                    <div className="absolute left-6 sm:left-8 top-16 sm:top-20 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-neon-cyan to-transparent"></div>
                  )}
                  
                  <div className="flex items-start space-x-4 sm:space-x-6">
                    <div className="flex-shrink-0 p-2 sm:p-3 glass-effect rounded-full group-hover:neon-glow transition-all duration-300">
                      <IconComponent className="h-6 w-6 sm:h-8 sm:w-8 text-neon-cyan" />
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
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
