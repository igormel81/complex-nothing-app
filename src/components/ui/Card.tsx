import React from 'react'
import { motion } from 'framer-motion'
import { clsx } from 'clsx'

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'glass' | 'elevated' | 'outlined'
  hover?: boolean
  animation?: 'none' | 'lift' | 'glow' | 'float'
  children: React.ReactNode
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({
    className,
    variant = 'default',
    hover = true,
    animation = 'lift',
    children,
    ...props
  }, ref) => {
    const baseClasses = 'rounded-xl transition-all duration-300'
    
    const variants = {
      default: 'bg-white border border-slate-200 shadow-sm',
      glass: 'bg-white/10 backdrop-blur-md border border-white/20 shadow-lg',
      elevated: 'bg-white border border-slate-200 shadow-xl',
      outlined: 'bg-transparent border-2 border-slate-300',
    }
    
    const animations = {
      none: {},
      lift: {
        whileHover: hover ? { y: -4, scale: 1.02 } : {},
        whileTap: { scale: 0.98 },
      },
      glow: {
        whileHover: hover ? { 
          boxShadow: '0 0 30px rgba(59, 130, 246, 0.3)',
          scale: 1.02 
        } : {},
      },
      float: {
        animate: { y: [0, -10, 0] },
        transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
        whileHover: hover ? { scale: 1.05 } : {},
      },
    }
    
    return (
      <motion.div
        ref={ref}
        className={clsx(
          baseClasses,
          variants[variant],
          hover && 'hover:shadow-xl hover:shadow-slate-200/50',
          className
        )}
        {...animations[animation]}
        {...props}
      >
        {children}
      </motion.div>
    )
  }
)

Card.displayName = 'Card'

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardHeader.displayName = 'CardHeader'

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  children: React.ReactNode
}

const CardTitle = React.forwardRef<HTMLParagraphElement, CardTitleProps>(
  ({ className, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={clsx('text-2xl font-semibold leading-none tracking-tight', className)}
      {...props}
    >
      {children}
    </h3>
  )
)

CardTitle.displayName = 'CardTitle'

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  children: React.ReactNode
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={clsx('text-sm text-slate-500', className)}
      {...props}
    >
      {children}
    </p>
  )
)

CardDescription.displayName = 'CardDescription'

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardContent.displayName = 'CardContent'

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, children, ...props }, ref) => (
    <div
      ref={ref}
      className={clsx('flex items-center p-6 pt-0', className)}
      {...props}
    >
      {children}
    </div>
  )
)

CardFooter.displayName = 'CardFooter'

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }
