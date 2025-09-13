import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '../../services/MockDataService';
import { Portfolio } from '@/entities/portfolio';
import { WorkExperience } from '@/entities/workexperience';
import { Skills } from '@/entities/skills';
import SEO from '@/components/SEO';
import { 
  Plus, 
  Trash2, 
  Save, 
  Eye, 
  Download,
  User,
  Briefcase,
  Award,
  FileText,
  Camera,
  Calendar,
  MapPin,
  Globe,
  Phone,
  Mail
} from 'lucide-react';
import { Image } from '@/components/ui/image';
import GitHubImport from '@/components/GitHubImport';

interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  website: string;
  summary: string;
  photo?: string;
}

export default function ResumeBuilderPage() {
  const [activeTab, setActiveTab] = useState('personal');
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    website: '',
    summary: ''
  });
  
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [workData, skillsData, portfolioData] = await Promise.all([
        BaseCrudService.getAll<WorkExperience>('workexperience'),
        BaseCrudService.getAll<Skills>('skills'),
        BaseCrudService.getAll<Portfolio>('portfolio')
      ]);
      
      setWorkExperience(workData.items);
      setSkills(skillsData.items);
      setPortfolio(portfolioData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const addWorkExperience = async () => {
    const newWork: WorkExperience = {
      _id: crypto.randomUUID(),
      jobTitle: '',
      companyName: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false,
      responsibilities: '',
      companyWebsite: ''
    };
    
    try {
      await BaseCrudService.create('workexperience', newWork);
      setWorkExperience([...workExperience, newWork]);
    } catch (error) {
      console.error('Error adding work experience:', error);
    }
  };

  const updateWorkExperience = async (id: string, updates: Partial<WorkExperience>) => {
    try {
      const updatedWork = { ...workExperience.find(w => w._id === id), ...updates };
      await BaseCrudService.update('workexperience', updatedWork);
      setWorkExperience(workExperience.map(w => w._id === id ? updatedWork : w));
    } catch (error) {
      console.error('Error updating work experience:', error);
    }
  };

  const deleteWorkExperience = async (id: string) => {
    try {
      await BaseCrudService.delete('workexperience', id);
      setWorkExperience(workExperience.filter(w => w._id !== id));
    } catch (error) {
      console.error('Error deleting work experience:', error);
    }
  };

  const addSkill = async () => {
    const newSkill: Skills = {
      _id: crypto.randomUUID(),
      skillName: '',
      category: '',
      proficiencyLevel: 'Intermediate',
      isCoreSkill: false,
      yearsOfExperience: 1
    };
    
    try {
      await BaseCrudService.create('skills', newSkill);
      setSkills([...skills, newSkill]);
    } catch (error) {
      console.error('Error adding skill:', error);
    }
  };

  const updateSkill = async (id: string, updates: Partial<Skills>) => {
    try {
      const updatedSkill = { ...skills.find(s => s._id === id), ...updates };
      await BaseCrudService.update('skills', updatedSkill);
      setSkills(skills.map(s => s._id === id ? updatedSkill : s));
    } catch (error) {
      console.error('Error updating skill:', error);
    }
  };

  const deleteSkill = async (id: string) => {
    try {
      await BaseCrudService.delete('skills', id);
      setSkills(skills.filter(s => s._id !== id));
    } catch (error) {
      console.error('Error deleting skill:', error);
    }
  };

  const addPortfolioItem = async () => {
    const newProject: Portfolio = {
      _id: crypto.randomUUID(),
      projectName: '',
      description: '',
      projectUrl: '',
      projectImage: '',
      completionDate: '',
      technologiesUsed: ''
    };
    
    try {
      await BaseCrudService.create('portfolio', newProject);
      setPortfolio([...portfolio, newProject]);
    } catch (error) {
      console.error('Error adding portfolio item:', error);
    }
  };

  const updatePortfolioItem = async (id: string, updates: Partial<Portfolio>) => {
    try {
      const updatedProject = { ...portfolio.find(p => p._id === id), ...updates };
      await BaseCrudService.update('portfolio', updatedProject);
      setPortfolio(portfolio.map(p => p._id === id ? updatedProject : p));
    } catch (error) {
      console.error('Error updating portfolio item:', error);
    }
  };

  const deletePortfolioItem = async (id: string) => {
    try {
      await BaseCrudService.delete('portfolio', id);
      setPortfolio(portfolio.filter(p => p._id !== id));
    } catch (error) {
      console.error('Error deleting portfolio item:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse space-y-4">
          <div className="w-12 h-12 bg-secondary/20 rounded-full mx-auto"></div>
          <div className="w-32 h-4 bg-secondary/20 rounded mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title="Resume Builder - Create Your Professional Resume Step by Step"
        description="Build your professional resume with our intuitive step-by-step builder. Add personal information, work experience, skills, and portfolio projects. Real-time preview included."
        keywords="resume builder, create resume, professional resume maker, CV builder, job application tools, career builder"
        canonicalUrl="https://resumebuilder.pro/resume-builder"
      />
      <div className="min-h-screen bg-background">
      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-primary">Resume Builder</h1>
            <p className="font-paragraph text-primary/70 mt-2">
              Build your professional resume step by step.
            </p>
          </div>
          
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" className="border-secondary text-primary hover:bg-secondary hover:text-primary-foreground">
              <Eye className="w-4 h-4 mr-2" />
              Preview
            </Button>
            <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Download className="w-4 h-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Builder Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-secondary/10">
            <TabsTrigger value="personal" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <User className="w-4 h-4 mr-2" />
              Personal
            </TabsTrigger>
            <TabsTrigger value="experience" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Briefcase className="w-4 h-4 mr-2" />
              Experience
            </TabsTrigger>
            <TabsTrigger value="skills" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <Award className="w-4 h-4 mr-2" />
              Skills
            </TabsTrigger>
            <TabsTrigger value="portfolio" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              <FileText className="w-4 h-4 mr-2" />
              Portfolio
            </TabsTrigger>
          </TabsList>

          {/* Personal Information Tab */}
          <TabsContent value="personal" className="space-y-6">
            <Card className="p-6 bg-background border border-secondary/20">
              <h2 className="font-heading text-xl font-semibold text-primary mb-6">Personal Information</h2>
              
              <div className="space-y-6">
                {/* Photo Upload */}
                <div className="flex items-center space-x-6">
                  <div className="w-24 h-24 bg-secondary/10 rounded-full flex items-center justify-center">
                    {personalInfo.photo ? (
                      <Image src={personalInfo.photo} alt="Professional profile photo for resume" className="w-full h-full rounded-full object-cover" />
                    ) : (
                      <Camera className="w-8 h-8 text-secondary" />
                    )}
                  </div>
                  <div>
                    <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Photo
                    </Button>
                    <p className="font-paragraph text-sm text-primary/70 mt-2">
                      Recommended: 400x400px, JPG or PNG
                    </p>
                  </div>
                </div>

                {/* Basic Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="font-paragraph text-primary">Full Name</Label>
                    <Input
                      id="fullName"
                      value={personalInfo.fullName}
                      onChange={(e) => setPersonalInfo({...personalInfo, fullName: e.target.value})}
                      className="border-secondary/20 focus:border-primary"
                      placeholder="John Doe"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-paragraph text-primary">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={personalInfo.email}
                      onChange={(e) => setPersonalInfo({...personalInfo, email: e.target.value})}
                      className="border-secondary/20 focus:border-primary"
                      placeholder="john@example.com"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-paragraph text-primary">Phone</Label>
                    <Input
                      id="phone"
                      value={personalInfo.phone}
                      onChange={(e) => setPersonalInfo({...personalInfo, phone: e.target.value})}
                      className="border-secondary/20 focus:border-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="location" className="font-paragraph text-primary">Location</Label>
                    <Input
                      id="location"
                      value={personalInfo.location}
                      onChange={(e) => setPersonalInfo({...personalInfo, location: e.target.value})}
                      className="border-secondary/20 focus:border-primary"
                      placeholder="New York, NY"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website" className="font-paragraph text-primary">Website/Portfolio</Label>
                  <Input
                    id="website"
                    value={personalInfo.website}
                    onChange={(e) => setPersonalInfo({...personalInfo, website: e.target.value})}
                    className="border-secondary/20 focus:border-primary"
                    placeholder="https://johndoe.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="summary" className="font-paragraph text-primary">Professional Summary</Label>
                  <Textarea
                    id="summary"
                    value={personalInfo.summary}
                    onChange={(e) => setPersonalInfo({...personalInfo, summary: e.target.value})}
                    className="border-secondary/20 focus:border-primary min-h-[120px]"
                    placeholder="Write a brief summary of your professional background and career objectives..."
                  />
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Work Experience Tab */}
          <TabsContent value="experience" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-primary">Work Experience</h2>
              <Button onClick={addWorkExperience} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Experience
              </Button>
            </div>

            <div className="space-y-4">
              {workExperience.map((work) => (
                <Card key={work._id} className="p-6 bg-background border border-secondary/20">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-heading text-lg font-medium text-primary">Work Experience</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteWorkExperience(work._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Job Title</Label>
                      <Input
                        value={work.jobTitle || ''}
                        onChange={(e) => updateWorkExperience(work._id, { jobTitle: e.target.value })}
                        className="border-secondary/20 focus:border-primary"
                        placeholder="Software Engineer"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Company</Label>
                      <Input
                        value={work.companyName || ''}
                        onChange={(e) => updateWorkExperience(work._id, { companyName: e.target.value })}
                        className="border-secondary/20 focus:border-primary"
                        placeholder="Tech Company Inc."
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Location</Label>
                      <Input
                        value={work.location || ''}
                        onChange={(e) => updateWorkExperience(work._id, { location: e.target.value })}
                        className="border-secondary/20 focus:border-primary"
                        placeholder="San Francisco, CA"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Start Date</Label>
                      <Input
                        type="date"
                        value={work.startDate ? new Date(work.startDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => updateWorkExperience(work._id, { startDate: e.target.value })}
                        className="border-secondary/20 focus:border-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={work.isCurrentJob || false}
                        onChange={(e) => updateWorkExperience(work._id, { isCurrentJob: e.target.checked })}
                        className="rounded border-secondary/20"
                      />
                      <Label className="font-paragraph text-primary">I currently work here</Label>
                    </div>

                    {!work.isCurrentJob && (
                      <div className="space-y-2">
                        <Label className="font-paragraph text-primary">End Date</Label>
                        <Input
                          type="date"
                          value={work.endDate ? new Date(work.endDate).toISOString().split('T')[0] : ''}
                          onChange={(e) => updateWorkExperience(work._id, { endDate: e.target.value })}
                          className="border-secondary/20 focus:border-primary"
                        />
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Responsibilities</Label>
                      <Textarea
                        value={work.responsibilities || ''}
                        onChange={(e) => updateWorkExperience(work._id, { responsibilities: e.target.value })}
                        className="border-secondary/20 focus:border-primary min-h-[100px]"
                        placeholder="Describe your key responsibilities and achievements..."
                      />
                    </div>
                  </div>
                </Card>
              ))}

              {workExperience.length === 0 && (
                <Card className="p-12 bg-background border border-secondary/20 text-center">
                  <Briefcase className="w-12 h-12 text-secondary/40 mx-auto mb-4" />
                  <p className="font-paragraph text-primary/70 mb-4">No work experience added yet</p>
                  <Button onClick={addWorkExperience} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Experience
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Skills Tab */}
          <TabsContent value="skills" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-primary">Skills</h2>
              <Button onClick={addSkill} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Skill
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {skills.map((skill) => (
                <Card key={skill._id} className="p-4 bg-background border border-secondary/20">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={skill.isCoreSkill || false}
                        onChange={(e) => updateSkill(skill._id, { isCoreSkill: e.target.checked })}
                        className="rounded border-secondary/20"
                      />
                      <Label className="font-paragraph text-sm text-primary">Core Skill</Label>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deleteSkill(skill._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Skill Name</Label>
                      <Input
                        value={skill.skillName || ''}
                        onChange={(e) => updateSkill(skill._id, { skillName: e.target.value })}
                        className="border-secondary/20 focus:border-primary"
                        placeholder="JavaScript"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Category</Label>
                      <Input
                        value={skill.category || ''}
                        onChange={(e) => updateSkill(skill._id, { category: e.target.value })}
                        className="border-secondary/20 focus:border-primary"
                        placeholder="Programming Languages"
                      />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label className="font-paragraph text-primary">Proficiency</Label>
                        <select
                          value={skill.proficiencyLevel || 'Intermediate'}
                          onChange={(e) => updateSkill(skill._id, { proficiencyLevel: e.target.value })}
                          className="w-full px-3 py-2 border border-secondary/20 rounded-md focus:border-primary"
                        >
                          <option value="Beginner">Beginner</option>
                          <option value="Intermediate">Intermediate</option>
                          <option value="Advanced">Advanced</option>
                          <option value="Expert">Expert</option>
                        </select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="font-paragraph text-primary">Years</Label>
                        <Input
                          type="number"
                          value={skill.yearsOfExperience || 1}
                          onChange={(e) => updateSkill(skill._id, { yearsOfExperience: parseInt(e.target.value) })}
                          className="border-secondary/20 focus:border-primary"
                          min="0"
                          max="50"
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              ))}

              {skills.length === 0 && (
                <Card className="p-12 bg-background border border-secondary/20 text-center md:col-span-2">
                  <Award className="w-12 h-12 text-secondary/40 mx-auto mb-4" />
                  <p className="font-paragraph text-primary/70 mb-4">No skills added yet</p>
                  <Button onClick={addSkill} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Skill
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>

          {/* Portfolio Tab */}
          <TabsContent value="portfolio" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-heading text-xl font-semibold text-primary">Portfolio Projects</h2>
              <Button onClick={addPortfolioItem} className="bg-primary text-primary-foreground hover:bg-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Add Project
              </Button>
            </div>

            {/* GitHub Import Section */}
            <GitHubImport onImportComplete={loadData} />

            <div className="space-y-4">
              {portfolio.map((project) => (
                <Card key={project._id} className="p-6 bg-background border border-secondary/20">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="font-heading text-lg font-medium text-primary">Portfolio Project</h3>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => deletePortfolioItem(project._id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Project Name</Label>
                      <Input
                        value={project.projectName || ''}
                        onChange={(e) => updatePortfolioItem(project._id, { projectName: e.target.value })}
                        className="border-secondary/20 focus:border-primary"
                        placeholder="E-commerce Website"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Project URL</Label>
                      <Input
                        value={project.projectUrl || ''}
                        onChange={(e) => updatePortfolioItem(project._id, { projectUrl: e.target.value })}
                        className="border-secondary/20 focus:border-primary"
                        placeholder="https://myproject.com"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Completion Date</Label>
                      <Input
                        type="date"
                        value={project.completionDate ? new Date(project.completionDate).toISOString().split('T')[0] : ''}
                        onChange={(e) => updatePortfolioItem(project._id, { completionDate: e.target.value })}
                        className="border-secondary/20 focus:border-primary"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label className="font-paragraph text-primary">Technologies Used</Label>
                      <Input
                        value={project.technologiesUsed || ''}
                        onChange={(e) => updatePortfolioItem(project._id, { technologiesUsed: e.target.value })}
                        className="border-secondary/20 focus:border-primary"
                        placeholder="React, Node.js, MongoDB"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label className="font-paragraph text-primary">Description</Label>
                    <Textarea
                      value={project.description || ''}
                      onChange={(e) => updatePortfolioItem(project._id, { description: e.target.value })}
                      className="border-secondary/20 focus:border-primary min-h-[100px]"
                      placeholder="Describe your project, its goals, and your role in it..."
                    />
                  </div>
                </Card>
              ))}

              {portfolio.length === 0 && (
                <Card className="p-12 bg-background border border-secondary/20 text-center">
                  <FileText className="w-12 h-12 text-secondary/40 mx-auto mb-4" />
                  <p className="font-paragraph text-primary/70 mb-4">No portfolio projects added yet</p>
                  <Button onClick={addPortfolioItem} className="bg-primary text-primary-foreground hover:bg-primary/90">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Your First Project
                  </Button>
                </Card>
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
      </div>
    </>
  );
}