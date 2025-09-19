import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'
import { Eye, EyeOff, Search, X } from 'lucide-react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
  helperText?: string
  icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  clearable?: boolean
  onClear?: () => void
  variant?: 'default' | 'filled' | 'outlined'
  size?: 'sm' | 'md' | 'lg'
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({
    className,
    type = 'text',
    label,
    error,
    helperText,
    icon,
    iconPosition = 'left',
    clearable = false,
    onClear,
    variant = 'default',
    size = 'md',
    disabled,
    ...props
  }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const [isFocused, setIsFocused] = React.useState(false)
    const [hasValue, setHasValue] = React.useState(false)
    
    const inputType = type === 'password' && showPassword ? 'text' : type
    const showClearButton = clearable && hasValue && !disabled
    
    const baseClasses = 'w-full transition-all duration-200 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50'
    
    const variants = {
      default: 'bg-white border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
      filled: 'bg-slate-100 border border-transparent rounded-lg focus:bg-white focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
      outlined: 'bg-transparent border-2 border-slate-300 rounded-lg focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500',
    }
    
    const sizes = {
      sm: 'px-3 py-1.5 text-sm',
      md: 'px-4 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base',
    }
    
    const iconSizes = {
      sm: 'h-4 w-4',
      md: 'h-5 w-5',
      lg: 'h-5 w-5',
    }
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setHasValue(e.target.value.length > 0)
      props.onChange?.(e)
    }
    
    const handleClear = () => {
      setHasValue(false)
      onClear?.()
    }
    
    return (
      <div className="w-full">
        {label && (
          <motion.label
            className={clsx(
              'block text-sm font-medium text-slate-700 mb-2',
              error && 'text-red-600'
            )}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            {label}
          </motion.label>
        )}
        
        <motion.div
          className={clsx(
            'relative flex items-center',
            error && 'animate-shake'
          )}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          {icon && iconPosition === 'left' && (
            <motion.div
              className={clsx(
                'absolute left-3 text-slate-400 pointer-events-none',
                iconSizes[size]
              )}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              {icon}
            </motion.div>
          )}
          
          <input
            ref={ref}
            type={inputType}
            className={clsx(
              baseClasses,
              variants[variant],
              sizes[size],
              icon && iconPosition === 'left' && 'pl-10',
              (icon && iconPosition === 'right') || showClearButton || type === 'password' ? 'pr-10' : '',
              error && 'border-red-500 focus:ring-red-500/20 focus:border-red-500',
              className
            )}
            disabled={disabled}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleChange}
            {...props}
          />
          
          <motion.div
            className="absolute right-3 flex items-center gap-1"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            {type === 'password' && (
              <motion.button
                type="button"
                className={clsx(
                  'text-slate-400 hover:text-slate-600 transition-colors',
                  iconSizes[size]
                )}
                onClick={() => setShowPassword(!showPassword)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </motion.button>
            )}
            
            {showClearButton && (
              <motion.button
                type="button"
                className={clsx(
                  'text-slate-400 hover:text-slate-600 transition-colors',
                  iconSizes[size]
                )}
                onClick={handleClear}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X />
              </motion.button>
            )}
            
            {icon && iconPosition === 'right' && type !== 'password' && !showClearButton && (
              <div className={clsx('text-slate-400', iconSizes[size])}>
                {icon}
              </div>
            )}
          </motion.div>
        </motion.div>
        
        {(error || helperText) && (
          <motion.div
            className="mt-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {error && (
              <p className="text-sm text-red-600 flex items-center gap-1">
                <motion.span
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 0.5 }}
                >
                  ⚠️
                </motion.span>
                {error}
              </p>
            )}
            {helperText && !error && (
              <p className="text-sm text-slate-500">{helperText}</p>
            )}
          </motion.div>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export { Input }
