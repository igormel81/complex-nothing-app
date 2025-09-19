import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

// Mock API functions that do nothing but simulate complex operations
export const mockApi = {
  // Simulate async operations with realistic delays
  delay: (ms: number) => new Promise(resolve => setTimeout(resolve, ms)),
  
  // Mock data generators
  generateMetrics: () => ({
    totalUsers: Math.floor(Math.random() * 10000) + 1000,
    activeSessions: Math.floor(Math.random() * 500) + 50,
    revenue: Math.floor(Math.random() * 100000) + 10000,
    conversionRate: Math.random() * 10 + 1,
    bounceRate: Math.random() * 30 + 5,
    avgSessionDuration: Math.floor(Math.random() * 300) + 60,
  }),
  
  generateChartData: () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
    return months.map(month => ({
      month,
      users: Math.floor(Math.random() * 1000) + 100,
      revenue: Math.floor(Math.random() * 50000) + 5000,
      sessions: Math.floor(Math.random() * 500) + 50,
    }))
  },
  
  generateActivity: () => {
    const activities = [
      'User logged in',
      'New user registered',
      'Payment processed',
      'Data exported',
      'Settings updated',
      'Report generated',
      'API call made',
      'Cache cleared',
    ]
    
    return Array.from({ length: 20 }, (_, i) => ({
      id: `activity-${i}`,
      type: ['user', 'system', 'api'][Math.floor(Math.random() * 3)] as 'user' | 'system' | 'api',
      message: activities[Math.floor(Math.random() * activities.length)],
      timestamp: Date.now() - Math.random() * 86400000, // Last 24 hours
      metadata: {
        userId: Math.floor(Math.random() * 1000),
        ip: `192.168.1.${Math.floor(Math.random() * 255)}`,
      },
    }))
  },
  
  // Mock API calls
  fetchDashboardData: async () => {
    await mockApi.delay(800) // Simulate network delay
    return {
      metrics: mockApi.generateMetrics(),
      charts: mockApi.generateChartData(),
      recentActivity: mockApi.generateActivity(),
    }
  },
  
  fetchUserProfile: async () => {
    await mockApi.delay(500)
    return {
      id: 'user-123',
      name: 'John Doe',
      email: 'john@example.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=John',
      role: 'admin' as const,
      preferences: {
        theme: 'system' as const,
        language: 'en',
        notifications: true,
      },
    }
  },
  
  updateUserProfile: async (data: Partial<any>) => {
    await mockApi.delay(1000)
    return { success: true, data }
  },
  
  fetchNotifications: async () => {
    await mockApi.delay(300)
    return Array.from({ length: 10 }, (_, i) => ({
      id: `notification-${i}`,
      type: ['success', 'error', 'warning', 'info'][Math.floor(Math.random() * 4)] as 'success' | 'error' | 'warning' | 'info',
      title: `Notification ${i + 1}`,
      message: `This is a sample notification message ${i + 1}`,
      timestamp: Date.now() - Math.random() * 3600000, // Last hour
      read: Math.random() > 0.5,
    }))
  },
  
  markNotificationAsRead: async (id: string) => {
    await mockApi.delay(200)
    return { success: true, id }
  },
}

// React Query hooks
export const useDashboardData = () => {
  return useQuery({
    queryKey: ['dashboard'],
    queryFn: mockApi.fetchDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 30 * 1000, // Refetch every 30 seconds
  })
}

export const useUserProfile = () => {
  return useQuery({
    queryKey: ['user', 'profile'],
    queryFn: mockApi.fetchUserProfile,
    staleTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: mockApi.fetchNotifications,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 60 * 1000, // Refetch every minute
  })
}

export const useUpdateUserProfile = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: mockApi.updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] })
    },
  })
}

export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: mockApi.markNotificationAsRead,
    onSuccess: (_, id) => {
      queryClient.setQueryData(['notifications'], (old: any) => 
        old?.map((n: any) => n.id === id ? { ...n, read: true } : n)
      )
    },
  })
}
