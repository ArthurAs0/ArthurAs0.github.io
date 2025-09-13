import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { BaseCrudService } from '../services/MockDataService';
import { Portfolio } from '@/entities/portfolio';
import { 
  Github, 
  Download, 
  Star, 
  GitFork, 
  Calendar,
  ExternalLink,
  Check,
  AlertCircle,
  Loader2
} from 'lucide-react';

interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  created_at: string;
  updated_at: string;
  topics: string[];
  private: boolean;
}

interface GitHubImportProps {
  onImportComplete?: () => void;
}

export default function GitHubImport({ onImportComplete }: GitHubImportProps) {
  const [username, setUsername] = useState('');
  const [repositories, setRepositories] = useState<GitHubRepo[]>([]);
  const [selectedRepos, setSelectedRepos] = useState<Set<number>>(new Set());
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [error, setError] = useState('');
  const [importSuccess, setImportSuccess] = useState(false);

  const fetchRepositories = async () => {
    if (!username.trim()) {
      setError('Please enter a GitHub username');
      return;
    }

    setIsLoading(true);
    setError('');
    setRepositories([]);
    setSelectedRepos(new Set());

    try {
      const response = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=50`);
      
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('GitHub user not found');
        } else if (response.status === 403) {
          throw new Error('GitHub API rate limit exceeded. Please try again later.');
        } else {
          throw new Error('Failed to fetch repositories');
        }
      }

      const repos: GitHubRepo[] = await response.json();
      
      // Filter out forks by default and sort by stars/recent activity
      const filteredRepos = repos
        .filter(repo => !repo.private)
        .sort((a, b) => {
          // Sort by stars first, then by update date
          if (a.stargazers_count !== b.stargazers_count) {
            return b.stargazers_count - a.stargazers_count;
          }
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
        });

      setRepositories(filteredRepos);
      
      if (filteredRepos.length === 0) {
        setError('No public repositories found for this user');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
    } finally {
      setIsLoading(false);
    }
  };

  const toggleRepoSelection = (repoId: number) => {
    const newSelected = new Set(selectedRepos);
    if (newSelected.has(repoId)) {
      newSelected.delete(repoId);
    } else {
      newSelected.add(repoId);
    }
    setSelectedRepos(newSelected);
  };

  const selectAllRepos = () => {
    if (selectedRepos.size === repositories.length) {
      setSelectedRepos(new Set());
    } else {
      setSelectedRepos(new Set(repositories.map(repo => repo.id)));
    }
  };

  const importSelectedRepos = async () => {
    if (selectedRepos.size === 0) {
      setError('Please select at least one repository to import');
      return;
    }

    setIsImporting(true);
    setError('');

    try {
      const reposToImport = repositories.filter(repo => selectedRepos.has(repo.id));
      
      for (const repo of reposToImport) {
        const portfolioItem: Portfolio = {
          _id: crypto.randomUUID(),
          projectName: repo.name,
          description: repo.description || `GitHub repository: ${repo.name}`,
          projectUrl: repo.html_url,
          projectImage: '', // Could be enhanced to fetch repository social preview
          completionDate: repo.updated_at,
          technologiesUsed: [
            repo.language,
            ...repo.topics.slice(0, 4) // Limit to avoid too many tags
          ].filter(Boolean).join(', ')
        };

        await BaseCrudService.create('portfolio', portfolioItem);
      }

      setImportSuccess(true);
      setSelectedRepos(new Set());
      
      // Call the callback to refresh parent component
      if (onImportComplete) {
        onImportComplete();
      }

      // Reset success message after 3 seconds
      setTimeout(() => setImportSuccess(false), 3000);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to import repositories');
    } finally {
      setIsImporting(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short'
    });
  };

  return (
    <Card className="p-6 bg-background border border-secondary/20">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-3">
          <Github className="w-6 h-6 text-primary" />
          <div>
            <h3 className="font-heading text-lg font-semibold text-primary">
              Import from GitHub
            </h3>
            <p className="font-paragraph text-sm text-primary/70">
              Automatically import your GitHub repositories as portfolio projects
            </p>
          </div>
        </div>

        {/* Username Input */}
        <div className="space-y-2">
          <Label htmlFor="github-username" className="font-paragraph text-primary">
            GitHub Username
          </Label>
          <div className="flex space-x-2">
            <Input
              id="github-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter GitHub username"
              className="border-secondary/20 focus:border-primary"
              onKeyPress={(e) => e.key === 'Enter' && fetchRepositories()}
            />
            <Button 
              onClick={fetchRepositories}
              disabled={isLoading || !username.trim()}
              className="bg-primary text-primary-foreground hover:bg-primary/90"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Download className="w-4 h-4" />
              )}
            </Button>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-center space-x-2 p-3 bg-red-50 border border-red-200 rounded-lg">
            <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />
            <p className="font-paragraph text-sm text-red-700">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {importSuccess && (
          <div className="flex items-center space-x-2 p-3 bg-green-50 border border-green-200 rounded-lg">
            <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
            <p className="font-paragraph text-sm text-green-700">
              Successfully imported {selectedRepos.size} repositories to your portfolio!
            </p>
          </div>
        )}

        {/* Repository List */}
        {repositories.length > 0 && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-heading text-md font-medium text-primary">
                Found {repositories.length} repositories
              </h4>
              <div className="flex items-center space-x-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={selectAllRepos}
                  className="border-secondary text-primary hover:bg-secondary hover:text-primary-foreground"
                >
                  {selectedRepos.size === repositories.length ? 'Deselect All' : 'Select All'}
                </Button>
                <Button
                  onClick={importSelectedRepos}
                  disabled={selectedRepos.size === 0 || isImporting}
                  className="bg-primary text-primary-foreground hover:bg-primary/90"
                >
                  {isImporting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Importing...
                    </>
                  ) : (
                    <>
                      Import Selected ({selectedRepos.size})
                    </>
                  )}
                </Button>
              </div>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-3">
              {repositories.map((repo) => (
                <div
                  key={repo.id}
                  className={`p-4 border rounded-lg transition-colors ${
                    selectedRepos.has(repo.id)
                      ? 'border-primary bg-primary/5'
                      : 'border-secondary/20 hover:border-secondary/40'
                  }`}
                >
                  <div className="flex items-start space-x-3">
                    <Checkbox
                      checked={selectedRepos.has(repo.id)}
                      onCheckedChange={() => toggleRepoSelection(repo.id)}
                      className="mt-1"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 mb-2">
                        <h5 className="font-heading text-md font-medium text-primary truncate">
                          {repo.name}
                        </h5>
                        <a
                          href={repo.html_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-secondary hover:text-primary transition-colors"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                      
                      {repo.description && (
                        <p className="font-paragraph text-sm text-primary/70 mb-3 line-clamp-2">
                          {repo.description}
                        </p>
                      )}
                      
                      <div className="flex items-center space-x-4 text-xs text-primary/60">
                        {repo.language && (
                          <span className="font-paragraph">{repo.language}</span>
                        )}
                        
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3" />
                          <span className="font-paragraph">{repo.stargazers_count}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <GitFork className="w-3 h-3" />
                          <span className="font-paragraph">{repo.forks_count}</span>
                        </div>
                        
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3" />
                          <span className="font-paragraph">Updated {formatDate(repo.updated_at)}</span>
                        </div>
                      </div>
                      
                      {repo.topics.length > 0 && (
                        <div className="flex flex-wrap gap-1 mt-2">
                          {repo.topics.slice(0, 5).map((topic) => (
                            <Badge
                              key={topic}
                              variant="secondary"
                              className="text-xs bg-secondary/10 text-primary border-secondary/20"
                            >
                              {topic}
                            </Badge>
                          ))}
                          {repo.topics.length > 5 && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-secondary/10 text-primary border-secondary/20"
                            >
                              +{repo.topics.length - 5} more
                            </Badge>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Help Text */}
        <div className="text-xs text-primary/60 space-y-1">
          <p className="font-paragraph">
            • Only public repositories will be imported
          </p>
          <p className="font-paragraph">
            • Repository information will be used to create portfolio projects
          </p>
          <p className="font-paragraph">
            • You can edit imported projects later in the Resume Builder
          </p>
        </div>
      </div>
    </Card>
  );
}