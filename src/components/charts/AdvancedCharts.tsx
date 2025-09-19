import React, { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Treemap,
  Sankey,
  FunnelChart,
  Funnel,
  LabelList,
  ComposedChart,
  ReferenceLine,
  Legend,
  Brush,
  XAxis as RechartsXAxis,
  YAxis as RechartsYAxis,
} from 'recharts'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { 
  BarChart3, 
  TrendingUp, 
  PieChart as PieChartIcon,
  Activity,
  Zap,
  Target,
  Layers,
  GitBranch,
  Filter
} from 'lucide-react'

// Advanced Line Chart with Multiple Series
export const AdvancedLineChart: React.FC<{
  data: any[]
  title?: string
  className?: string
}> = ({ data, title = "Advanced Line Chart", className }) => {
  const [activeSeries, setActiveSeries] = useState(['series1', 'series2', 'series3'])
  
  const series = [
    { key: 'series1', name: 'Revenue', color: '#3b82f6', dataKey: 'revenue' },
    { key: 'series2', name: 'Users', color: '#10b981', dataKey: 'users' },
    { key: 'series3', name: 'Sessions', color: '#f59e0b', dataKey: 'sessions' },
  ]

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Interactive multi-series line chart with custom controls
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex flex-wrap gap-2">
          {series.map((series) => (
            <Button
              key={series.key}
              variant={activeSeries.includes(series.key) ? 'primary' : 'outline'}
              size="sm"
              onClick={() => {
                setActiveSeries(prev => 
                  prev.includes(series.key)
                    ? prev.filter(s => s !== series.key)
                    : [...prev, series.key]
                )
              }}
              className="text-xs"
            >
              <div 
                className="w-2 h-2 rounded-full mr-2" 
                style={{ backgroundColor: series.color }}
              />
              {series.name}
            </Button>
          ))}
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
              <Legend />
              
              {series.map((series) => (
                activeSeries.includes(series.key) && (
                  <Line
                    key={series.key}
                    type="monotone"
                    dataKey={series.dataKey}
                    stroke={series.color}
                    strokeWidth={3}
                    dot={{ fill: series.color, strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, stroke: series.color, strokeWidth: 2 }}
                    connectNulls={false}
                  />
                )
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Radar Chart for Multi-dimensional Data
export const RadarChartComponent: React.FC<{
  data: any[]
  title?: string
  className?: string
}> = ({ data, title = "Performance Radar", className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Target className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Multi-dimensional performance analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={data}>
              <PolarGrid stroke="#e2e8f0" />
              <PolarAngleAxis dataKey="subject" stroke="#64748b" />
              <PolarRadiusAxis 
                angle={90} 
                domain={[0, 100]} 
                stroke="#64748b" 
              />
              <Radar
                name="Performance"
                dataKey="A"
                stroke="#3b82f6"
                fill="#3b82f6"
                fillOpacity={0.3}
                strokeWidth={2}
              />
              <Radar
                name="Target"
                dataKey="B"
                stroke="#10b981"
                fill="#10b981"
                fillOpacity={0.2}
                strokeWidth={2}
              />
              <Legend />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Treemap for Hierarchical Data
export const TreemapChart: React.FC<{
  data: any[]
  title?: string
  className?: string
}> = ({ data, title = "Data Hierarchy", className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Layers className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Hierarchical data visualization
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <Treemap
              data={data}
              dataKey="size"
              ratio={4/3}
              stroke="#fff"
              fill="#8884d8"
            >
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
            </Treemap>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Sankey Diagram for Flow Data
export const SankeyDiagram: React.FC<{
  data: any
  title?: string
  className?: string
}> = ({ data, title = "Data Flow", className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <GitBranch className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Flow diagram showing data relationships
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <Sankey
              data={data}
              nodePadding={20}
              link={{ stroke: '#8884d8' }}
              node={{ stroke: '#8884d8', strokeWidth: 2 }}
            >
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
            </Sankey>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Funnel Chart for Conversion Analysis
export const FunnelChartComponent: React.FC<{
  data: any[]
  title?: string
  className?: string
}> = ({ data, title = "Conversion Funnel", className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Filter className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Conversion funnel analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <FunnelChart>
              <Funnel
                dataKey="value"
                data={data}
                isAnimationActive
                fill="#8884d8"
                labelLine={false}
                label={{ position: 'center' }}
              >
                <LabelList position="center" fill="#fff" stroke="none" />
              </Funnel>
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
            </FunnelChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Composed Chart with Multiple Chart Types
export const ComposedChartComponent: React.FC<{
  data: any[]
  title?: string
  className?: string
}> = ({ data, title = "Composed Analysis", className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <BarChart3 className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Combined bar and line chart analysis
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="month" stroke="#64748b" />
              <YAxis yAxisId="left" stroke="#64748b" />
              <YAxis yAxisId="right" orientation="right" stroke="#64748b" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="revenue" fill="#3b82f6" name="Revenue" />
              <Line 
                yAxisId="right" 
                type="monotone" 
                dataKey="users" 
                stroke="#10b981" 
                strokeWidth={3}
                name="Users"
              />
              <ReferenceLine yAxisId="left" y={1000} stroke="#ef4444" strokeDasharray="5 5" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Advanced Scatter Plot
export const AdvancedScatterPlot: React.FC<{
  data: any[]
  title?: string
  className?: string
}> = ({ data, title = "Correlation Analysis", className }) => {
  const [selectedData, setSelectedData] = useState<any[]>(data)
  const [filterRange, setFilterRange] = useState({ min: 0, max: 1000 })

  const filteredData = useMemo(() => {
    return selectedData.filter(item => 
      item.value >= filterRange.min && item.value <= filterRange.max
    )
  }, [selectedData, filterRange])

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Activity className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Interactive scatter plot with filtering
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center gap-4">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Filter Range:</label>
            <input
              type="range"
              min="0"
              max="1000"
              value={filterRange.min}
              onChange={(e) => setFilterRange(prev => ({ ...prev, min: parseInt(e.target.value) }))}
              className="w-20"
            />
            <span className="text-sm text-slate-600">{filterRange.min}</span>
            <span className="text-sm text-slate-400">-</span>
            <input
              type="range"
              min="0"
              max="1000"
              value={filterRange.max}
              onChange={(e) => setFilterRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
              className="w-20"
            />
            <span className="text-sm text-slate-600">{filterRange.max}</span>
          </div>
        </div>
        
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart data={filteredData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                type="number" 
                dataKey="x" 
                name="X Value" 
                stroke="#64748b"
              />
              <YAxis 
                type="number" 
                dataKey="y" 
                name="Y Value" 
                stroke="#64748b"
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }}
                contentStyle={{
                  backgroundColor: '#1e293b',
                  border: '1px solid #334155',
                  borderRadius: '8px',
                  color: '#f8fafc'
                }}
              />
              <Scatter 
                dataKey="z" 
                fill="#8884d8" 
                fillOpacity={0.6}
                stroke="#6366f1"
                strokeWidth={1}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  )
}

// Heatmap Chart
export const HeatmapChart: React.FC<{
  data: any[]
  title?: string
  className?: string
}> = ({ data, title = "Activity Heatmap", className }) => {
  const [hoveredCell, setHoveredCell] = useState<{ x: number; y: number } | null>(null)

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Zap className="h-5 w-5" />
          {title}
        </CardTitle>
        <CardDescription>
          Activity intensity heatmap
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-80">
          <div className="grid grid-cols-7 gap-1 h-full">
            {data.map((item, index) => (
              <motion.div
                key={index}
                className={`rounded-sm cursor-pointer transition-all duration-200 ${
                  hoveredCell?.x === item.x && hoveredCell?.y === item.y
                    ? 'ring-2 ring-primary-500'
                    : ''
                }`}
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${item.intensity / 100})`,
                }}
                onMouseEnter={() => setHoveredCell({ x: item.x, y: item.y })}
                onMouseLeave={() => setHoveredCell(null)}
                whileHover={{ scale: 1.1 }}
                animate={{ 
                  scale: hoveredCell?.x === item.x && hoveredCell?.y === item.y ? 1.1 : 1 
                }}
              />
            ))}
          </div>
        </div>
        
        {hoveredCell && (
          <div className="mt-4 p-3 bg-slate-100 dark:bg-slate-800 rounded-lg">
            <p className="text-sm">
              Position: ({hoveredCell.x}, {hoveredCell.y})
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Intensity: {data.find(d => d.x === hoveredCell.x && d.y === hoveredCell.y)?.intensity || 0}%
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Chart Container with Controls
export const ChartContainer: React.FC<{
  children: React.ReactNode
  title: string
  description?: string
  controls?: React.ReactNode
  className?: string
}> = ({ children, title, description, controls, className }) => {
  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              {title}
            </CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {controls && (
            <div className="flex items-center gap-2">
              {controls}
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        {children}
      </CardContent>
    </Card>
  )
}
