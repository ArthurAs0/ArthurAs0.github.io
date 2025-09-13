import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Image } from '@/components/ui/image';
import { useMember } from '../auth/MockAuth';
import SEO from '@/components/SEO';
import { 
  FileText, 
  Download, 
  Share2, 
  Palette, 
  Zap, 
  Shield,
  CheckCircle,
  ArrowRight,
  Star,
  Users
} from 'lucide-react';

export default function HomePage() {
  const { isAuthenticated, actions } = useMember();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "ResumeBuilder Pro",
    "description": "Professional resume builder with modern templates, PDF export, and public sharing links",
    "url": "https://resumebuilder.pro",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "featureList": [
      "Professional resume templates",
      "PDF export",
      "Public resume links",
      "Real-time preview",
      "Secure data storage"
    ]
  };

  return (
    <>
      <SEO
        title="Professional Resume Builder - Create Stunning Resumes in Minutes"
        description="Build professional resumes with our intuitive platform. Choose from modern templates, customize every detail, and share your resume instantly. Start free today!"
        keywords="resume builder, professional resume, CV maker, job application, career tools, resume templates, PDF resume, online resume"
        canonicalUrl="https://resumebuilder.pro"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section - Inspired by the provided image layout */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="inline-flex items-center px-4 py-2 bg-softyellowaccent rounded-full">
              <span className="font-paragraph text-sm text-primary font-medium">
                Professional Resume Builder
              </span>
            </div>
            
            <h1 className="font-heading text-5xl lg:text-6xl font-bold text-primary leading-tight">
              Create Your Perfect Resume in Minutes
            </h1>
            
            <p className="font-paragraph text-xl text-primary/70 leading-relaxed max-w-lg">
              Build professional resumes with our intuitive platform. Choose from modern templates, 
              customize every detail, and share your resume instantly.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              {isAuthenticated ? (
                <Link to="/dashboard">
                  <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4">
                    Go to Dashboard
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
              ) : (
                <Button 
                  size="lg" 
                  onClick={actions.login}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4"
                >
                  Start Building Free
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              )}
              
              <Link to="/templates">
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4"
                >
                  View Templates
                </Button>
              </Link>
            </div>

            {/* Feature Pills */}
            <div className="flex flex-wrap gap-4 pt-4">
              <div className="flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full">
                <FileText className="w-4 h-4 text-secondary" />
                <span className="font-paragraph text-sm text-primary">Easy Builder</span>
              </div>
              <div className="flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full">
                <Download className="w-4 h-4 text-secondary" />
                <span className="font-paragraph text-sm text-primary">PDF Export</span>
              </div>
              <div className="flex items-center space-x-2 bg-secondary/10 px-4 py-2 rounded-full">
                <Share2 className="w-4 h-4 text-secondary" />
                <span className="font-paragraph text-sm text-primary">Share Links</span>
              </div>
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-gradient-to-br from-secondary/20 to-softyellowaccent/30 rounded-3xl p-8 lg:p-12">
              <Image
                src="https://static.wixstatic.com/media/d92cc9_79494b2edc0344ad9e38dbc8555b2761~mv2.png?originWidth=576&originHeight=448"
                alt="Professional woman working on modern resume builder interface, showcasing user-friendly design and professional templates"
                width={600}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <h2 className="font-heading text-4xl font-bold text-primary">
            Everything You Need to Build a Standout Resume
          </h2>
          <p className="font-paragraph text-xl text-primary/70 max-w-3xl mx-auto">
            Our comprehensive platform provides all the tools and features you need to create, 
            customize, and share professional resumes that get results.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: <FileText className="w-8 h-8" />,
              title: "Intuitive Builder",
              description: "Drag-and-drop interface makes creating your resume effortless and enjoyable."
            },
            {
              icon: <Palette className="w-8 h-8" />,
              title: "Modern Templates",
              description: "Choose from professionally designed templates that make your resume stand out."
            },
            {
              icon: <Download className="w-8 h-8" />,
              title: "PDF Export",
              description: "Download your resume as a high-quality PDF ready for any application."
            },
            {
              icon: <Share2 className="w-8 h-8" />,
              title: "Public Links",
              description: "Generate shareable links to showcase your resume online instantly."
            },
            {
              icon: <Zap className="w-8 h-8" />,
              title: "Real-time Preview",
              description: "See your changes instantly with our live preview as you build your resume."
            },
            {
              icon: <Shield className="w-8 h-8" />,
              title: "Secure & Private",
              description: "Your data is protected with enterprise-grade security and privacy controls."
            }
          ].map((feature, index) => (
            <Card key={index} className="p-8 bg-background border border-secondary/20 hover:border-secondary/40 transition-colors">
              <div className="text-secondary mb-4">{feature.icon}</div>
              <h3 className="font-heading text-xl font-semibold text-primary mb-3">
                {feature.title}
              </h3>
              <p className="font-paragraph text-primary/70 leading-relaxed">
                {feature.description}
              </p>
            </Card>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="w-full bg-secondary/5 py-20">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="font-heading text-4xl font-bold text-primary">
              Build Your Resume in 3 Simple Steps
            </h2>
            <p className="font-paragraph text-xl text-primary/70 max-w-2xl mx-auto">
              Our streamlined process gets you from blank page to professional resume in minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                step: "01",
                title: "Choose Template",
                description: "Select from our collection of modern, ATS-friendly resume templates designed by professionals."
              },
              {
                step: "02", 
                title: "Add Your Information",
                description: "Fill in your details, work experience, skills, and portfolio items with our guided builder."
              },
              {
                step: "03",
                title: "Download & Share",
                description: "Export as PDF or generate a public link to share your resume with employers instantly."
              }
            ].map((step, index) => (
              <div key={index} className="text-center space-y-6">
                <div className="w-16 h-16 bg-primary text-primary-foreground rounded-full flex items-center justify-center mx-auto">
                  <span className="font-heading text-xl font-bold">{step.step}</span>
                </div>
                <h3 className="font-heading text-2xl font-semibold text-primary">
                  {step.title}
                </h3>
                <p className="font-paragraph text-primary/70 leading-relaxed max-w-sm mx-auto">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <div className="text-center space-y-12">
          <div className="space-y-6">
            <h2 className="font-heading text-4xl font-bold text-primary">
              Trusted by Professionals Worldwide
            </h2>
            <p className="font-paragraph text-xl text-primary/70 max-w-2xl mx-auto">
              Join thousands of job seekers who have successfully landed their dream jobs using our platform.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center space-y-4">
              <div className="text-4xl font-heading font-bold text-primary">50K+</div>
              <div className="flex items-center justify-center space-x-1">
                <Users className="w-5 h-5 text-secondary" />
                <span className="font-paragraph text-primary/70">Resumes Created</span>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl font-heading font-bold text-primary">4.9</div>
              <div className="flex items-center justify-center space-x-1">
                <Star className="w-5 h-5 text-softyellowaccent fill-current" />
                <span className="font-paragraph text-primary/70">Average Rating</span>
              </div>
            </div>
            <div className="text-center space-y-4">
              <div className="text-4xl font-heading font-bold text-primary">95%</div>
              <div className="flex items-center justify-center space-x-1">
                <CheckCircle className="w-5 h-5 text-secondary" />
                <span className="font-paragraph text-primary/70">Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-20">
        <div className="max-w-[120rem] mx-auto px-6 text-center space-y-8">
          <h2 className="font-heading text-4xl font-bold text-primary-foreground">
            Ready to Build Your Perfect Resume?
          </h2>
          <p className="font-paragraph text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers with our resume builder.
          </p>
          
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          ) : (
            <Button 
              size="lg" 
              onClick={actions.login}
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4"
            >
              Start Building Now - It's Free
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          )}
        </div>
      </section>
      </div>
    </>
  );
}