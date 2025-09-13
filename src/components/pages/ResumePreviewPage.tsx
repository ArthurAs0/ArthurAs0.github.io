import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BaseCrudService } from '../../services/MockDataService';
import { useMember } from '../auth/MockAuth';
import { Portfolio } from '@/entities/portfolio';
import { WorkExperience } from '@/entities/workexperience';
import { Skills } from '@/entities/skills';
import SEO from '@/components/SEO';
import { 
  Download, 
  Share2, 
  Edit3, 
  Mail, 
  Phone, 
  MapPin, 
  Globe,
  Calendar,
  ExternalLink,
  User,
  Copy,
  Check
} from 'lucide-react';
import { Image } from '@/components/ui/image';

export default function ResumePreviewPage() {
  const { member } = useMember();
  const [workExperience, setWorkExperience] = useState<WorkExperience[]>([]);
  const [skills, setSkills] = useState<Skills[]>([]);
  const [portfolio, setPortfolio] = useState<Portfolio[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [shareUrl, setShareUrl] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    loadData();
    generateShareUrl();
  }, []);

  const loadData = async () => {
    try {
      const [workData, skillsData, portfolioData] = await Promise.all([
        BaseCrudService.getAll<WorkExperience>('workexperience'),
        BaseCrudService.getAll<Skills>('skills'),
        BaseCrudService.getAll<Portfolio>('portfolio')
      ]);
      
      setWorkExperience(workData.items.sort((a, b) => {
        const dateA = new Date(a.startDate || '').getTime();
        const dateB = new Date(b.startDate || '').getTime();
        return dateB - dateA; // Most recent first
      }));
      setSkills(skillsData.items);
      setPortfolio(portfolioData.items);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const generateShareUrl = () => {
    const baseUrl = window.location.origin;
    const resumeId = crypto.randomUUID();
    setShareUrl(`${baseUrl}/resume/${resumeId}`);
  };

  const copyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error('Failed to copy URL:', error);
    }
  };

  const exportToPDF = () => {
    // In a real app, this would generate and download a PDF
    window.print();
  };

  const formatDate = (date: string | Date | undefined) => {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    });
  };

  const coreSkills = skills.filter(skill => skill.isCoreSkill);
  const otherSkills = skills.filter(skill => !skill.isCoreSkill);

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
        title="Resume Preview - Review Your Professional Resume"
        description="Preview your professional resume before downloading or sharing. Review all sections including work experience, skills, and portfolio projects. Export as PDF or generate share link."
        keywords="resume preview, review resume, professional resume, PDF export, share resume, career tools"
        canonicalUrl="https://resumebuilder.pro/resume-preview"
      />
      <div className="min-h-screen bg-background">
      <div className="max-w-[120rem] mx-auto px-6 py-8">
        {/* Header Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-heading text-3xl font-bold text-primary">Resume Preview</h1>
            <p className="font-paragraph text-primary/70 mt-2">
              Review your resume before sharing or downloading.
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 mt-4 md:mt-0">
            <Button 
              variant="outline" 
              onClick={copyShareUrl}
              className="border-secondary text-primary hover:bg-secondary hover:text-primary-foreground"
            >
              {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
              {copied ? 'Copied!' : 'Copy Share Link'}
            </Button>
            <Button 
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              Edit Resume
            </Button>
            <Button 
              onClick={exportToPDF}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>

        {/* Share URL Card */}
        <Card className="p-4 bg-softyellowaccent/20 border border-softyellowaccent/40 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading text-lg font-medium text-primary">Public Resume Link</h3>
              <p className="font-paragraph text-sm text-primary/70">Share this link with employers and recruiters</p>
            </div>
            <div className="flex items-center space-x-2">
              <code className="font-paragraph text-sm bg-background px-3 py-1 rounded border text-primary/70">
                {shareUrl}
              </code>
              <Button size="sm" onClick={copyShareUrl} variant="outline">
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </Card>

        {/* Resume Preview */}
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 bg-background border border-secondary/20 shadow-lg">
            {/* Header Section */}
            <div className="text-center border-b border-secondary/20 pb-8 mb-8">
              <div className="w-32 h-32 bg-secondary/10 rounded-full mx-auto mb-6 flex items-center justify-center">
                {member?.profile?.photo?.url ? (
                  <Image src={member.profile.photo.url} alt="Professional profile photo" className="w-full h-full rounded-full object-cover" />
                ) : (
                  <User className="w-16 h-16 text-secondary" />
                )}
              </div>
              
              <h1 className="font-heading text-4xl font-bold text-primary mb-2">
                {member?.contact?.firstName} {member?.contact?.lastName}
              </h1>
              
              <p className="font-paragraph text-xl text-secondary mb-6">
                {member?.profile?.title || 'Professional'}
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 text-sm text-primary/70">
                {member?.loginEmail && (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span className="font-paragraph">{member.loginEmail}</span>
                  </div>
                )}
                
                {member?.contact?.phones?.[0] && (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span className="font-paragraph">{member.contact.phones[0]}</span>
                  </div>
                )}
                
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span className="font-paragraph">New York, NY</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Globe className="w-4 h-4" />
                  <span className="font-paragraph">portfolio.com</span>
                </div>
              </div>
            </div>

            {/* Professional Summary */}
            <div className="mb-8">
              <h2 className="font-heading text-2xl font-semibold text-primary mb-4">Professional Summary</h2>
              <p className="font-paragraph text-primary/80 leading-relaxed">
                Experienced professional with a passion for creating innovative solutions and driving results. 
                Skilled in multiple technologies and frameworks with a strong background in project management 
                and team collaboration. Committed to continuous learning and professional development.
              </p>
            </div>

            {/* Work Experience */}
            {workExperience.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-semibold text-primary mb-6">Work Experience</h2>
                <div className="space-y-6">
                  {workExperience.map((work) => (
                    <div key={work._id} className="border-l-2 border-secondary/30 pl-6">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                        <h3 className="font-heading text-xl font-medium text-primary">
                          {work.jobTitle}
                        </h3>
                        <div className="flex items-center space-x-2 text-sm text-primary/70">
                          <Calendar className="w-4 h-4" />
                          <span className="font-paragraph">
                            {formatDate(work.startDate)} - {
                              work.isCurrentJob ? 'Present' : formatDate(work.endDate)
                            }
                          </span>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-3">
                        <h4 className="font-paragraph text-lg text-secondary font-medium">
                          {work.companyName}
                        </h4>
                        {work.location && (
                          <>
                            <span className="text-primary/40">•</span>
                            <span className="font-paragraph text-primary/70">{work.location}</span>
                          </>
                        )}
                      </div>
                      
                      {work.responsibilities && (
                        <p className="font-paragraph text-primary/80 leading-relaxed">
                          {work.responsibilities}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Skills */}
            {skills.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-semibold text-primary mb-6">Skills</h2>
                
                {coreSkills.length > 0 && (
                  <div className="mb-6">
                    <h3 className="font-heading text-lg font-medium text-primary mb-3">Core Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {coreSkills.map((skill) => (
                        <Badge 
                          key={skill._id} 
                          className="bg-primary text-primary-foreground px-3 py-1"
                        >
                          {skill.skillName}
                          {skill.yearsOfExperience && (
                            <span className="ml-1 text-xs">({skill.yearsOfExperience}y)</span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
                
                {otherSkills.length > 0 && (
                  <div>
                    <h3 className="font-heading text-lg font-medium text-primary mb-3">Additional Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {otherSkills.map((skill) => (
                        <Badge 
                          key={skill._id} 
                          variant="secondary"
                          className="bg-secondary/10 text-primary border-secondary/20 px-3 py-1"
                        >
                          {skill.skillName}
                          {skill.yearsOfExperience && (
                            <span className="ml-1 text-xs">({skill.yearsOfExperience}y)</span>
                          )}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Portfolio */}
            {portfolio.length > 0 && (
              <div className="mb-8">
                <h2 className="font-heading text-2xl font-semibold text-primary mb-6">Portfolio Projects</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {portfolio.map((project) => (
                    <div key={project._id} className="border border-secondary/20 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="font-heading text-lg font-medium text-primary">
                          {project.projectName}
                        </h3>
                        {project.projectUrl && (
                          <a 
                            href={project.projectUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-secondary hover:text-primary transition-colors"
                          >
                            <ExternalLink className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                      
                      <p className="font-paragraph text-primary/80 text-sm mb-3 leading-relaxed">
                        {project.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-xs text-primary/70">
                        {project.technologiesUsed && (
                          <span className="font-paragraph">{project.technologiesUsed}</span>
                        )}
                        {project.completionDate && (
                          <span className="font-paragraph">{formatDate(project.completionDate)}</span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center space-x-4 mt-8">
          <Button 
            variant="outline"
            className="border-secondary text-primary hover:bg-secondary hover:text-primary-foreground"
          >
            <Share2 className="w-4 h-4 mr-2" />
            Share Resume
          </Button>
          <Button 
            onClick={exportToPDF}
            className="bg-primary text-primary-foreground hover:bg-primary/90"
          >
            <Download className="w-4 h-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>
      </div>
    </>
  );
}