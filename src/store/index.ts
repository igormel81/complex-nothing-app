import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
  role: 'admin' | 'user' | 'guest'
  preferences: {
    theme: 'light' | 'dark' | 'system'
    language: string
    notifications: boolean
  }
}

export interface AppState {
  // User state
  user: User | null
  isAuthenticated: boolean
  
  // UI state
  sidebarOpen: boolean
  theme: 'light' | 'dark' | 'system'
  loading: boolean
  notifications: Notification[]
  
  // Complex data state
  dashboardData: {
    metrics: Record<string, number>
    charts: any[]
    recentActivity: Activity[]
  }
  
  // WebSocket state
  connectionStatus: 'connecting' | 'connected' | 'disconnected' | 'error'
  realTimeData: Record<string, any>
  
  // Actions
  setUser: (user: User | null) => void
  toggleSidebar: () => void
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  setLoading: (loading: boolean) => void
  addNotification: (notification: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  updateDashboardData: (data: Partial<AppState['dashboardData']>) => void
  setConnectionStatus: (status: AppState['connectionStatus']) => void
  updateRealTimeData: (key: string, value: any) => void
  reset: () => void
}

export interface Notification {
  id: string
  type: 'success' | 'error' | 'warning' | 'info'
  title: string
  message: string
  timestamp: number
  read: boolean
}

export interface Activity {
  id: string
  type: 'user' | 'system' | 'api'
  message: string
  timestamp: number
  metadata?: Record<string, any>
}

const initialState = {
  user: null,
  isAuthenticated: false,
  sidebarOpen: true,
  theme: 'system' as const,
  loading: false,
  notifications: [],
  dashboardData: {
    metrics: {},
    charts: [],
    recentActivity: [],
  },
  connectionStatus: 'disconnected' as const,
  realTimeData: {},
}

export const useAppStore = create<AppState>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        ...initialState,
        
        setUser: (user) =>
          set((state) => {
            state.user = user
            state.isAuthenticated = !!user
          }),
        
        toggleSidebar: () =>
          set((state) => {
            state.sidebarOpen = !state.sidebarOpen
          }),
        
        setTheme: (theme) =>
          set((state) => {
            state.theme = theme
            if (state.user) {
              state.user.preferences.theme = theme
            }
          }),
        
        setLoading: (loading) =>
          set((state) => {
            state.loading = loading
          }),
        
        addNotification: (notification) =>
          set((state) => {
            const newNotification: Notification = {
              ...notification,
              id: crypto.randomUUID(),
              timestamp: Date.now(),
              read: false,
            }
            state.notifications.unshift(newNotification)
            // Keep only last 50 notifications
            if (state.notifications.length > 50) {
              state.notifications = state.notifications.slice(0, 50)
            }
          }),
        
        removeNotification: (id) =>
          set((state) => {
            state.notifications = state.notifications.filter(n => n.id !== id)
          }),
        
        updateDashboardData: (data) =>
          set((state) => {
            Object.assign(state.dashboardData, data)
          }),
        
        setConnectionStatus: (status) =>
          set((state) => {
            state.connectionStatus = status
          }),
        
        updateRealTimeData: (key, value) =>
          set((state) => {
            state.realTimeData[key] = value
          }),
        
        reset: () => set(initialState),
      }))
    ),
    {
      name: 'app-store',
    }
  )
)

// Selectors for optimized re-renders
export const useUser = () => useAppStore((state) => state.user)
export const useIsAuthenticated = () => useAppStore((state) => state.isAuthenticated)
export const useSidebarOpen = () => useAppStore((state) => state.sidebarOpen)
export const useTheme = () => useAppStore((state) => state.theme)
export const useLoading = () => useAppStore((state) => state.loading)
export const useNotifications = () => useAppStore((state) => state.notifications)
export const useDashboardData = () => useAppStore((state) => state.dashboardData)
export const useConnectionStatus = () => useAppStore((state) => state.connectionStatus)
export const useRealTimeData = () => useAppStore((state) => state.realTimeData)
