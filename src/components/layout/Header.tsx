import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  Settings, 
  Moon, 
  Sun, 
  Monitor,
  User,
  LogOut,
  ChevronDown
} from 'lucide-react'
import { useAppStore } from '@/store'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { Modal } from '@/components/ui/Modal'
import { useNotifications } from '@/services/api'
import { useTranslation } from 'react-i18next'

const Header: React.FC = () => {
  const { user, theme, setTheme, addNotification } = useAppStore()
  const { data: notifications = [] } = useNotifications()
  const { t } = useTranslation()
  const [searchQuery, setSearchQuery] = useState('')
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [showThemeMenu, setShowThemeMenu] = useState(false)
  
  const unreadCount = notifications.filter(n => !n.read).length
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    addNotification({
      type: 'info',
      title: 'Search Performed',
      message: `Searched for: "${searchQuery}" (This does nothing!)`,
    })
    setSearchQuery('')
  }
  
  const handleNotificationClick = (notification: any) => {
    addNotification({
      type: 'success',
      title: 'Notification Clicked',
      message: 'You clicked a notification that does nothing!',
    })
  }
  
  const handleThemeChange = (newTheme: 'light' | 'dark' | 'system') => {
    setTheme(newTheme)
    addNotification({
      type: 'success',
      title: 'Theme Changed',
      message: `Switched to ${newTheme} theme`,
    })
  }
  
  const handleLogout = () => {
    addNotification({
      type: 'info',
      title: 'Logout Attempted',
      message: 'You tried to logout, but this app does nothing!',
    })
  }
  
  return (
    <header className="h-16 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 px-6 flex items-center justify-between">
      {/* Search */}
      <motion.form
        onSubmit={handleSearch}
        className="flex-1 max-w-md"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Input
          type="search"
          placeholder="Search (does nothing)..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          icon={<Search className="h-4 w-4" />}
          className="w-full"
        />
      </motion.form>
      
      {/* Right side actions */}
      <div className="flex items-center gap-4">
        {/* Theme selector */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowThemeMenu(!showThemeMenu)}
            icon={
              theme === 'light' ? <Sun className="h-4 w-4" /> :
              theme === 'dark' ? <Moon className="h-4 w-4" /> :
              <Monitor className="h-4 w-4" />
            }
          />
          
          <AnimatePresence>
            {showThemeMenu && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                {[
                  { value: 'light', label: 'Light', icon: Sun },
                  { value: 'dark', label: 'Dark', icon: Moon },
                  { value: 'system', label: 'System', icon: Monitor },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => {
                      handleThemeChange(value as any)
                      setShowThemeMenu(false)
                    }}
                    className={`w-full flex items-center gap-3 px-4 py-2 text-sm hover:bg-slate-100 dark:hover:bg-slate-700 ${
                      theme === value ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowNotifications(!showNotifications)}
            icon={<Bell className="h-4 w-4" />}
            className="relative"
          >
            {unreadCount > 0 && (
              <motion.span
                className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 text-xs text-white flex items-center justify-center"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500 }}
              >
                {unreadCount}
              </motion.span>
            )}
          </Button>
          
          <AnimatePresence>
            {showNotifications && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-80 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-4 border-b border-slate-200 dark:border-slate-700">
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {t('notifications')}
                  </h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {notifications.length === 0 ? (
                    <div className="p-4 text-center text-slate-500 dark:text-slate-400">
                      No notifications
                    </div>
                  ) : (
                    notifications.slice(0, 5).map((notification, index) => (
                      <motion.div
                        key={notification.id}
                        className="p-4 hover:bg-slate-50 dark:hover:bg-slate-700 cursor-pointer border-b border-slate-100 dark:border-slate-700 last:border-b-0"
                        onClick={() => handleNotificationClick(notification)}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 4 }}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.type === 'success' ? 'bg-green-500' :
                            notification.type === 'error' ? 'bg-red-500' :
                            notification.type === 'warning' ? 'bg-yellow-500' :
                            'bg-blue-500'
                          }`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-slate-900 dark:text-white">
                              {notification.title}
                            </p>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                              {new Date(notification.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* User menu */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center gap-2"
          >
            <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary-600 to-primary-500 flex items-center justify-center">
              <span className="text-sm font-medium text-white">
                {user?.name?.charAt(0) || 'U'}
              </span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </Button>
          
          <AnimatePresence>
            {showUserMenu && (
              <motion.div
                className="absolute right-0 top-full mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 py-2 z-50"
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-700">
                  <p className="text-sm font-medium text-slate-900 dark:text-white">
                    {user?.name || 'User'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {user?.email || 'user@example.com'}
                  </p>
                </div>
                
                <div className="py-2">
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <User className="h-4 w-4" />
                    Profile
                  </button>
                  
                  <button
                    onClick={() => setShowUserMenu(false)}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
                  >
                    <Settings className="h-4 w-4" />
                    Settings
                  </button>
                  
                  <div className="border-t border-slate-200 dark:border-slate-700 my-2" />
                  
                  <button
                    onClick={() => {
                      handleLogout()
                      setShowUserMenu(false)
                    }}
                    className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    <LogOut className="h-4 w-4" />
                    Logout
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </header>
  )
}

export { Header }
