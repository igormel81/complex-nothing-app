import React from 'react'
import { motion, MotionProps } from 'framer-motion'
import { clsx } from 'clsx'
import { Loader2 } from 'lucide-react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive'
  size?: 'sm' | 'md' | 'lg'
  loading?: boolean
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  fullWidth?: boolean
  animation?: 'none' | 'scale' | 'bounce' | 'pulse'
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    className,
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    iconPosition = 'left',
    fullWidth = false,
    animation = 'scale',
    children,
    disabled,
    ...props
  }, ref) => {
    const baseClasses = 'relative inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
    
    const variants = {
      primary: 'bg-gradient-to-r from-primary-600 to-primary-500 text-white hover:from-primary-700 hover:to-primary-600 focus:ring-primary-500 shadow-lg hover:shadow-xl hover:shadow-primary-500/25',
      secondary: 'bg-white/10 backdrop-blur-sm border border-white/20 text-slate-700 hover:bg-white/20 hover:border-white/30 focus:ring-primary-500',
      outline: 'border border-slate-300 bg-transparent text-slate-700 hover:bg-slate-50 focus:ring-primary-500',
      ghost: 'text-slate-700 hover:bg-slate-100 focus:ring-primary-500',
      destructive: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm rounded-md',
      md: 'px-4 py-2 text-sm rounded-lg',
      lg: 'px-6 py-3 text-base rounded-lg',
    }
    
    const animations = {
      none: {},
      scale: {
        whileHover: { scale: 1.05 },
        whileTap: { scale: 0.95 },
      },
      bounce: {
        whileHover: { y: -2 },
        whileTap: { y: 0 },
      },
      pulse: {
        whileHover: { scale: 1.05 },
        animate: { scale: [1, 1.02, 1] },
        transition: { duration: 2, repeat: Infinity },
      },
    }
    
    const isDisabled = disabled || loading
    
    return (
      <motion.button
        ref={ref}
        className={clsx(
          baseClasses,
          variants[variant],
          sizes[size],
          fullWidth && 'w-full',
          className
        )}
        disabled={isDisabled}
        {...animations[animation]}
        {...(props as MotionProps)}
      >
        {loading && (
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Loader2 className="h-4 w-4 animate-spin" />
          </motion.div>
        )}
        
        <motion.div
          className={clsx(
            'flex items-center gap-2',
            loading && 'opacity-0'
          )}
          initial={false}
          animate={{ opacity: loading ? 0 : 1 }}
        >
          {icon && iconPosition === 'left' && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              {icon}
            </motion.span>
          )}
          
          {children && (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              {children}
            </motion.span>
          )}
          
          {icon && iconPosition === 'right' && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {icon}
            </motion.span>
          )}
        </motion.div>
      </motion.button>
    )
  }
)

Button.displayName = 'Button'

export { Button }
