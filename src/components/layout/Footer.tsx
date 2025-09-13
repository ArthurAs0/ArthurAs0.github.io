import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, FileText, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="w-full bg-primary text-primary-foreground mt-auto">
      <div className="max-w-[120rem] mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary-foreground rounded-lg flex items-center justify-center">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <span className="font-heading text-xl font-bold">ResumeBuilder Pro</span>
            </Link>
            <p className="font-paragraph text-primary-foreground/80 text-sm leading-relaxed">
              Create professional resumes with our modern, intuitive platform. 
              Build, customize, and share your perfect resume in minutes.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Follow us on GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Follow us on Twitter"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="mailto:support@resumebuilder.pro" 
                className="text-primary-foreground/70 hover:text-primary-foreground transition-colors"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Product</h3>
            <nav className="space-y-2">
              <Link to="/features" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Features
              </Link>
              <Link to="/templates" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Templates
              </Link>
              <Link to="/pricing" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Pricing
              </Link>
              <Link to="/dashboard" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Dashboard
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Support</h3>
            <nav className="space-y-2">
              <a href="/help" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Help Center
              </a>
              <a href="/contact" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Contact Us
              </a>
              <a href="/privacy" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="/terms" className="block font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm">
                Terms of Service
              </a>
            </nav>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="font-heading text-lg font-semibold">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-primary-foreground/60" />
                <a 
                  href="mailto:support@resumebuilder.pro" 
                  className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  support@resumebuilder.pro
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-primary-foreground/60" />
                <a 
                  href="tel:+1-555-123-4567" 
                  className="font-paragraph text-primary-foreground/80 hover:text-primary-foreground transition-colors text-sm"
                >
                  +1 (555) 123-4567
                </a>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin className="w-4 h-4 text-primary-foreground/60 mt-1" />
                <address className="font-paragraph text-primary-foreground/80 text-sm not-italic">
                  123 Business Ave<br />
                  New York, NY 10001
                </address>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-8 pt-8 text-center">
          <p className="font-paragraph text-primary-foreground/70 text-sm">
            © {new Date().getFullYear()} ResumeBuilder Pro. All rights reserved. Built with modern web technologies for professional success.
          </p>
        </div>
      </div>
    </footer>
  );
}