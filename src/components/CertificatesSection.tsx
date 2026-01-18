
import { Award, Calendar, ExternalLink } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

const CertificatesSection = () => {
  const certificates = [
    {
      id: 1,
      title: "Sui Bootcamp Graduate",
      issuer: "Sui Network",
      type: "On-chain NFT Certificate",
      period: "11/2025 - 11/2025",
      description: "Completed comprehensive bootcamp covering Sui blockchain fundamentals and Move programming language",
      category: "Blockchain",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      id: 2,
      title: "Sui Fundamentals (Move & Sui Blockchain)",
      issuer: "Sui Network",
      type: "On-chain NFT Certificate",
      period: "11/2025 - 11/2025",
      description: "Mastered Move programming language and Sui blockchain architecture, smart contract development, and decentralized application building",
      category: "Blockchain",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      id: 3,
      title: "Introduction to Ethical Hacking",
      issuer: "Great Learning Academy",
      period: "06/2023 - 06/2023",
      description: "Learned fundamentals of ethical hacking, cybersecurity practices, and security assessment methodologies",
      category: "Cybersecurity",
      gradient: "from-red-500 to-pink-500"
    },
    {
      id: 4,
      title: "OBSCURA: The Future of Cybercrime",
      issuer: "Flare",
      period: "10/2025 - 10/2025",
      description: "Explored emerging cybercrime trends, security threats, and defense strategies in modern cybersecurity landscape",
      category: "Cybersecurity",
      gradient: "from-orange-500 to-red-500"
    },
    {
      id: 5,
      title: "Certificate of Participation",
      event: "Virtual Youth Summit 2025",
      issuer: "IGER Africa",
      period: "09/2025 - 09/2025",
      description: "Active participation in youth summit focused on technology, innovation, and community development",
      category: "Leadership",
      gradient: "from-green-500 to-emerald-500"
    }
  ];

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Blockchain":
        return "bg-blue-500/20 text-blue-400 border-blue-500/30";
      case "Cybersecurity":
        return "bg-red-500/20 text-red-400 border-red-500/30";
      case "Leadership":
        return "bg-green-500/20 text-green-400 border-green-500/30";
      default:
        return "bg-gray-500/20 text-gray-400 border-gray-500/30";
    }
  };

  return (
    <section id="certificates" className="py-16 sm:py-20 lg:py-24 relative bg-slate-900/50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-orbitron font-bold text-gradient mb-4 sm:mb-6">
            Certifications & Achievements
          </h2>
          <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto mb-6 sm:mb-8">
            Professional certifications and educational achievements
          </p>
          <div className="w-20 sm:w-24 h-1 bg-gradient-to-r from-neon-cyan to-neon-blue mx-auto rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {certificates.map((certificate) => (
            <div
              key={certificate.id}
              className="group glass-effect p-6 sm:p-8 rounded-2xl hover-glow transition-all duration-300 hover:scale-105 relative overflow-hidden"
            >
              {/* Background gradient on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${certificate.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300 -z-10`}></div>

              {/* Icon */}
              <div className="mb-4 flex items-center justify-between">
                <div className="p-3 glass-effect rounded-full">
                  <Award className="h-6 w-6 sm:h-8 sm:w-8 text-neon-cyan" />
                </div>
                <Badge className={`${getCategoryColor(certificate.category)} text-xs sm:text-sm font-medium`}>
                  {certificate.category}
                </Badge>
              </div>

              {/* Content */}
              <h3 className="text-lg sm:text-xl lg:text-2xl font-bold text-white mb-3 group-hover:text-neon-cyan transition-colors">
                {certificate.title}
              </h3>

              {certificate.event && (
                <p className="text-sm sm:text-base text-neon-blue mb-2 font-medium">
                  {certificate.event}
                </p>
              )}

              <p className="text-sm sm:text-base text-gray-400 mb-3">
                {certificate.issuer}
              </p>

              {certificate.type && (
                <p className="text-xs sm:text-sm text-gray-500 mb-3 italic">
                  {certificate.type}
                </p>
              )}

              <p className="text-gray-300 mb-4 leading-relaxed text-sm sm:text-base">
                {certificate.description}
              </p>

              {/* Period */}
              <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400 pt-4 border-t border-white/10">
                <Calendar className="h-3 w-3 sm:h-4 sm:w-4" />
                <span>{certificate.period}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
