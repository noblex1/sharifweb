import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Project from '../src/models/Project.js';

dotenv.config();

const projects = [
  {
    title: "SafeNet",
    description: "Blockchain-based public safety alert platform that leverages decentralized technology to provide secure, transparent, and reliable public safety notifications. Built using Sui blockchain and Move smart contracts to ensure immutability and trust in critical safety communications.",
    technologies: ["Move (Sui)", "React", "TypeScript", "Blockchain", "Sui Network"],
    category: "Blockchain & Public Safety",
    status: "In Development" as const,
    gradient: "from-blue-500 to-cyan-500",
    features: ["Smart Contracts", "Decentralized Alerts", "Blockchain Security"],
    period: "01/2026 - Present",
    githubUrl: "https://github.com/noblex1/SafeNet-V2",
    liveUrl: null,
    order: 0,
    isPublished: true
  },
  {
    title: "WalBox",
    description: "Decentralized file storage solution built on blockchain technology, enabling secure and distributed file storage with enhanced data integrity and accessibility. Utilizes smart contracts for storage management and access control.",
    technologies: ["Move (Sui)", "React/Next.js", "TypeScript", "Blockchain", "Web3"],
    category: "Decentralized Storage",
    status: "Completed" as const,
    gradient: "from-purple-500 to-indigo-500",
    features: ["Decentralized Storage", "Smart Contracts", "File Management"],
    period: "11/2025 - 12/2025",
    githubUrl: "https://github.com/Sui-North/WalBox",
    liveUrl: "https://walbox.vercel.app/",
    order: 1,
    isPublished: true
  },
  {
    title: "NetWard AI",
    description: "AI-Powered Phishing Detection & Threat Intelligence Platform. A futuristic, AI-powered web security tool that detects phishing links, spoofed websites, and unauthorized redirects in real-time. Designed with advanced threat intelligence and machine learning, NetWard AI scans every URL to protect users from hidden cyber threats.",
    technologies: ["AI/ML", "React", "TypeScript", "Threat Intelligence", "Cybersecurity"],
    category: "AI & Cybersecurity",
    status: "Completed" as const,
    gradient: "from-red-500 to-orange-500",
    features: ["Phishing Detection", "Real-time Scanning", "Threat Intelligence"],
    period: "2025",
    githubUrl: "https://github.com/noblex1/NetWard.ai",
    liveUrl: "https://net-ward-ai.vercel.app/",
    order: 2,
    isPublished: true
  }
];

async function seedProjects() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log('✅ Connected to MongoDB');

    // Clear existing projects
    await Project.deleteMany({});
    console.log('🗑️  Cleared existing projects');

    // Insert new projects
    await Project.insertMany(projects);
    console.log('✅ Seeded projects successfully');

    console.log(`\n📊 Added ${projects.length} projects:`);
    projects.forEach((p, i) => {
      console.log(`   ${i + 1}. ${p.title} (${p.status})`);
    });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding projects:', error);
    process.exit(1);
  }
}

seedProjects();
