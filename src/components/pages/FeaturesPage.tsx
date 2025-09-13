import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { Link } from 'react-router-dom';
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
  Edit3,
  Eye,
  Globe,
  Smartphone,
  Cloud,
  Users,
  BarChart3,
  Lock
} from 'lucide-react';

export default function FeaturesPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Resume Builder Features",
    "description": "Comprehensive features for building professional resumes including templates, PDF export, sharing, and more",
    "mainEntity": {
      "@type": "SoftwareApplication",
      "name": "ResumeBuilder Pro",
      "applicationCategory": "BusinessApplication",
      "featureList": [
        "Professional resume templates",
        "Real-time preview",
        "PDF export",
        "Public sharing links",
        "Secure data storage",
        "Mobile responsive design"
      ]
    }
  };

  const features = [
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Intuitive Resume Builder",
      description: "Create professional resumes with our drag-and-drop interface. No design experience required.",
      benefits: ["Step-by-step guidance", "Real-time preview", "Auto-save functionality", "Multiple sections"]
    },
    {
      icon: <Palette className="w-8 h-8" />,
      title: "Professional Templates",
      description: "Choose from a curated collection of modern, ATS-friendly resume templates.",
      benefits: ["Industry-specific designs", "Customizable colors", "Multiple layouts", "Mobile-optimized"]
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "PDF Export",
      description: "Download your resume as a high-quality PDF ready for any job application.",
      benefits: ["Print-ready format", "Consistent formatting", "Small file sizes", "Universal compatibility"]
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: "Public Resume Links",
      description: "Generate shareable links to showcase your resume online instantly.",
      benefits: ["Custom URLs", "Analytics tracking", "Easy sharing", "Always up-to-date"]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Real-time Preview",
      description: "See your changes instantly with our live preview as you build your resume.",
      benefits: ["Instant feedback", "WYSIWYG editing", "Mobile preview", "Print preview"]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Secure & Private",
      description: "Your data is protected with enterprise-grade security and privacy controls.",
      benefits: ["Data encryption", "Privacy controls", "GDPR compliant", "Secure hosting"]
    }
  ];

  const additionalFeatures = [
    {
      icon: <Edit3 className="w-6 h-6" />,
      title: "Easy Editing",
      description: "Make changes to your resume anytime with our user-friendly editor."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Preview Mode",
      description: "See exactly how your resume will look before downloading or sharing."
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Online Portfolio",
      description: "Showcase your work with integrated portfolio sections and project links."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile Responsive",
      description: "Build and edit your resume on any device with our responsive design."
    },
    {
      icon: <Cloud className="w-6 h-6" />,
      title: "Cloud Storage",
      description: "Your resume is automatically saved and synced across all your devices."
    },
    {
      icon: <BarChart3 className="w-6 h-6" />,
      title: "Analytics",
      description: "Track views and engagement on your shared resume links."
    }
  ];

  return (
    <>
      <SEO
        title="Resume Builder Features - Professional Tools for Career Success"
        description="Discover comprehensive resume building features including professional templates, PDF export, real-time preview, public sharing, and secure data storage. Build your perfect resume today!"
        keywords="resume builder features, professional templates, PDF export, resume sharing, career tools, job application tools, ATS-friendly resumes"
        canonicalUrl="https://resumebuilder.pro/features"
        structuredData={structuredData}
      />
      <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-softyellowaccent rounded-full">
            <span className="font-paragraph text-sm text-primary font-medium">
              Comprehensive Feature Set
            </span>
          </div>
          
          <h1 className="font-heading text-5xl lg:text-6xl font-bold text-primary leading-tight">
            Everything You Need to Build the Perfect Resume
          </h1>
          
          <p className="font-paragraph text-xl text-primary/70 leading-relaxed max-w-3xl mx-auto">
            Our platform provides all the tools and features you need to create, customize, 
            and share professional resumes that get results. From intuitive editing to 
            advanced sharing options, we've got you covered.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h2 className="font-heading text-3xl font-bold text-primary">
                Built for Modern Job Seekers
              </h2>
              <p className="font-paragraph text-lg text-primary/70 leading-relaxed">
                Our resume builder combines powerful features with an intuitive interface, 
                making it easy for anyone to create professional resumes that stand out 
                in today's competitive job market.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/dashboard">
                <Button className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 py-3">
                  Start Building
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/templates">
                <Button 
                  variant="outline" 
                  className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-6 py-3"
                >
                  View Templates
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-secondary/20 to-softyellowaccent/30 rounded-3xl p-8">
              <Image
                src="https://static.wixstatic.com/media/d92cc9_01cb1c92a6bc44f78fba247df216dc18~mv2.png?originWidth=576&originHeight=448"
                alt="Resume builder interface showcase featuring modern design, professional templates, and user-friendly editing tools"
                width={600}
                className="w-full h-auto rounded-2xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Main Features */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <h2 className="font-heading text-4xl font-bold text-primary">
            Core Features That Make the Difference
          </h2>
          <p className="font-paragraph text-xl text-primary/70 max-w-3xl mx-auto">
            Each feature is designed to simplify the resume building process while 
            ensuring your final resume meets professional standards.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="p-8 bg-background border border-secondary/20 hover:border-secondary/40 transition-all duration-300 hover:shadow-lg">
              <div className="text-secondary mb-6">{feature.icon}</div>
              
              <h3 className="font-heading text-xl font-semibold text-primary mb-4">
                {feature.title}
              </h3>
              
              <p className="font-paragraph text-primary/70 leading-relaxed mb-6">
                {feature.description}
              </p>
              
              <div className="space-y-2">
                {feature.benefits.map((benefit, benefitIndex) => (
                  <div key={benefitIndex} className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="font-paragraph text-sm text-primary/80">{benefit}</span>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Additional Features */}
      <section className="w-full bg-secondary/5 py-20">
        <div className="max-w-[120rem] mx-auto px-6">
          <div className="text-center space-y-6 mb-16">
            <h2 className="font-heading text-4xl font-bold text-primary">
              Additional Features & Benefits
            </h2>
            <p className="font-paragraph text-xl text-primary/70 max-w-2xl mx-auto">
              Beyond the core features, we provide additional tools and capabilities 
              to enhance your resume building experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalFeatures.map((feature, index) => (
              <div key={index} className="bg-background rounded-lg p-6 border border-secondary/20">
                <div className="flex items-start space-x-4">
                  <div className="p-2 bg-secondary/10 rounded-lg flex-shrink-0">
                    <div className="text-secondary">{feature.icon}</div>
                  </div>
                  <div>
                    <h3 className="font-heading text-lg font-medium text-primary mb-2">
                      {feature.title}
                    </h3>
                    <p className="font-paragraph text-primary/70 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Feature Comparison */}
      <section className="w-full max-w-[120rem] mx-auto px-6 py-20">
        <div className="text-center space-y-6 mb-16">
          <h2 className="font-heading text-4xl font-bold text-primary">
            Why Choose Our Resume Builder?
          </h2>
          <p className="font-paragraph text-xl text-primary/70 max-w-2xl mx-auto">
            Compare our features with traditional resume building methods and see 
            why thousands of professionals choose our platform.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Traditional Method */}
          <Card className="p-8 bg-background border border-secondary/20">
            <div className="text-center mb-6">
              <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
                Traditional Methods
              </h3>
              <p className="font-paragraph text-primary/70">
                Word processors and basic templates
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                "Limited template options",
                "Manual formatting required",
                "No real-time preview",
                "Difficult to share online",
                "Version control issues",
                "No analytics or tracking"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-red-400 rounded-full flex-shrink-0"></div>
                  <span className="font-paragraph text-primary/70">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Our Platform */}
          <Card className="p-8 bg-primary/5 border border-primary/20">
            <div className="text-center mb-6">
              <div className="inline-flex items-center px-3 py-1 bg-primary text-primary-foreground rounded-full text-sm font-medium mb-2">
                Recommended
              </div>
              <h3 className="font-heading text-2xl font-semibold text-primary mb-2">
                Our Resume Builder
              </h3>
              <p className="font-paragraph text-primary/70">
                Modern, comprehensive solution
              </p>
            </div>
            
            <div className="space-y-4">
              {[
                "Professional templates library",
                "Intuitive drag-and-drop editor",
                "Live preview and editing",
                "Instant online sharing",
                "Automatic cloud sync",
                "Detailed analytics dashboard"
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0" />
                  <span className="font-paragraph text-primary font-medium">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="w-full bg-primary py-20">
        <div className="max-w-[120rem] mx-auto px-6 text-center space-y-8">
          <h2 className="font-heading text-4xl font-bold text-primary-foreground">
            Ready to Experience These Features?
          </h2>
          <p className="font-paragraph text-xl text-primary-foreground/80 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their job search 
            with our comprehensive resume building platform.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/dashboard">
              <Button 
                size="lg" 
                variant="secondary"
                className="bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-8 py-4"
              >
                Start Building Your Resume
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link to="/templates">
              <Button 
                size="lg" 
                variant="outline"
                className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-4"
              >
                Explore Templates
              </Button>
            </Link>
          </div>
        </div>
      </section>
      </div>
    </>
  );
}