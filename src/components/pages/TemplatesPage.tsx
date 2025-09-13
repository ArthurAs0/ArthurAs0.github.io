import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
import SEO from '@/components/SEO';
import { 
  Eye, 
  Download, 
  Star, 
  Check,
  ArrowRight,
  Palette,
  FileText,
  Briefcase,
  Code,
  Heart,
  Users,
  Zap
} from 'lucide-react';

interface Template {
  id: string;
  name: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  features: string[];
  preview: string;
  popular?: boolean;
  new?: boolean;
  colors: string[];
}

export default function TemplatesPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Resume Templates",
    "description": "Professional resume templates for various industries and career levels",
    "mainEntity": {
      "@type": "ItemList",
      "name": "Resume Templates",
      "itemListElement": [
        {
          "@type": "CreativeWork",
          "name": "Modern Professional Template",
          "description": "Clean and modern design perfect for tech professionals"
        },
        {
          "@type": "CreativeWork", 
          "name": "Executive Template",
          "description": "Sophisticated design for senior-level positions"
        }
      ]
    }
  };

  const categories = [
    { id: 'all', name: 'All Templates', icon: <FileText className="w-4 h-4" /> },
    { id: 'modern', name: 'Modern', icon: <Zap className="w-4 h-4" /> },
    { id: 'professional', name: 'Professional', icon: <Briefcase className="w-4 h-4" /> },
    { id: 'creative', name: 'Creative', icon: <Palette className="w-4 h-4" /> },
    { id: 'tech', name: 'Tech', icon: <Code className="w-4 h-4" /> },
    { id: 'executive', name: 'Executive', icon: <Users className="w-4 h-4" /> }
  ];

  const templates: Template[] = [
    {
      id: 'modern-pro',
      name: 'Modern Professional',
      description: 'Clean and contemporary design perfect for tech professionals and startups',
      category: 'modern',
      difficulty: 'Beginner',
      features: ['ATS-Friendly', 'Single Page', 'Skills Section', 'Portfolio Links'],
      preview: 'https://static.wixstatic.com/media/d92cc9_8ba35bc6ab9c4c399c9cdd1a2a7d984a~mv2.png?originWidth=384&originHeight=512',
      popular: true,
      colors: ['#1E254E', '#A59FE6', '#FFF9B1']
    },
    {
      id: 'executive-elite',
      name: 'Executive Elite',
      description: 'Sophisticated and elegant design for senior-level positions and executives',
      category: 'executive',
      difficulty: 'Advanced',
      features: ['Two Page Layout', 'Executive Summary', 'Achievement Focus', 'Premium Design'],
      preview: 'https://static.wixstatic.com/media/d92cc9_5fdf5838f7cd47e0bbe69ff032cab592~mv2.png?originWidth=384&originHeight=512',
      colors: ['#2C3E50', '#E74C3C', '#ECF0F1']
    },
    {
      id: 'creative-spark',
      name: 'Creative Spark',
      description: 'Bold and artistic design for designers, artists, and creative professionals',
      category: 'creative',
      difficulty: 'Intermediate',
      features: ['Visual Portfolio', 'Color Accents', 'Creative Layout', 'Image Support'],
      preview: 'https://static.wixstatic.com/media/d92cc9_72d55960cb3a473280387a211a3b63bc~mv2.png?originWidth=384&originHeight=512',
      new: true,
      colors: ['#FF6B6B', '#4ECDC4', '#45B7D1']
    },
    {
      id: 'tech-innovator',
      name: 'Tech Innovator',
      description: 'Modern and technical design optimized for software engineers and developers',
      category: 'tech',
      difficulty: 'Intermediate',
      features: ['GitHub Integration', 'Project Showcase', 'Tech Stack Display', 'Code-Friendly'],
      preview: 'https://static.wixstatic.com/media/d92cc9_61e3679edaa74a61a569c2e7cd02fea0~mv2.png?originWidth=384&originHeight=512',
      popular: true,
      colors: ['#0D1117', '#58A6FF', '#F0F6FC']
    },
    {
      id: 'minimalist-pro',
      name: 'Minimalist Pro',
      description: 'Clean and simple design that focuses on content over decoration',
      category: 'professional',
      difficulty: 'Beginner',
      features: ['Ultra Clean', 'Content Focus', 'Easy Reading', 'Universal Appeal'],
      preview: 'https://static.wixstatic.com/media/d92cc9_96a917251a334a7c99da6270a995fc4e~mv2.png?originWidth=384&originHeight=512',
      colors: ['#000000', '#FFFFFF', '#F5F5F5']
    },
    {
      id: 'startup-founder',
      name: 'Startup Founder',
      description: 'Dynamic design perfect for entrepreneurs and startup professionals',
      category: 'modern',
      difficulty: 'Advanced',
      features: ['Startup Focus', 'Achievement Metrics', 'Vision Statement', 'Growth Story'],
      preview: 'https://static.wixstatic.com/media/d92cc9_133890bd6a144eb1be9980f2677eb3c6~mv2.png?originWidth=384&originHeight=512',
      new: true,
      colors: ['#6C5CE7', '#A29BFE', '#FD79A8']
    }
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(template => template.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <SEO
        title="Professional Resume Templates - Choose Your Perfect Design"
        description="Browse our collection of professional resume templates. Modern, creative, and ATS-friendly designs for every industry and career level. Start building your perfect resume today!"
        keywords="resume templates, professional resume designs, CV templates, modern resume layouts, ATS-friendly templates, career templates"
        canonicalUrl="https://resumebuilder.pro/templates"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-softyellowaccent rounded-full">
            <span className="font-paragraph text-sm text-primary font-medium">
              Professional Templates
            </span>
          </div>
          
          <h1 className="font-heading text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Choose Your Perfect Resume Template
          </h1>
          
          <p className="font-paragraph text-xl text-primary/70 leading-relaxed max-w-3xl mx-auto">
            Browse our collection of professionally designed resume templates. 
            Each template is ATS-friendly, customizable, and designed to help you stand out.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              onClick={() => setSelectedCategory(category.id)}
              className={selectedCategory === category.id 
                ? "bg-primary text-primary-foreground" 
                : "border-secondary text-primary hover:bg-secondary hover:text-primary-foreground"
              }
            >
              {category.icon}
              <span className="ml-2">{category.name}</span>
            </Button>
          ))}
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredTemplates.map((template) => (
            <Card 
              key={template.id} 
              className={`group overflow-hidden bg-background border transition-all duration-300 hover:shadow-lg ${
                selectedTemplate === template.id 
                  ? 'border-primary shadow-lg' 
                  : 'border-secondary/20 hover:border-secondary/40'
              }`}
            >
              {/* Template Preview */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <Image
                  src={template.preview}
                  alt={`${template.name} resume template preview - professional design for ${template.category} professionals`}
                  width={400}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300">
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="flex space-x-2">
                      <Button
                        size="sm"
                        variant="secondary"
                        className="bg-background/90 text-primary hover:bg-background"
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        Preview
                      </Button>
                      <Link to="/resume-builder">
                        <Button
                          size="sm"
                          className="bg-primary text-primary-foreground hover:bg-primary/90"
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Use Template
                        </Button>
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col space-y-2">
                  {template.popular && (
                    <Badge className="bg-primary text-primary-foreground">
                      <Star className="w-3 h-3 mr-1" />
                      Popular
                    </Badge>
                  )}
                  {template.new && (
                    <Badge className="bg-secondary text-primary-foreground">
                      New
                    </Badge>
                  )}
                </div>

                {/* Difficulty Badge */}
                <div className="absolute top-3 right-3">
                  <Badge className={getDifficultyColor(template.difficulty)}>
                    {template.difficulty}
                  </Badge>
                </div>
              </div>

              {/* Template Info */}
              <div className="p-6 space-y-4">
                <div>
                  <h3 className="font-heading text-xl font-semibold text-primary mb-2">
                    {template.name}
                  </h3>
                  <p className="font-paragraph text-primary/70 text-sm leading-relaxed">
                    {template.description}
                  </p>
                </div>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {template.features.map((feature, index) => (
                    <Badge 
                      key={index}
                      variant="secondary"
                      className="text-xs bg-secondary/10 text-primary border-secondary/20"
                    >
                      {feature}
                    </Badge>
                  ))}
                </div>

                {/* Color Palette */}
                <div className="flex items-center space-x-2">
                  <span className="font-paragraph text-xs text-primary/70">Colors:</span>
                  <div className="flex space-x-1">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-4 h-4 rounded-full border border-secondary/20"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 pt-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex-1 border-secondary text-primary hover:bg-secondary hover:text-primary-foreground"
                  >
                    <Eye className="w-4 h-4 mr-2" />
                    Preview
                  </Button>
                  <Link to="/resume-builder" className="flex-1">
                    <Button
                      size="sm"
                      className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Use Template
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredTemplates.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-secondary/40 mx-auto mb-4" />
            <h3 className="font-heading text-xl font-semibold text-primary mb-2">
              No templates found
            </h3>
            <p className="font-paragraph text-primary/70">
              Try selecting a different category or check back later for new templates.
            </p>
          </div>
        )}
      </section>

      {/* Features Section */}
      <section className="w-full bg-secondary/5 py-20">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="font-heading text-4xl font-bold text-primary">
              Why Choose Our Templates?
            </h2>
            <p className="font-paragraph text-xl text-primary/70 max-w-2xl mx-auto">
              Every template is carefully crafted to meet modern hiring standards 
              and help you make the best first impression.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: <Check className="w-8 h-8" />,
                title: 'ATS-Friendly',
                description: 'Optimized to pass through Applicant Tracking Systems'
              },
              {
                icon: <Palette className="w-8 h-8" />,
                title: 'Fully Customizable',
                description: 'Adjust colors, fonts, and layouts to match your style'
              },
              {
                icon: <Download className="w-8 h-8" />,
                title: 'Multiple Formats',
                description: 'Download as PDF or share with a public link'
              },
              {
                icon: <Heart className="w-8 h-8" />,
                title: 'Loved by Professionals',
                description: 'Trusted by thousands of successful job seekers'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
                  <div className="text-primary">{feature.icon}</div>
                </div>
                <h3 className="font-heading text-lg font-semibold text-primary">
                  {feature.title}
                </h3>
                <p className="font-paragraph text-primary/70 text-sm leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-20">
        <div className="max-w-[120rem] mx-auto px-6 text-center space-y-8">
          <h2 className="font-heading text-4xl font-bold text-primary-foreground">
            Ready to Build Your Resume?
          </h2>
          <p className="font-paragraph text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Choose a template and start building your professional resume in minutes. 
            No design experience required.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/resume-builder">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4"
              >
                Start Building Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/features">
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4"
              >
                View All Features
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}