import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Mock member type
export interface Member {
  loginEmail?: string;
  contact?: {
    firstName?: string;
    lastName?: string;
    phones?: string[];
  };
  profile?: {
    nickname?: string;
    photo?: {
      url?: string;
    };
    title?: string;
  };
  _createdDate?: Date;
  status?: string;
}

// Mock authentication context
interface AuthContextType {
  member: Member | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  actions: {
    login: () => void;
    logout: () => void;
    loadCurrentMember: () => Promise<void>;
    clearMember: () => void;
  };
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useMember = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useMember must be used within a MemberProvider');
  }
  return context;
};

interface MemberProviderProps {
  children: ReactNode;
}

export const MemberProvider: React.FC<MemberProviderProps> = ({ children }) => {
  const [member, setMember] = useState<Member | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const actions = {
    login: () => {
      // Mock login - set a demo user
      const demoMember: Member = {
        loginEmail: 'demo@example.com',
        contact: {
          firstName: 'John',
          lastName: 'Doe',
          phones: ['+1 (555) 123-4567']
        },
        profile: {
          nickname: 'John Doe',
          title: 'Software Engineer',
          photo: {
            url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
          }
        },
        _createdDate: new Date(),
        status: 'APPROVED'
      };
      
      setMember(demoMember);
      setIsAuthenticated(true);
      setError(null);
    },

    logout: () => {
      setMember(null);
      setIsAuthenticated(false);
      setError(null);
    },

    loadCurrentMember: async () => {
      setIsLoading(true);
      try {
        // Check if user is already logged in (from localStorage)
        const savedMember = localStorage.getItem('demo-member');
        if (savedMember) {
          const memberData = JSON.parse(savedMember);
          setMember(memberData);
          setIsAuthenticated(true);
        }
      } catch (err) {
        setError('Failed to load member');
      } finally {
        setIsLoading(false);
      }
    },

    clearMember: () => {
      setMember(null);
      setIsAuthenticated(false);
      setError(null);
      localStorage.removeItem('demo-member');
    }
  };

  // Save member to localStorage when it changes
  useEffect(() => {
    if (member) {
      localStorage.setItem('demo-member', JSON.stringify(member));
    }
  }, [member]);

  // Load member on mount
  useEffect(() => {
    actions.loadCurrentMember();
  }, []);

  const contextValue: AuthContextType = {
    member,
    isAuthenticated,
    isLoading,
    error,
    actions
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
