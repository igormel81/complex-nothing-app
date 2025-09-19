import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { 
  User, 
  Edit, 
  Save, 
  Camera, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar,
  Shield,
  Bell,
  Globe,
  Award,
  Activity,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAppStore } from '@/store'

const Profile: React.FC = () => {
  const { t } = useTranslation()
  const { user, addNotification } = useAppStore()
  const [isEditing, setIsEditing] = useState(false)
  const [profileData, setProfileData] = useState({
    name: user?.name || 'John Doe',
    email: user?.email || 'john@example.com',
    phone: '+1 (555) 123-4567',
    location: 'New York, NY',
    bio: 'Software developer passionate about building complex applications that do absolutely nothing.',
    website: 'https://johndoe.dev',
    company: 'Nothing Corp',
    role: 'Senior Nothing Developer',
    joinDate: '2023-01-15',
    lastActive: '2 hours ago',
  })
  
  const [stats] = useState({
    projects: 42,
    contributions: 128,
    followers: 1024,
    following: 256,
  })
  
  const [achievements] = useState([
    { id: 1, title: 'First Nothing', description: 'Created your first nothing', icon: Award, earned: true },
    { id: 2, title: 'Nothing Master', description: 'Mastered the art of doing nothing', icon: Award, earned: true },
    { id: 3, title: 'Complex Nothing', description: 'Built a complex nothing app', icon: Award, earned: true },
    { id: 4, title: 'Nothing Legend', description: 'Became a legend of nothing', icon: Award, earned: false },
  ])
  
  const handleSave = () => {
    addNotification({
      type: 'success',
      title: 'Profile Updated',
      message: 'Your profile has been updated (but this app does nothing)!',
    })
    setIsEditing(false)
  }
  
  const handleCancel = () => {
    setProfileData({
      name: user?.name || 'John Doe',
      email: user?.email || 'john@example.com',
      phone: '+1 (555) 123-4567',
      location: 'New York, NY',
      bio: 'Software developer passionate about building complex applications that do absolutely nothing.',
      website: 'https://johndoe.dev',
      company: 'Nothing Corp',
      role: 'Senior Nothing Developer',
      joinDate: '2023-01-15',
      lastActive: '2 hours ago',
    })
    setIsEditing(false)
  }
  
  const handleInputChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value,
    }))
  }
  
  return (
    <div className="p-6 space-y-6">
      <Helmet>
        <title>Profile - Complex Nothing App</title>
      </Helmet>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            {t('profile')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Manage your profile information (it does nothing!)
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          {isEditing ? (
            <>
              <Button
                variant="outline"
                onClick={handleCancel}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                icon={<Save className="h-4 w-4" />}
              >
                Save Changes
              </Button>
            </>
          ) : (
            <Button
              onClick={() => setIsEditing(true)}
              icon={<Edit className="h-4 w-4" />}
            >
              Edit Profile
            </Button>
          )}
        </div>
      </motion.div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-1"
        >
          <Card>
            <CardContent className="p-6 text-center">
              <div className="relative inline-block mb-4">
                <img
                  src={user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=John'}
                  alt={profileData.name}
                  className="h-24 w-24 rounded-full mx-auto"
                />
                {isEditing && (
                  <motion.button
                    className="absolute bottom-0 right-0 bg-primary-600 text-white rounded-full p-2 hover:bg-primary-700 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => addNotification({
                      type: 'info',
                      title: 'Photo Upload',
                      message: 'Photo upload feature does nothing!',
                    })}
                  >
                    <Camera className="h-4 w-4" />
                  </motion.button>
                )}
              </div>
              
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                {profileData.name}
              </h2>
              <p className="text-slate-600 dark:text-slate-400 mb-4">
                {profileData.role}
              </p>
              
              <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <div className="flex items-center justify-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Joined {new Date(profileData.joinDate).toLocaleDateString()}
                </div>
                <div className="flex items-center justify-center gap-2">
                  <Activity className="h-4 w-4" />
                  Last active {profileData.lastActive}
                </div>
              </div>
            </CardContent>
          </Card>
          
          {/* Stats */}
          <Card className="mt-6">
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.projects}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Projects
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.contributions}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Contributions
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.followers}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Followers
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">
                    {stats.following}
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Following
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Profile Details */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="lg:col-span-2 space-y-6"
        >
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Basic Information
              </CardTitle>
              <CardDescription>
                Your personal information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Full Name"
                  value={profileData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  icon={<User className="h-4 w-4" />}
                />
                <Input
                  label="Email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  icon={<Mail className="h-4 w-4" />}
                />
                <Input
                  label="Phone"
                  value={profileData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  icon={<Phone className="h-4 w-4" />}
                />
                <Input
                  label="Location"
                  value={profileData.location}
                  onChange={(e) => handleInputChange('location', e.target.value)}
                  disabled={!isEditing}
                  icon={<MapPin className="h-4 w-4" />}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Bio
                </label>
                <textarea
                  value={profileData.bio}
                  onChange={(e) => handleInputChange('bio', e.target.value)}
                  disabled={!isEditing}
                  rows={3}
                  className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Professional Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Professional Information
              </CardTitle>
              <CardDescription>
                Your work and professional details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Company"
                  value={profileData.company}
                  onChange={(e) => handleInputChange('company', e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  label="Role"
                  value={profileData.role}
                  onChange={(e) => handleInputChange('role', e.target.value)}
                  disabled={!isEditing}
                />
                <Input
                  label="Website"
                  value={profileData.website}
                  onChange={(e) => handleInputChange('website', e.target.value)}
                  disabled={!isEditing}
                  icon={<Globe className="h-4 w-4" />}
                />
              </div>
            </CardContent>
          </Card>
          
          {/* Achievements */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="h-5 w-5" />
                Achievements
              </CardTitle>
              <CardDescription>
                Your accomplishments in the nothing app
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement, index) => (
                  <motion.div
                    key={achievement.id}
                    className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                      achievement.earned
                        ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20'
                        : 'border-slate-200 bg-slate-50 dark:border-slate-700 dark:bg-slate-800'
                    }`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${
                        achievement.earned
                          ? 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-300'
                          : 'bg-slate-100 text-slate-400 dark:bg-slate-700 dark:text-slate-500'
                      }`}>
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      <div>
                        <h4 className={`font-medium ${
                          achievement.earned
                            ? 'text-green-900 dark:text-green-100'
                            : 'text-slate-500 dark:text-slate-400'
                        }`}>
                          {achievement.title}
                        </h4>
                        <p className={`text-sm ${
                          achievement.earned
                            ? 'text-green-700 dark:text-green-300'
                            : 'text-slate-400 dark:text-slate-500'
                        }`}>
                          {achievement.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default Profile
