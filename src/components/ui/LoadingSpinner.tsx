import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'default' | 'dots' | 'pulse' | 'bounce' | 'ring'
  color?: 'primary' | 'white' | 'slate'
  className?: string
  text?: string
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  variant = 'default',
  color = 'primary',
  className,
  text,
}) => {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-6 w-6',
    lg: 'h-8 w-8',
    xl: 'h-12 w-12',
  }
  
  const colors = {
    primary: 'text-primary-600',
    white: 'text-white',
    slate: 'text-slate-600',
  }
  
  const renderSpinner = () => {
    switch (variant) {
      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={clsx('rounded-full bg-current', sizes[size])}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.2,
                }}
              />
            ))}
          </div>
        )
      
      case 'pulse':
        return (
          <motion.div
            className={clsx('rounded-full bg-current', sizes[size])}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
          />
        )
      
      case 'bounce':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                className={clsx('rounded-full bg-current', sizes[size])}
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 0.6,
                  repeat: Infinity,
                  delay: i * 0.1,
                }}
              />
            ))}
          </div>
        )
      
      case 'ring':
        return (
          <motion.div
            className={clsx('rounded-full border-2 border-current border-t-transparent', sizes[size])}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )
      
      default:
        return (
          <motion.div
            className={clsx('rounded-full border-2 border-current border-t-transparent', sizes[size])}
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        )
    }
  }
  
  return (
    <motion.div
      className={clsx(
        'flex flex-col items-center justify-center gap-2',
        colors[color],
        className
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {renderSpinner()}
      {text && (
        <motion.p
          className="text-sm font-medium"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          {text}
        </motion.p>
      )}
    </motion.div>
  )
}

interface LoadingOverlayProps extends LoadingSpinnerProps {
  isVisible: boolean
  backdrop?: boolean
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({
  isVisible,
  backdrop = true,
  ...spinnerProps
}) => {
  return (
    <motion.div
      className={clsx(
        'fixed inset-0 z-50 flex items-center justify-center',
        backdrop && 'bg-black/50 backdrop-blur-sm'
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      exit={{ opacity: 0 }}
      style={{ pointerEvents: isVisible ? 'auto' : 'none' }}
    >
      <LoadingSpinner {...spinnerProps} />
    </motion.div>
  )
}

export { LoadingSpinner, LoadingOverlay }
