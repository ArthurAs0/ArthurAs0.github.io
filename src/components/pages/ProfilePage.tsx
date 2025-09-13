import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useMember } from '../auth/MockAuth';
import SEO from '@/components/SEO';
import { 
  User, 
  Mail, 
  Phone, 
  Camera, 
  Save, 
  Edit3,
  MapPin,
  Calendar,
  Shield
} from 'lucide-react';

export default function ProfilePage() {
  const { member } = useMember();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: member?.contact?.firstName || '',
    lastName: member?.contact?.lastName || '',
    nickname: member?.profile?.nickname || '',
    email: member?.loginEmail || '',
    phone: member?.contact?.phones?.[0] || '',
    title: member?.profile?.title || '',
    bio: ''
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    // In a real app, this would update the member profile
    setIsEditing(false);
  };

  const getInitials = () => {
    const firstName = member?.contact?.firstName || '';
    const lastName = member?.contact?.lastName || '';
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase() || 'U';
  };

  return (
    <>
      <SEO
        title="Profile Settings - Manage Your Account Information"
        description="Manage your profile settings, personal information, and account preferences. Update your contact details, professional title, and bio."
        keywords="profile settings, account management, personal information, user profile, contact details"
        canonicalUrl="https://resumebuilder.pro/profile"
      />
      <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="font-heading text-3xl font-bold text-primary">Profile Settings</h1>
          <p className="font-paragraph text-primary/70 mt-2">
            Manage your personal information and account preferences.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <Card className="p-6 bg-background border border-secondary/20 h-fit">
            <div className="text-center space-y-4">
              <div className="relative inline-block">
                <Avatar className="w-24 h-24 mx-auto">
                  <AvatarImage src={member?.profile?.photo?.url} alt="Profile picture" />
                  <AvatarFallback className="bg-secondary text-primary-foreground text-xl font-semibold">
                    {getInitials()}
                  </AvatarFallback>
                </Avatar>
                <Button 
                  size="sm" 
                  variant="secondary"
                  className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0"
                >
                  <Camera className="w-4 h-4" />
                </Button>
              </div>
              
              <div>
                <h2 className="font-heading text-xl font-semibold text-primary">
                  {member?.contact?.firstName} {member?.contact?.lastName}
                </h2>
                <p className="font-paragraph text-primary/70">
                  {member?.profile?.title || 'Professional'}
                </p>
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-center space-x-2 text-primary/70">
                  <Mail className="w-4 h-4" />
                  <span className="font-paragraph">{member?.loginEmail}</span>
                </div>
                
                {member?.contact?.phones?.[0] && (
                  <div className="flex items-center justify-center space-x-2 text-primary/70">
                    <Phone className="w-4 h-4" />
                    <span className="font-paragraph">{member.contact.phones[0]}</span>
                  </div>
                )}
                
                <div className="flex items-center justify-center space-x-2 text-primary/70">
                  <Calendar className="w-4 h-4" />
                  <span className="font-paragraph">
                    Joined {member?._createdDate ? new Date(member._createdDate).toLocaleDateString() : 'Recently'}
                  </span>
                </div>
              </div>

              <div className="pt-4">
                <div className="flex items-center justify-center space-x-2 text-xs">
                  <Shield className="w-4 h-4 text-secondary" />
                  <span className="font-paragraph text-primary/70">
                    Account Status: {member?.status || 'Active'}
                  </span>
                </div>
              </div>
            </div>
          </Card>

          {/* Profile Form */}
          <Card className="p-6 bg-background border border-secondary/20 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-heading text-xl font-semibold text-primary">Personal Information</h3>
              <Button
                variant={isEditing ? "default" : "outline"}
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={isEditing ? "bg-primary text-primary-foreground" : "border-primary text-primary hover:bg-primary hover:text-primary-foreground"}
              >
                {isEditing ? (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                ) : (
                  <>
                    <Edit3 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </>
                )}
              </Button>
            </div>

            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-paragraph text-primary">First Name</Label>
                  <Input
                    id="firstName"
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    disabled={!isEditing}
                    className="border-secondary/20 focus:border-primary"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-paragraph text-primary">Last Name</Label>
                  <Input
                    id="lastName"
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    disabled={!isEditing}
                    className="border-secondary/20 focus:border-primary"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nickname" className="font-paragraph text-primary">Display Name</Label>
                <Input
                  id="nickname"
                  value={formData.nickname}
                  onChange={(e) => handleInputChange('nickname', e.target.value)}
                  disabled={!isEditing}
                  className="border-secondary/20 focus:border-primary"
                  placeholder="How you'd like to be addressed"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="title" className="font-paragraph text-primary">Professional Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  disabled={!isEditing}
                  className="border-secondary/20 focus:border-primary"
                  placeholder="e.g., Software Engineer, Marketing Manager"
                />
              </div>

              {/* Contact Information */}
              <div className="border-t border-secondary/20 pt-6">
                <h4 className="font-heading text-lg font-medium text-primary mb-4">Contact Information</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="font-paragraph text-primary">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      disabled={true}
                      className="border-secondary/20 bg-secondary/5"
                    />
                    <p className="font-paragraph text-xs text-primary/70">
                      Email cannot be changed. Contact support if needed.
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="font-paragraph text-primary">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      disabled={!isEditing}
                      className="border-secondary/20 focus:border-primary"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                </div>
              </div>

              {/* Bio Section */}
              <div className="border-t border-secondary/20 pt-6">
                <h4 className="font-heading text-lg font-medium text-primary mb-4">Professional Bio</h4>
                <div className="space-y-2">
                  <Label htmlFor="bio" className="font-paragraph text-primary">About You</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    disabled={!isEditing}
                    className="border-secondary/20 focus:border-primary min-h-[120px]"
                    placeholder="Tell us about your professional background, interests, and goals..."
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Account Actions */}
        <Card className="p-6 bg-background border border-secondary/20 mt-8">
          <h3 className="font-heading text-xl font-semibold text-primary mb-4">Account Actions</h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button variant="outline" className="border-secondary text-primary hover:bg-secondary hover:text-primary-foreground">
              Download My Data
            </Button>
            <Button variant="outline" className="border-secondary text-primary hover:bg-secondary hover:text-primary-foreground">
              Privacy Settings
            </Button>
            <Button variant="outline" className="border-red-500 text-red-600 hover:bg-red-500 hover:text-white">
              Delete Account
            </Button>
          </div>
        </Card>
      </div>
      </div>
    </>
  );
}