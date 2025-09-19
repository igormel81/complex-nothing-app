import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { 
  Settings as SettingsIcon, 
  Save, 
  RotateCcw,
  Bell,
  Shield,
  Palette,
  Globe,
  Database,
  Key,
  Smartphone,
  Monitor,
  Moon,
  Sun,
  Check
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAppStore } from '@/store'

const Settings: React.FC = () => {
  const { t } = useTranslation()
  const { theme, setTheme, addNotification } = useAppStore()
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
    },
    privacy: {
      profileVisibility: 'public',
      dataSharing: false,
      analytics: true,
    },
    appearance: {
      theme: theme,
      language: 'en',
      fontSize: 'medium',
    },
    security: {
      twoFactor: false,
      sessionTimeout: 30,
      passwordExpiry: 90,
    },
    integrations: {
      google: false,
      github: true,
      slack: false,
    },
  })
  
  const [hasChanges, setHasChanges] = useState(false)
  
  const handleSettingChange = (category: string, key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [category]: {
        ...prev[category as keyof typeof prev],
        [key]: value,
      }
    }))
    setHasChanges(true)
  }
  
  const handleSave = () => {
    addNotification({
      type: 'success',
      title: 'Settings Saved',
      message: 'Your settings have been saved (but this app does nothing)!',
    })
    setHasChanges(false)
  }
  
  const handleReset = () => {
    addNotification({
      type: 'info',
      title: 'Settings Reset',
      message: 'Settings have been reset to defaults (still does nothing)!',
    })
    setHasChanges(false)
  }
  
  const settingSections = [
    {
      title: 'Notifications',
      description: 'Configure how you receive notifications',
      icon: Bell,
      settings: [
        {
          key: 'email',
          label: 'Email Notifications',
          type: 'toggle',
          description: 'Receive notifications via email',
        },
        {
          key: 'push',
          label: 'Push Notifications',
          type: 'toggle',
          description: 'Receive push notifications in browser',
        },
        {
          key: 'sms',
          label: 'SMS Notifications',
          type: 'toggle',
          description: 'Receive notifications via SMS',
        },
      ],
    },
    {
      title: 'Privacy & Security',
      description: 'Manage your privacy and security settings',
      icon: Shield,
      settings: [
        {
          key: 'profileVisibility',
          label: 'Profile Visibility',
          type: 'select',
          description: 'Who can see your profile',
          options: [
            { value: 'public', label: 'Public' },
            { value: 'friends', label: 'Friends Only' },
            { value: 'private', label: 'Private' },
          ],
        },
        {
          key: 'dataSharing',
          label: 'Data Sharing',
          type: 'toggle',
          description: 'Allow data sharing with third parties',
        },
        {
          key: 'analytics',
          label: 'Analytics',
          type: 'toggle',
          description: 'Help improve the app with analytics',
        },
      ],
    },
    {
      title: 'Appearance',
      description: 'Customize the look and feel of the app',
      icon: Palette,
      settings: [
        {
          key: 'theme',
          label: 'Theme',
          type: 'select',
          description: 'Choose your preferred theme',
          options: [
            { value: 'light', label: 'Light', icon: Sun },
            { value: 'dark', label: 'Dark', icon: Moon },
            { value: 'system', label: 'System', icon: Monitor },
          ],
        },
        {
          key: 'language',
          label: 'Language',
          type: 'select',
          description: 'Select your preferred language',
          options: [
            { value: 'en', label: 'English' },
            { value: 'es', label: 'Español' },
            { value: 'fr', label: 'Français' },
          ],
        },
        {
          key: 'fontSize',
          label: 'Font Size',
          type: 'select',
          description: 'Adjust the text size',
          options: [
            { value: 'small', label: 'Small' },
            { value: 'medium', label: 'Medium' },
            { value: 'large', label: 'Large' },
          ],
        },
      ],
    },
    {
      title: 'Security',
      description: 'Manage your account security settings',
      icon: Key,
      settings: [
        {
          key: 'twoFactor',
          label: 'Two-Factor Authentication',
          type: 'toggle',
          description: 'Add an extra layer of security',
        },
        {
          key: 'sessionTimeout',
          label: 'Session Timeout (minutes)',
          type: 'number',
          description: 'Automatically log out after inactivity',
        },
        {
          key: 'passwordExpiry',
          label: 'Password Expiry (days)',
          type: 'number',
          description: 'Require password change after this many days',
        },
      ],
    },
    {
      title: 'Integrations',
      description: 'Connect with external services',
      icon: Database,
      settings: [
        {
          key: 'google',
          label: 'Google',
          type: 'toggle',
          description: 'Connect with Google services',
        },
        {
          key: 'github',
          label: 'GitHub',
          type: 'toggle',
          description: 'Connect with GitHub',
        },
        {
          key: 'slack',
          label: 'Slack',
          type: 'toggle',
          description: 'Connect with Slack',
        },
      ],
    },
  ]
  
  return (
    <div className="p-6 space-y-6">
      <Helmet>
        <title>Settings - Complex Nothing App</title>
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
            {t('settings')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Configure your complex nothing app (settings do nothing!)
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={handleReset}
            icon={<RotateCcw className="h-4 w-4" />}
          >
            Reset
          </Button>
          
          <Button
            onClick={handleSave}
            icon={<Save className="h-4 w-4" />}
            disabled={!hasChanges}
          >
            Save Changes
          </Button>
        </div>
      </motion.div>
      
      {/* Settings Sections */}
      <div className="space-y-6">
        {settingSections.map((section, sectionIndex) => (
          <motion.div
            key={section.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: sectionIndex * 0.1 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <section.icon className="h-5 w-5" />
                  {section.title}
                </CardTitle>
                <CardDescription>
                  {section.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {section.settings.map((setting, settingIndex) => (
                  <motion.div
                    key={setting.key}
                    className="flex items-center justify-between py-4 border-b border-slate-100 dark:border-slate-800 last:border-b-0"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: settingIndex * 0.05 }}
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <h4 className="font-medium text-slate-900 dark:text-white">
                          {setting.label}
                        </h4>
                        {setting.type === 'toggle' && (
                          <div className={`w-2 h-2 rounded-full ${
                            settings[section.title.toLowerCase().replace(' & ', '').replace(' ', '') as keyof typeof settings]?.[setting.key as keyof any] 
                              ? 'bg-green-500' 
                              : 'bg-gray-300'
                          }`} />
                        )}
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        {setting.description}
                      </p>
                    </div>
                    
                    <div className="ml-4">
                      {setting.type === 'toggle' && (
                        <Button
                          variant={settings[section.title.toLowerCase().replace(' & ', '').replace(' ', '') as keyof typeof settings]?.[setting.key as keyof any] ? 'primary' : 'outline'}
                          size="sm"
                          onClick={() => handleSettingChange(
                            section.title.toLowerCase().replace(' & ', '').replace(' ', ''),
                            setting.key,
                            !settings[section.title.toLowerCase().replace(' & ', '').replace(' ', '') as keyof typeof settings]?.[setting.key as keyof any]
                          )}
                          icon={settings[section.title.toLowerCase().replace(' & ', '').replace(' ', '') as keyof typeof settings]?.[setting.key as keyof any] ? <Check className="h-4 w-4" /> : undefined}
                        >
                          {settings[section.title.toLowerCase().replace(' & ', '').replace(' ', '') as keyof typeof settings]?.[setting.key as keyof any] ? 'On' : 'Off'}
                        </Button>
                      )}
                      
                      {setting.type === 'select' && (
                        <select
                          value={settings[section.title.toLowerCase().replace(' & ', '').replace(' ', '') as keyof typeof settings]?.[setting.key as keyof any] || ''}
                          onChange={(e) => handleSettingChange(
                            section.title.toLowerCase().replace(' & ', '').replace(' ', ''),
                            setting.key,
                            e.target.value
                          )}
                          className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        >
                          {setting.options?.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                      
                      {setting.type === 'number' && (
                        <Input
                          type="number"
                          value={settings[section.title.toLowerCase().replace(' & ', '').replace(' ', '') as keyof typeof settings]?.[setting.key as keyof any] || ''}
                          onChange={(e) => handleSettingChange(
                            section.title.toLowerCase().replace(' & ', '').replace(' ', ''),
                            setting.key,
                            parseInt(e.target.value) || 0
                          )}
                          className="w-24"
                        />
                      )}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Advanced Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <SettingsIcon className="h-5 w-5" />
              Advanced Settings
            </CardTitle>
            <CardDescription>
              Advanced configuration options that do absolutely nothing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900 dark:text-white">
                  Performance
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Cache Size
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      256 MB
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Memory Usage
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      128 MB
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      CPU Usage
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      2.3%
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <h4 className="font-medium text-slate-900 dark:text-white">
                  System Info
                </h4>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Version
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      1.0.0
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Build
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      #1234
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Uptime
                    </span>
                    <span className="text-sm font-medium text-slate-900 dark:text-white">
                      2d 14h 32m
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Settings
