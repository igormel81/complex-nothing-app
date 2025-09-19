import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useTranslation } from 'react-i18next'
import { 
  BarChart3, 
  TrendingUp, 
  Download, 
  Filter,
  Calendar,
  RefreshCw,
  Eye,
  EyeOff
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'
import { useAppStore } from '@/store'
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Cell,
  AreaChart,
  Area,
  ComposedChart,
  Scatter,
  ScatterChart
} from 'recharts'

const Analytics: React.FC = () => {
  const { t } = useTranslation()
  const { addNotification } = useAppStore()
  const [selectedPeriod, setSelectedPeriod] = useState('7d')
  const [showFilters, setShowFilters] = useState(false)
  const [showData, setShowData] = useState(true)
  
  // Mock data for different chart types
  const lineData = [
    { name: 'Jan', value: 400, users: 240, sessions: 300 },
    { name: 'Feb', value: 300, users: 139, sessions: 200 },
    { name: 'Mar', value: 200, users: 980, sessions: 400 },
    { name: 'Apr', value: 278, users: 390, sessions: 350 },
    { name: 'May', value: 189, users: 480, sessions: 250 },
    { name: 'Jun', value: 239, users: 380, sessions: 300 },
  ]
  
  const pieData = [
    { name: 'Desktop', value: 400, color: '#3b82f6' },
    { name: 'Mobile', value: 300, color: '#10b981' },
    { name: 'Tablet', value: 200, color: '#f59e0b' },
    { name: 'Other', value: 100, color: '#ef4444' },
  ]
  
  const scatterData = [
    { x: 100, y: 200, z: 200 },
    { x: 120, y: 100, z: 260 },
    { x: 170, y: 300, z: 400 },
    { x: 140, y: 250, z: 280 },
    { x: 150, y: 400, z: 500 },
    { x: 110, y: 280, z: 200 },
  ]
  
  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6']
  
  const handleAction = (action: string) => {
    addNotification({
      type: 'info',
      title: 'Analytics Action',
      message: `You performed "${action}" but this app does nothing!`,
    })
  }
  
  const periods = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
    { value: '1y', label: 'Last year' },
  ]
  
  return (
    <div className="p-6 space-y-6">
      <Helmet>
        <title>Analytics - Complex Nothing App</title>
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
            {t('analytics')}
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-2">
            Advanced analytics that show complex data but do nothing
          </p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            icon={<Filter className="h-4 w-4" />}
          >
            Filters
          </Button>
          
          <Button
            variant="outline"
            onClick={() => handleAction('Export Analytics')}
            icon={<Download className="h-4 w-4" />}
          >
            Export
          </Button>
          
          <Button
            variant="outline"
            onClick={() => setShowData(!showData)}
            icon={showData ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          >
            {showData ? 'Hide Data' : 'Show Data'}
          </Button>
        </div>
      </motion.div>
      
      {/* Period Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <Calendar className="h-5 w-5 text-slate-500" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Time Period:
              </span>
              <div className="flex gap-2">
                {periods.map((period) => (
                  <Button
                    key={period.value}
                    variant={selectedPeriod === period.value ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedPeriod(period.value)}
                  >
                    {period.label}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
      
      {/* Filters Panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle>Advanced Filters</CardTitle>
                <CardDescription>
                  Configure filters that do absolutely nothing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Input
                    label="Date Range"
                    placeholder="Select date range"
                    icon={<Calendar className="h-4 w-4" />}
                  />
                  <Input
                    label="User Segment"
                    placeholder="All users"
                  />
                  <Input
                    label="Event Type"
                    placeholder="All events"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <Button variant="outline" onClick={() => setShowFilters(false)}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleAction('Apply Filters')}>
                    Apply Filters
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                User Growth Trend
              </CardTitle>
              <CardDescription>
                User growth over time (does nothing)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3b82f6" 
                      strokeWidth={2}
                      dot={{ fill: '#3b82f6', strokeWidth: 2, r: 4 }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="users" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Area Chart */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                Session Duration
              </CardTitle>
              <CardDescription>
                Average session duration over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={lineData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="sessions" 
                      stroke="#8b5cf6" 
                      fill="#8b5cf6"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Pie Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Device Distribution</CardTitle>
              <CardDescription>
                User distribution by device type
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
        
        {/* Scatter Chart */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>User Engagement</CardTitle>
              <CardDescription>
                Correlation between time spent and actions taken
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <ScatterChart data={scatterData}>
                    <CartesianGrid />
                    <XAxis type="number" dataKey="x" name="Time Spent" />
                    <YAxis type="number" dataKey="y" name="Actions" />
                    <Tooltip cursor={{ strokeDasharray: '3 3' }} />
                    <Scatter dataKey="z" fill="#f59e0b" />
                  </ScatterChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
      
      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <Card>
          <CardHeader>
            <CardTitle>Raw Data</CardTitle>
            <CardDescription>
              Detailed analytics data that serves no purpose
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                      Date
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                      Users
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                      Sessions
                    </th>
                    <th className="text-left py-3 px-4 font-medium text-slate-700 dark:text-slate-300">
                      Value
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {lineData.map((row, index) => (
                    <motion.tr
                      key={row.name}
                      className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <td className="py-3 px-4 text-slate-900 dark:text-white">
                        {row.name}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        {row.users.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        {row.sessions.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-slate-600 dark:text-slate-400">
                        ${row.value.toLocaleString()}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default Analytics
