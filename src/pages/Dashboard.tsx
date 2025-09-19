import React from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { 
  Users, 
  TrendingUp, 
  DollarSign, 
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Zap,
  BarChart3,
  PieChart,
  LineChart
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { AnimatedCounter, AnimatedPercentage } from '@/components/ui/AnimatedCounter'
import { useDashboardData } from '@/services/api'
import { useAppStore } from '@/store'
import { LineChart as RechartsLineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart as RechartsPieChart, Cell } from 'recharts'

const Dashboard: React.FC = () => {
  const { t } = useTranslation()
  const { data: dashboardData, isLoading } = useDashboardData()
  const { addNotification } = useAppStore()
  
  const metrics = [
    {
      title: t('totalUsers'),
      value: dashboardData?.metrics.totalUsers || 0,
      icon: Users,
      change: '+12.5%',
      changeType: 'positive' as const,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      title: t('activeSessions'),
      value: dashboardData?.metrics.activeSessions || 0,
      icon: Activity,
      change: '+8.2%',
      changeType: 'positive' as const,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      title: t('revenue'),
      value: dashboardData?.metrics.revenue || 0,
      icon: DollarSign,
      change: '+15.3%',
      changeType: 'positive' as const,
      color: 'text-purple-600',
      bgColor: 'bg-purple-100',
    },
    {
      title: t('conversionRate'),
      value: dashboardData?.metrics.conversionRate || 0,
      icon: TrendingUp,
      change: '-2.1%',
      changeType: 'negative' as const,
      color: 'text-orange-600',
      bgColor: 'bg-orange-100',
    },
  ]
  
  const handleAction = (action: string) => {
    addNotification({
      type: 'info',
      title: 'Action Performed',
      message: `You clicked "${action}" but this app does nothing!`,
    })
  }
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  
  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-slate-200 rounded w-1/4" />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="h-32 bg-slate-200 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }
  
  return (
    <div className="p-6 space-y-6">
      <Helmet>
        <title>Dashboard - Complex Nothing App</title>
      </Helmet>
      
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
          {t('welcome')}, John! 👋
        </h1>
        <p className="text-slate-600 dark:text-slate-400 mt-2">
          Here's what's happening with your complex nothing app today.
        </p>
      </motion.div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="hover:shadow-lg transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                      {metric.title}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <AnimatedCounter
                        value={metric.value}
                        prefix={metric.title.includes('Revenue') ? '$' : ''}
                        className="text-2xl font-bold text-slate-900 dark:text-white"
                      />
                      <div className={`flex items-center gap-1 text-sm ${
                        metric.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {metric.changeType === 'positive' ? (
                          <ArrowUpRight className="h-4 w-4" />
                        ) : (
                          <ArrowDownRight className="h-4 w-4" />
                        )}
                        <AnimatedPercentage
                          value={parseFloat(metric.change.replace('%', ''))}
                          color={metric.changeType === 'positive' ? 'success' : 'danger'}
                        />
                      </div>
                    </div>
                  </div>
                  <motion.div
                    className={`p-3 rounded-lg ${metric.bgColor}`}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                  >
                    <metric.icon className={`h-6 w-6 ${metric.color}`} />
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <LineChart className="h-5 w-5" />
                User Growth
              </CardTitle>
              <CardDescription>
                Monthly user growth over the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={dashboardData?.charts || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Bar Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Revenue Breakdown
              </CardTitle>
              <CardDescription>
                Revenue by month for the past 6 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={dashboardData?.charts || []}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Quick Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              {t('quickActions')}
            </CardTitle>
            <CardDescription>
              Common actions that do absolutely nothing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { label: 'Export Data', icon: BarChart3, action: 'Export Data' },
                { label: 'Generate Report', icon: PieChart, action: 'Generate Report' },
                { label: 'Send Notification', icon: Activity, action: 'Send Notification' },
                { label: 'Refresh Cache', icon: Zap, action: 'Refresh Cache' },
              ].map((item, index) => (
                <motion.div
                  key={item.label}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-full h-20 flex flex-col items-center gap-2"
                    onClick={() => handleAction(item.action)}
                  >
                    <item.icon className="h-6 w-6" />
                    <span className="text-sm">{item.label}</span>
                  </Button>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Activity className="h-5 w-5" />
              {t('recentActivity')}
            </CardTitle>
            <CardDescription>
              Latest activities from your complex nothing app
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {dashboardData?.recentActivity?.slice(0, 5).map((activity, index) => (
                <motion.div
                  key={activity.id}
                  className="flex items-center gap-4 p-4 rounded-lg bg-slate-50 dark:bg-slate-800"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 4 }}
                >
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'user' ? 'bg-blue-500' :
                    activity.type === 'system' ? 'bg-green-500' :
                    'bg-purple-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {activity.message}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {new Date(activity.timestamp).toLocaleString()}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Dashboard
