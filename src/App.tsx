import React, { Suspense, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import { ErrorBoundary } from 'react-error-boundary'
import { Helmet } from 'react-helmet-async'
import { useAppStore } from '@/store'
import { useWebSocket } from '@/hooks/useWebSocket'
import { LoadingOverlay } from '@/components/ui/LoadingSpinner'
import { ErrorFallback } from '@/components/ErrorFallback'
import { Sidebar } from '@/components/layout/Sidebar'
import { Header } from '@/components/layout/Header'
import { useDashboardData } from '@/services/api'

// Lazy load pages for better performance
const Dashboard = React.lazy(() => import('@/pages/Dashboard'))
const Analytics = React.lazy(() => import('@/pages/Analytics'))
const Users = React.lazy(() => import('@/pages/Users'))
const Settings = React.lazy(() => import('@/pages/Settings'))
const Profile = React.lazy(() => import('@/pages/Profile'))

const App: React.FC = () => {
  const { sidebarOpen, theme, loading, setUser, setLoading } = useAppStore()
  
  // Initialize WebSocket connection
  const { connectionStatus } = useWebSocket('wss://echo.websocket.org')
  
  // Load dashboard data
  const { data: dashboardData, isLoading: isDashboardLoading } = useDashboardData()
  
  // Initialize app
  useEffect(() => {
    const initializeApp = async () => {
      setLoading(true)
      
      // Simulate app initialization
      await new Promise(resolve => setTimeout(resolve, 2000))
      
      // Set mock user
      setUser({
        id: 'user-123',
        name: 'John Doe',
        email: 'john@example.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
        role: 'admin',
        preferences: {
          theme: 'system',
          language: 'en',
          notifications: true,
        },
      })
      
      setLoading(false)
    }
    
    initializeApp()
  }, [setUser, setLoading])
  
  // Update dashboard data in store
  useEffect(() => {
    if (dashboardData) {
      useAppStore.getState().updateDashboardData(dashboardData)
    }
  }, [dashboardData])
  
  // Apply theme
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.classList.add('dark')
    } else if (theme === 'light') {
      root.classList.remove('dark')
    } else {
      // System theme
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        root.classList.add('dark')
      } else {
        root.classList.remove('dark')
      }
    }
  }, [theme])
  
  if (loading || isDashboardLoading) {
    return (
      <LoadingOverlay
        isVisible={true}
        variant="ring"
        size="lg"
        text="Initializing complex nothing app..."
      />
    )
  }
  
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Helmet>
        <title>Complex Nothing App</title>
        <meta name="description" content="A complex modern tech app that does absolutely nothing but showcases advanced patterns" />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <div className="flex h-screen">
          {/* Sidebar */}
          <Sidebar />
          
          {/* Main Content */}
          <div className={`flex-1 flex flex-col transition-all duration-300 ${
            sidebarOpen ? 'ml-64' : 'ml-16'
          }`}>
            {/* Header */}
            <Header />
            
            {/* Page Content */}
            <main className="flex-1 overflow-auto">
              <Suspense fallback={
                <div className="flex items-center justify-center h-64">
                  <LoadingOverlay
                    isVisible={true}
                    variant="dots"
                    text="Loading page..."
                  />
                </div>
              }>
                <Routes>
                  <Route path="/" element={<Navigate to="/dashboard" replace />} />
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/analytics" element={<Analytics />} />
                  <Route path="/users" element={<Users />} />
                  <Route path="/settings" element={<Settings />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="*" element={<Navigate to="/dashboard" replace />} />
                </Routes>
              </Suspense>
            </main>
          </div>
        </div>
        
        {/* Connection Status Indicator */}
        {connectionStatus !== 'connected' && (
          <div className="fixed bottom-4 right-4 z-50">
            <div className={`px-3 py-2 rounded-lg text-sm font-medium ${
              connectionStatus === 'connected' 
                ? 'bg-green-100 text-green-800' 
                : connectionStatus === 'connecting'
                ? 'bg-yellow-100 text-yellow-800'
                : 'bg-red-100 text-red-800'
            }`}>
              {connectionStatus === 'connected' && '🟢 Connected'}
              {connectionStatus === 'connecting' && '🟡 Connecting...'}
              {connectionStatus === 'disconnected' && '🔴 Disconnected'}
              {connectionStatus === 'error' && '❌ Connection Error'}
            </div>
          </div>
        )}
      </div>
    </ErrorBoundary>
  )
}

export default App
