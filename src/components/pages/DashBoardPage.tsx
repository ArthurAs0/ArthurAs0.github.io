import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useMember } from '../auth/MockAuth';
import { BaseCrudService } from '../../services/MockDataService';
import { Portfolio } from '@/entities/portfolio';
import { WorkExperience } from '@/entities/workexperience';
import { Skills } from '@/entities/skills';
import SEO from '@/components/SEO';
import { 
  Plus, 
  FileText, 
  Download, 
  Share2, 
  Edit3, 
  Eye,
  Calendar,
  Briefcase,
  Award,
  User
} from 'lucide-react';

export default function DashboardPage() {
  const { member } = useMember();
  const [portfolioItems, setPortfolioItems] = useState<Portfolio[]>([]);
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [portfolioData, workData, skillsData] = await Promise.all([
        BaseCrudService.getAll<Portfolio>('portfolio'),
        BaseCrudService.getAll<WorkExperience>('workexperience'),
        BaseCrudService.getAll<Skills>('skills')
      ]);
      
      setPortfolioItems(portfolioData.items);
      setWorkExperience(workData.items);
      setSkills(skillsData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const coreSkills = skills.filter(skill => skill.isCoreSkill);
  const recentWork = workExperience.slice(0, 3);
  const recentProjects = portfolioItems.slice(0, 3);

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
        title="Resume Dashboard - Manage Your Professional Resume"
        description="Access your resume dashboard to manage work experience, skills, portfolio projects, and build professional resumes. Track your progress and export when ready."
        keywords="resume dashboard, manage resume, work experience, professional skills, portfolio management, career tools"
        canonicalUrl="https://resumebuilder.pro/dashboard"
      />
      <div className="min-h-screen bg-background">
      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div>
              <h1 className="font-heading text-3xl font-bold text-primary">
                Welcome back, {member?.profile?.nickname || member?.contact?.firstName || 'User'}!
              </h1>
              <p className="font-paragraph text-primary/70 mt-2">
                Manage your resume content and build your professional profile.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Link to="/resume-builder">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Plus className="w-4 h-4 mr-2" />
                  Build Resume
                </Button>
              </Link>
              <Link to="/resume-preview">
                <Button variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                  <Eye className="w-4 h-4 mr-2" />
                  Preview Resume
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="p-6 bg-background border border-secondary/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Briefcase className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-paragraph text-2xl font-bold text-primary">{workExperience.length}</p>
                <p className="font-paragraph text-sm text-primary/70">Work Experience</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-background border border-secondary/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <Award className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-paragraph text-2xl font-bold text-primary">{skills.length}</p>
                <p className="font-paragraph text-sm text-primary/70">Skills</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-background border border-secondary/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <FileText className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-paragraph text-2xl font-bold text-primary">{portfolioItems.length}</p>
                <p className="font-paragraph text-sm text-primary/70">Portfolio Items</p>
              </div>
            </div>
          </Card>
          
          <Card className="p-6 bg-background border border-secondary/20">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <User className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-paragraph text-2xl font-bold text-primary">{coreSkills.length}</p>
                <p className="font-paragraph text-sm text-primary/70">Core Skills</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Work Experience */}
          <Card className="p-6 bg-background border border-secondary/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-primary">Recent Work Experience</h2>
              <Link to="/work-experience">
                <Button variant="ghost" size="sm" className="text-secondary hover:text-primary">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentWork.length > 0 ? (
                recentWork.map((work) => (
                  <div key={work._id} className="border-l-2 border-secondary/20 pl-4 pb-4">
                    <h3 className="font-heading text-lg font-medium text-primary">
                      {work.jobTitle}
                    </h3>
                    <p className="font-paragraph text-primary/70">{work.companyName}</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <Calendar className="w-4 h-4 text-secondary" />
                      <span className="font-paragraph text-sm text-primary/70">
                        {work.startDate && new Date(work.startDate).getFullYear()} - {
                          work.isCurrentJob ? 'Present' : 
                          work.endDate ? new Date(work.endDate).getFullYear() : 'Present'
                        }
                      </span>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Briefcase className="w-12 h-12 text-secondary/40 mx-auto mb-4" />
                  <p className="font-paragraph text-primary/70">No work experience added yet</p>
                  <Link to="/work-experience">
                    <Button variant="ghost" size="sm" className="mt-2 text-secondary">
                      Add Work Experience
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>

          {/* Core Skills */}
          <Card className="p-6 bg-background border border-secondary/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-primary">Core Skills</h2>
              <Link to="/skills">
                <Button variant="ghost" size="sm" className="text-secondary hover:text-primary">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {coreSkills.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {coreSkills.map((skill) => (
                    <Badge 
                      key={skill._id} 
                      variant="secondary" 
                      className="bg-secondary/10 text-primary border-secondary/20"
                    >
                      {skill.skillName}
                      {skill.yearsOfExperience && (
                        <span className="ml-1 text-xs">({skill.yearsOfExperience}y)</span>
                      )}
                    </Badge>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="w-12 h-12 text-secondary/40 mx-auto mb-4" />
                  <p className="font-paragraph text-primary/70">No core skills added yet</p>
                  <Link to="/skills">
                    <Button variant="ghost" size="sm" className="mt-2 text-secondary">
                      Add Skills
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>

          {/* Recent Portfolio */}
          <Card className="p-6 bg-background border border-secondary/20 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-heading text-xl font-semibold text-primary">Recent Portfolio Projects</h2>
              <Link to="/portfolio">
                <Button variant="ghost" size="sm" className="text-secondary hover:text-primary">
                  <Edit3 className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </Link>
            </div>
            
            <div className="space-y-4">
              {recentProjects.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {recentProjects.map((project) => (
                    <div key={project._id} className="border border-secondary/20 rounded-lg p-4">
                      <h3 className="font-heading text-lg font-medium text-primary mb-2">
                        {project.projectName}
                      </h3>
                      <p className="font-paragraph text-sm text-primary/70 mb-3 line-clamp-2">
                        {project.description}
                      </p>
                      {project.technologiesUsed && (
                        <p className="font-paragraph text-xs text-secondary">
                          {project.technologiesUsed}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <FileText className="w-12 h-12 text-secondary/40 mx-auto mb-4" />
                  <p className="font-paragraph text-primary/70">No portfolio projects added yet</p>
                  <Link to="/portfolio">
                    <Button variant="ghost" size="sm" className="mt-2 text-secondary">
                      Add Portfolio Project
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="p-6 bg-secondary/5 border border-secondary/20 mt-8">
          <h2 className="font-heading text-xl font-semibold text-primary mb-6">Quick Actions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link to="/resume-builder">
              <Button variant="outline" className="w-full justify-start border-primary text-primary hover:bg-primary hover:text-primary-foreground">
                <FileText className="w-4 h-4 mr-3" />
                Build New Resume
              </Button>
            </Link>
            
            <Button variant="outline" className="w-full justify-start border-secondary text-primary hover:bg-secondary hover:text-primary-foreground">
              <Download className="w-4 h-4 mr-3" />
              Export as PDF
            </Button>
            
            <Button variant="outline" className="w-full justify-start border-secondary text-primary hover:bg-secondary hover:text-primary-foreground">
              <Share2 className="w-4 h-4 mr-3" />
              Generate Share Link
            </Button>
          </div>
        </Card>
      </div>
      </div>
    </>
  );
}