import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Image } from '@/components/ui/image';
import { useMember } from '../auth/MockAuth';
import { User, LogOut, FileText, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { member, isAuthenticated, isLoading, actions } = useMember();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <header className="w-full bg-background border-b border-secondary/20 sticky top-0 z-50">
      <div className="max-w-[120rem] mx-auto px-6 py-4">
        <nav className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3">
            <Image
              src="https://static.wixstatic.com/media/d92cc9_cc2a0b21e65c4effa2b4c90f63fbae8e~mv2.png"
              alt="Resume Flow logo - professional resume builder platform"
              width={120}
              className="h-8 w-auto"
            />
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="font-paragraph text-primary hover:text-secondary transition-colors">
              Home
            </Link>
            <Link to="/features" className="font-paragraph text-primary hover:text-secondary transition-colors">
              Features
            </Link>
            <Link to="/templates" className="font-paragraph text-primary hover:text-secondary transition-colors">
              Templates
            </Link>
            <Link to="/pricing" className="font-paragraph text-primary hover:text-secondary transition-colors">
              Pricing
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {isLoading ? (
              <div className="w-8 h-8 animate-pulse bg-secondary/20 rounded-full"></div>
            ) : isAuthenticated ? (
              <>
                <Link to="/dashboard">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-secondary">
                    <FileText className="w-4 h-4 mr-2" />
                    Dashboard
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="text-primary hover:text-secondary">
                    <User className="w-4 h-4 mr-2" />
                    {member?.profile?.nickname || 'Profile'}
                  </Button>
                </Link>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={actions.logout}
                  className="text-primary hover:text-secondary"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button 
                  variant="ghost" 
                  onClick={actions.login}
                  className="text-primary hover:text-secondary"
                >
                  Sign In
                </Button>
                <Button 
                  onClick={actions.login}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </nav>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-secondary/20 pt-4">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="font-paragraph text-primary hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/features" 
                className="font-paragraph text-primary hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="/templates" 
                className="font-paragraph text-primary hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Templates
              </Link>
              <Link 
                to="/pricing" 
                className="font-paragraph text-primary hover:text-secondary transition-colors"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Pricing
              </Link>
              
              {isAuthenticated ? (
                <div className="flex flex-col space-y-3 pt-4 border-t border-secondary/20">
                  <Link to="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-primary hover:text-secondary">
                      <FileText className="w-4 h-4 mr-2" />
                      Dashboard
                    </Button>
                  </Link>
                  <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                    <Button variant="ghost" className="w-full justify-start text-primary hover:text-secondary">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      actions.logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-primary hover:text-secondary"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-3 pt-4 border-t border-secondary/20">
                  <Button
                    variant="ghost"
                    onClick={() => {
                      actions.login();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full justify-start text-primary hover:text-secondary"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      actions.login();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                  >
                    Get Started
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}