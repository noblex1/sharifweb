import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { LogOut, Plus, Edit, Trash2, Eye, EyeOff, Briefcase, Award, Code, User, Rocket, Mail } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ProjectForm from '@/components/admin/ProjectForm';
import ExperienceForm from '@/components/admin/ExperienceForm';
import CertificateForm from '@/components/admin/CertificateForm';
import TechStackForm from '@/components/admin/TechStackForm';
import AboutForm from '@/components/admin/AboutForm';
import HeroForm from '@/components/admin/HeroForm';
import ContactForm from '@/components/admin/ContactForm';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [projects, setProjects] = useState<any[]>([]);
  const [experiences, setExperiences] = useState<any[]>([]);
  const [certificates, setCertificates] = useState<any[]>([]);
  const [techStack, setTechStack] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showExperienceForm, setShowExperienceForm] = useState(false);
  const [showCertificateForm, setShowCertificateForm] = useState(false);
  const [showTechStackForm, setShowTechStackForm] = useState(false);
  const [showAboutForm, setShowAboutForm] = useState(false);
  const [showHeroForm, setShowHeroForm] = useState(false);
  const [showContactForm, setShowContactForm] = useState(false);
  
  const [editingProject, setEditingProject] = useState<any>(null);
  const [editingExperience, setEditingExperience] = useState<any>(null);
  const [editingCertificate, setEditingCertificate] = useState<any>(null);
  const [editingTechStack, setEditingTechStack] = useState<any>(null);
  
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/admin/login');
      return;
    }
    fetchAllData();
  }, [navigate]);

  const fetchAllData = async () => {
    await Promise.all([
      fetchProjects(),
      fetchExperiences(),
      fetchCertificates(),
      fetchTechStack()
    ]);
    setLoading(false);
  };

  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/projects/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setProjects(data.data);
    } catch (error) {
      console.error('Failed to fetch projects:', error);
    }
  };

  const fetchExperiences = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/experiences/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setExperiences(data.data);
    } catch (error) {
      console.error('Failed to fetch experiences:', error);
    }
  };

  const fetchCertificates = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/certificates/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setCertificates(data.data);
    } catch (error) {
      console.error('Failed to fetch certificates:', error);
    }
  };

  const fetchTechStack = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/tech-stack/all`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const data = await response.json();
      if (data.success) setTechStack(data.data);
    } catch (error) {
      console.error('Failed to fetch tech stack:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/admin/login');
  };

  const handleDelete = async (type: string, id: string) => {
    if (!confirm(`Are you sure you want to delete this ${type}?`)) return;

    try {
      const token = localStorage.getItem('token');
      const endpoints: any = {
        project: 'projects',
        experience: 'experiences',
        certificate: 'certificates',
        tech: 'tech-stack'
      };
      
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/${endpoints[type]}/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      const data = await response.json();
      if (data.success) {
        toast({
          title: 'Success',
          description: `${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`
        });
        fetchAllData();
      }
    } catch (error) {
      toast({
        title: 'Error',
        description: `Failed to delete ${type}`,
        variant: 'destructive'
      });
    }
  };

  const handleFormClose = () => {
    setShowProjectForm(false);
    setShowExperienceForm(false);
    setShowCertificateForm(false);
    setShowTechStackForm(false);
    setShowAboutForm(false);
    setShowHeroForm(false);
    setShowContactForm(false);
    setEditingProject(null);
    setEditingExperience(null);
    setEditingCertificate(null);
    setEditingTechStack(null);
    fetchAllData();
    window.location.reload();
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="text-cyan-400 text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Header */}
      <div className="glass-effect border-b border-white/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-orbitron font-bold text-gradient">
            Admin Dashboard
          </h1>
          <Button
            onClick={handleLogout}
            variant="outline"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-7 mb-8 bg-slate-800/50">
            <TabsTrigger value="projects" className="data-[state=active]:bg-cyan-500/20">
              Projects
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-cyan-500/20">
              <Briefcase className="mr-1 h-4 w-4" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="certificates" className="data-[state=active]:bg-cyan-500/20">
              <Award className="mr-1 h-4 w-4" />
              Certificates
            </TabsTrigger>
            <TabsTrigger value="techstack" className="data-[state=active]:bg-cyan-500/20">
              <Code className="mr-1 h-4 w-4" />
              Tech Stack
            </TabsTrigger>
            <TabsTrigger value="about" className="data-[state=active]:bg-cyan-500/20">
              <User className="mr-1 h-4 w-4" />
              About
            </TabsTrigger>
            <TabsTrigger value="hero" className="data-[state=active]:bg-cyan-500/20">
              <Rocket className="mr-1 h-4 w-4" />
              Hero
            </TabsTrigger>
            <TabsTrigger value="contact" className="data-[state=active]:bg-cyan-500/20">
              <Mail className="mr-1 h-4 w-4" />
              Contact
            </TabsTrigger>
          </TabsList>

          {/* Projects Tab */}
          <TabsContent value="projects">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Projects</h2>
              <Button
                onClick={() => setShowProjectForm(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-900 font-semibold"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Project
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <div key={project._id} className="glass-effect p-6 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white">{project.title}</h3>
                    {project.isPublished ? <Eye className="h-5 w-5 text-green-400" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                  </div>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-3">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="text-xs px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full border border-cyan-500/30">
                      {project.category}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${project.status === 'Completed' ? 'bg-green-500/20 text-green-400 border border-green-500/30' : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'}`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => { setEditingProject(project); setShowProjectForm(true); }} size="sm" variant="outline" className="flex-1 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete('project', project._id)} size="sm" variant="outline" className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {projects.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No projects yet. Create your first one!</p>
              </div>
            )}
          </TabsContent>

          {/* Experience Tab */}
          <TabsContent value="experience">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Work Experience</h2>
              <Button
                onClick={() => setShowExperienceForm(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-900 font-semibold"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Experience
              </Button>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {experiences.map((exp) => (
                <div key={exp._id} className="glass-effect p-6 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.position}</h3>
                      <p className="text-cyan-400">{exp.company}</p>
                    </div>
                    {exp.isPublished ? <Eye className="h-5 w-5 text-green-400" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                  </div>
                  <p className="text-gray-400 text-sm mb-2">{exp.period} • {exp.location}</p>
                  <p className="text-gray-300 text-sm mb-4 line-clamp-2">{exp.description}</p>
                  <div className="flex gap-2">
                    <Button onClick={() => { setEditingExperience(exp); setShowExperienceForm(true); }} size="sm" variant="outline" className="flex-1 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete('experience', exp._id)} size="sm" variant="outline" className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {experiences.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No experience yet. Add your first one!</p>
              </div>
            )}
          </TabsContent>

          {/* Certificates Tab */}
          <TabsContent value="certificates">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Certificates</h2>
              <Button
                onClick={() => setShowCertificateForm(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-900 font-semibold"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Certificate
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {certificates.map((cert) => (
                <div key={cert._id} className="glass-effect p-6 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-white">{cert.title}</h3>
                    {cert.isPublished ? <Eye className="h-5 w-5 text-green-400" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                  </div>
                  <p className="text-cyan-400 text-sm mb-2">{cert.issuer}</p>
                  <p className="text-gray-400 text-xs mb-3">{cert.period}</p>
                  <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full border border-blue-500/30">
                    {cert.category}
                  </span>
                  <div className="flex gap-2 mt-4">
                    <Button onClick={() => { setEditingCertificate(cert); setShowCertificateForm(true); }} size="sm" variant="outline" className="flex-1 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete('certificate', cert._id)} size="sm" variant="outline" className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {certificates.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No certificates yet. Add your first one!</p>
              </div>
            )}
          </TabsContent>

          {/* Tech Stack Tab */}
          <TabsContent value="techstack">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Tech Stack</h2>
              <Button
                onClick={() => setShowTechStackForm(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-900 font-semibold"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Tech
              </Button>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {techStack.map((tech) => (
                <div key={tech._id} className="glass-effect p-6 rounded-xl border border-white/10 hover:border-cyan-400/50 transition-all">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{tech.icon}</span>
                      <div>
                        <h3 className="text-lg font-bold text-white">{tech.name}</h3>
                        <p className="text-gray-400 text-xs">{tech.description}</p>
                      </div>
                    </div>
                    {tech.isPublished ? <Eye className="h-5 w-5 text-green-400" /> : <EyeOff className="h-5 w-5 text-gray-400" />}
                  </div>
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-400">{tech.category}</span>
                      <span className="text-cyan-400 font-bold">{tech.level}%</span>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2">
                      <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full" style={{ width: `${tech.level}%` }} />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button onClick={() => { setEditingTechStack(tech); setShowTechStackForm(true); }} size="sm" variant="outline" className="flex-1 border-cyan-400/50 text-cyan-400 hover:bg-cyan-400/10">
                      <Edit className="mr-1 h-3 w-3" />
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete('tech', tech._id)} size="sm" variant="outline" className="flex-1 border-red-500/50 text-red-400 hover:bg-red-500/10">
                      <Trash2 className="mr-1 h-3 w-3" />
                      Delete
                    </Button>
                  </div>
                </div>
              ))}
            </div>
            {techStack.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400 text-lg">No tech stack yet. Add your first one!</p>
              </div>
            )}
          </TabsContent>

          {/* About Tab */}
          <TabsContent value="about">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">About Section</h2>
              <Button
                onClick={() => setShowAboutForm(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-900 font-semibold"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit About
              </Button>
            </div>
            <div className="glass-effect p-8 rounded-xl border border-white/10">
              <p className="text-gray-300 mb-4">Manage your About section content including bio, location, skills, and achievements.</p>
              <Button onClick={() => setShowAboutForm(true)} className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30">
                Open Editor
              </Button>
            </div>
          </TabsContent>

          {/* Hero Tab */}
          <TabsContent value="hero">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Hero Section</h2>
              <Button
                onClick={() => setShowHeroForm(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-900 font-semibold"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Hero
              </Button>
            </div>
            <div className="glass-effect p-8 rounded-xl border border-white/10">
              <p className="text-gray-300 mb-4">Manage your Hero section including name, taglines, subtitle, profile image, CV, and social links.</p>
              <Button onClick={() => setShowHeroForm(true)} className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30">
                Open Editor
              </Button>
            </div>
          </TabsContent>

          {/* Contact Tab */}
          <TabsContent value="contact">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl font-bold text-white">Contact Section</h2>
              <Button
                onClick={() => setShowContactForm(true)}
                className="bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-500 hover:to-blue-600 text-slate-900 font-semibold"
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Contact
              </Button>
            </div>
            <div className="glass-effect p-8 rounded-xl border border-white/10">
              <p className="text-gray-300 mb-4">Manage your Contact section including location, email, phone, portfolio, and social links.</p>
              <Button onClick={() => setShowContactForm(true)} className="bg-cyan-500/20 text-cyan-400 hover:bg-cyan-500/30">
                Open Editor
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Forms */}
      {showProjectForm && <ProjectForm project={editingProject} onClose={handleFormClose} />}
      {showExperienceForm && <ExperienceForm experience={editingExperience} onClose={handleFormClose} />}
      {showCertificateForm && <CertificateForm certificate={editingCertificate} onClose={handleFormClose} />}
      {showTechStackForm && <TechStackForm techItem={editingTechStack} onClose={handleFormClose} />}
      {showAboutForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="glass-effect p-8 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Edit About Section</h2>
              <Button onClick={handleFormClose} variant="outline" size="sm">Close</Button>
            </div>
            <AboutForm />
          </div>
        </div>
      )}
      {showHeroForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="glass-effect p-8 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Hero Section</h2>
              <Button onClick={handleFormClose} variant="outline" size="sm">Close</Button>
            </div>
            <HeroForm />
          </div>
        </div>
      )}
      {showContactForm && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
          <div className="glass-effect p-8 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-white">Edit Contact Section</h2>
              <Button onClick={handleFormClose} variant="outline" size="sm">Close</Button>
            </div>
            <ContactForm />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
