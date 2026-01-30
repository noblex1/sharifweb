import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Experience from '../src/models/Experience.js';
import Certificate from '../src/models/Certificate.js';
import TechStack from '../src/models/TechStack.js';
import About from '../src/models/About.js';
import Hero from '../src/models/Hero.js';
import Contact from '../src/models/Contact.js';

dotenv.config();

const experiences = [
  {
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
    },
    order: 0,
    isPublished: true
  }
];

const certificates = [
  {
    title: "Sui Bootcamp Graduate",
    issuer: "Sui Network",
    type: "On-chain NFT Certificate",
    period: "11/2025 - 11/2025",
    description: "Completed comprehensive bootcamp covering Sui blockchain fundamentals and Move programming language",
    category: "Blockchain",
    gradient: "from-blue-500 to-cyan-500",
    order: 0,
    isPublished: true
  },
  {
    title: "Sui Fundamentals (Move & Sui Blockchain)",
    issuer: "Sui Network",
    type: "On-chain NFT Certificate",
    period: "11/2025 - 11/2025",
    description: "Mastered Move programming language and Sui blockchain architecture, smart contract development, and decentralized application building",
    category: "Blockchain",
    gradient: "from-purple-500 to-indigo-500",
    order: 1,
    isPublished: true
  },
  {
    title: "Introduction to Ethical Hacking",
    issuer: "Great Learning Academy",
    period: "06/2023 - 06/2023",
    description: "Learned fundamentals of ethical hacking, cybersecurity practices, and security assessment methodologies",
    category: "Cybersecurity",
    gradient: "from-red-500 to-pink-500",
    order: 2,
    isPublished: true
  },
  {
    title: "OBSCURA: The Future of Cybercrime",
    issuer: "Flare",
    period: "10/2025 - 10/2025",
    description: "Explored emerging cybercrime trends, security threats, and defense strategies in modern cybersecurity landscape",
    category: "Cybersecurity",
    gradient: "from-orange-500 to-red-500",
    order: 3,
    isPublished: true
  },
  {
    title: "Certificate of Participation",
    event: "Virtual Youth Summit 2025",
    issuer: "IGER Africa",
    period: "09/2025 - 09/2025",
    description: "Active participation in youth summit focused on technology, innovation, and community development",
    category: "Leadership",
    gradient: "from-green-500 to-emerald-500",
    order: 4,
    isPublished: true
  }
];

const techStack = [
  // Languages
  { name: 'TypeScript', category: 'languages' as const, level: 85, icon: '🔷', description: 'Type-Safe Development', order: 0, isPublished: true },
  { name: 'JavaScript', category: 'languages' as const, level: 90, icon: '⚡', description: 'Web Development', order: 1, isPublished: true },
  { name: 'Move', category: 'languages' as const, level: 80, icon: '⛓️', description: 'Sui Blockchain', order: 2, isPublished: true },
  // Frameworks
  { name: 'React', category: 'frameworks' as const, level: 90, icon: '⚛️', description: 'Frontend Library', order: 0, isPublished: true },
  { name: 'Next.js', category: 'frameworks' as const, level: 85, icon: '🚀', description: 'Full-Stack Framework', order: 1, isPublished: true },
  { name: 'Sui Blockchain', category: 'frameworks' as const, level: 75, icon: '🔗', description: 'Blockchain Platform', order: 2, isPublished: true },
  // Tools
  { name: 'Linux', category: 'tools' as const, level: 85, icon: '🐧', description: 'Operating System', order: 0, isPublished: true },
  { name: 'Git', category: 'tools' as const, level: 90, icon: '📝', description: 'Version Control', order: 1, isPublished: true },
  { name: 'Web3', category: 'tools' as const, level: 80, icon: '🌐', description: 'Blockchain Development', order: 2, isPublished: true },
];

const aboutData = {
  bio: "I'm a motivated Computer Science undergraduate from Kumasi, Ghana, currently pursuing my degree at the University for Development Studies. I'm a graduate of the Sui Blockchain Bootcamp with hands-on experience in software development, blockchain systems, and cybersecurity fundamentals. I specialize in designing and implementing smart contract logic using Move, building full-stack applications, and collaborating in structured development environments. I'm passionate about secure, scalable, and impactful systems, with strong interest in Web3 infrastructure, public safety technology, and open-source development. Currently seeking internship or junior software/blockchain developer roles where I can contribute to meaningful projects and continue growing in the Web3 space.",
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
  ],
  isPublished: true
};

const heroData = {
  name: "Sharif Iddrisu",
  taglines: [
    "Blockchain & Software Developer",
    "Web3 Infrastructure Builder",
    "Building Secure, Scalable Systems"
  ],
  subtitle: "Computer Science Student | Blockchain & Software Developer | Passionate About Web3 Infrastructure and Open Source Development",
  profileImage: "/assets/1.jpg",
  cvUrl: "/assets/Sharif CV.pdf",
  socialLinks: {
    github: "https://github.com/noblex1",
    linkedin: "https://www.linkedin.com/in/sharifiddrisu/",
    twitter: "https://x.com/SharifIddr31325",
    facebook: "https://facebook.com/baba.sharif.545"
  },
  isPublished: true
};

const contactData = {
  location: "Kumasi, Ashanti Region, Ghana",
  email: "sharifiddrisu156@gmail.com",
  phone: "+233 24 160 0434",
  portfolio: "https://sharifiddrisu-online.netlify.app/",
  socialLinks: {
    github: "https://github.com/noblex1",
    linkedin: "https://www.linkedin.com/in/sharifiddrisu/",
    twitter: "https://x.com/SharifIddr31325",
    facebook: "https://facebook.com/baba.sharif.545"
  },
  isPublished: true
};

async function seedAll() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB\n');

    // Clear existing data
    await Experience.deleteMany({});
    await Certificate.deleteMany({});
    await TechStack.deleteMany({});
    await About.deleteMany({});
    await Hero.deleteMany({});
    await Contact.deleteMany({});
    console.log('🗑️  Cleared existing data\n');

    // Insert Phase 1 data
    await Experience.insertMany(experiences);
    console.log(`✅ Seeded ${experiences.length} experiences`);

    await Certificate.insertMany(certificates);
    console.log(`✅ Seeded ${certificates.length} certificates`);

    await TechStack.insertMany(techStack);
    console.log(`✅ Seeded ${techStack.length} tech stack items`);

    // Insert Phase 2 data
    await About.create(aboutData);
    console.log(`✅ Seeded About section`);

    await Hero.create(heroData);
    console.log(`✅ Seeded Hero section`);

    await Contact.create(contactData);
    console.log(`✅ Seeded Contact section`);

    console.log('\n📊 Summary:');
    console.log(`   Phase 1:`);
    console.log(`     - Experiences: ${experiences.length}`);
    console.log(`     - Certificates: ${certificates.length}`);
    console.log(`     - Tech Stack: ${techStack.length}`);
    console.log(`   Phase 2:`);
    console.log(`     - About: 1`);
    console.log(`     - Hero: 1`);
    console.log(`     - Contact: 1`);
    console.log('\n🎉 All data seeded successfully!');

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

seedAll();
