import React from 'react'
import { motion } from 'framer-motion'
import { AlertTriangle, RefreshCw, Home } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'

interface ErrorFallbackProps {
  error: Error
  resetErrorBoundary: () => void
}

export const ErrorFallback: React.FC<ErrorFallbackProps> = ({ error, resetErrorBoundary }) => {
  const handleGoHome = () => {
    window.location.href = '/'
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="text-center">
          <CardHeader>
            <motion.div
              className="mx-auto mb-4"
              animate={{ 
                rotate: [0, 10, -10, 0],
                scale: [1, 1.1, 1]
              }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            >
              <AlertTriangle className="h-16 w-16 text-red-500" />
            </motion.div>
            
            <CardTitle className="text-2xl text-red-600">
              Oops! Something went wrong
            </CardTitle>
            
            <CardDescription className="text-slate-600">
              The complex nothing app encountered an unexpected error. 
              Don't worry, it's not your fault - the app does nothing anyway!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="bg-slate-100 dark:bg-slate-800 rounded-lg p-4 text-left">
              <h4 className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                Error Details:
              </h4>
              <code className="text-sm text-slate-600 dark:text-slate-400 break-all">
                {error.message}
              </code>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                onClick={resetErrorBoundary}
                icon={<RefreshCw className="h-4 w-4" />}
                className="flex-1"
              >
                Try Again
              </Button>
              
              <Button
                variant="secondary"
                onClick={handleGoHome}
                icon={<Home className="h-4 w-4" />}
                className="flex-1"
              >
                Go Home
              </Button>
            </div>
            
            <motion.p
              className="text-xs text-slate-500"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
            >
              This error is part of the complex nothing app experience. 
              Even errors do nothing in this app! 🎭
            </motion.p>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
