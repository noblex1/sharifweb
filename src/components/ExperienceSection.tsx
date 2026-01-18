
import { Briefcase, Calendar, MapPin, Building2 } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      company: "HackerBoost Developer Hub",
      position: "Intern - Software Development Unit",
      period: "06/2025 - 08/2025",
      location: "Tamale, Ghana",
      description: "HackerBoost Developer Hub is a technology initiative established by DeFi Africa focused on training and empowering Web3 developers through structured learning and hands-on collaboration.",
      achievements: [
        "Collaborated with Web3 developers in structured development environments",
        "Contributed to software development projects",
        "Gained hands-on experience in blockchain and Web3 technologies"
      ],
      contact: {
        name: "Yakubu Abdul Karim",
        role: "CEO",
        email: "hackerboost@hackerboost.org",
        phone: "(+233) 597 244 448"
      }
    }
  ];

  return (
    <section id="experience" className="py-16 sm:py-20 lg:py-24 relative bg-slate-800/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-gradient mb-4 sm:mb-6">
            Work Experience
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8">
            Professional journey and hands-on experience in software development
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full"></div>
        </div>

        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          {experiences.map((experience, index) => (
            <div
              key={experience.id}
              className="relative glass-effect p-6 sm:p-8 lg:p-10 rounded-2xl hover-glow transition-all duration-300"
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute left-8 sm:left-10 top-24 sm:top-28 w-0.5 h-12 sm:h-16 bg-gradient-to-b from-neon-cyan to-transparent"></div>
              )}

              <div className="flex flex-col sm:flex-row gap-6 sm:gap-8">
                {/* Icon */}
                <div className="flex-shrink-0">
                  <div className="p-3 sm:p-4 glass-effect rounded-full w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center neon-glow">
                    <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-neon-cyan" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
                    <div>
                      <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                        {experience.position}
                      </h3>
                      <div className="flex items-center gap-2 mb-2">
                        <Building2 className="h-4 w-4 sm:h-5 sm:w-5 text-neon-blue" />
                        <span className="text-lg sm:text-xl text-neon-blue font-semibold">
                          {experience.company}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 text-sm sm:text-base">
                    <span className="flex items-center gap-2 text-gray-400">
                      <Calendar className="h-4 w-4 text-neon-cyan" />
                      {experience.period}
                    </span>
                    <span className="flex items-center gap-2 text-gray-400">
                      <MapPin className="h-4 w-4 text-neon-cyan" />
                      {experience.location}
                    </span>
                  </div>

                  <p className="text-gray-300 mb-6 leading-relaxed text-sm sm:text-base lg:text-lg">
                    {experience.description}
                  </p>

                  {experience.achievements && experience.achievements.length > 0 && (
                    <div className="mb-6">
                      <h4 className="text-sm sm:text-base font-semibold text-white mb-3">Key Achievements:</h4>
                      <ul className="space-y-2">
                        {experience.achievements.map((achievement, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-gray-300 text-sm sm:text-base">
                            <span className="text-neon-cyan mt-1.5">▹</span>
                            <span>{achievement}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {experience.contact && (
                    <div className="pt-4 border-t border-white/10">
                      <p className="text-xs sm:text-sm text-gray-400 mb-2">Reference Contact:</p>
                      <p className="text-sm sm:text-base text-gray-300">
                        <span className="text-neon-cyan font-medium">{experience.contact.name}</span> - {experience.contact.role}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs sm:text-sm">
                        <a href={`mailto:${experience.contact.email}`} className="text-neon-blue hover:text-cyan-400 transition-colors">
                          {experience.contact.email}
                        </a>
                        <span className="text-gray-500">|</span>
                        <a href={`tel:${experience.contact.phone.replace(/\s/g, '')}`} className="text-neon-blue hover:text-cyan-400 transition-colors">
                          {experience.contact.phone}
                        </a>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
