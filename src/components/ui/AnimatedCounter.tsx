import React, { useEffect, useState } from 'react'
import { motion, useSpring, useTransform } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  onComplete?: () => void
}

const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 2,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  onComplete,
}) => {
  const [displayValue, setDisplayValue] = useState(0)
  
  const spring = useSpring(0, {
    stiffness: 100,
    damping: 30,
    duration: duration * 1000,
  })
  
  const display = useTransform(spring, (current) => {
    const rounded = Number(current.toFixed(decimals))
    setDisplayValue(rounded)
    return rounded
  })
  
  useEffect(() => {
    spring.set(value)
    
    const timer = setTimeout(() => {
      onComplete?.()
    }, duration * 1000)
    
    return () => clearTimeout(timer)
  }, [value, spring, duration, onComplete])
  
  return (
    <motion.span className={className}>
      {prefix}
      {displayValue.toLocaleString()}
      {suffix}
    </motion.span>
  )
}

interface AnimatedNumberProps {
  value: number
  duration?: number
  decimals?: number
  prefix?: string
  suffix?: string
  className?: string
  delay?: number
  onComplete?: () => void
}

const AnimatedNumber: React.FC<AnimatedNumberProps> = ({
  value,
  duration = 1.5,
  decimals = 0,
  prefix = '',
  suffix = '',
  className = '',
  delay = 0,
  onComplete,
}) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)
    
    return () => clearTimeout(timer)
  }, [delay])
  
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ 
        opacity: isVisible ? 1 : 0, 
        scale: isVisible ? 1 : 0.5 
      }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedCounter
        value={isVisible ? value : 0}
        duration={duration}
        decimals={decimals}
        prefix={prefix}
        suffix={suffix}
        className={className}
        onComplete={onComplete}
      />
    </motion.div>
  )
}

interface AnimatedPercentageProps {
  value: number
  duration?: number
  decimals?: number
  className?: string
  showSign?: boolean
  color?: 'primary' | 'success' | 'warning' | 'danger'
}

const AnimatedPercentage: React.FC<AnimatedPercentageProps> = ({
  value,
  duration = 2,
  decimals = 1,
  className = '',
  showSign = true,
  color = 'primary',
}) => {
  const colors = {
    primary: 'text-primary-600',
    success: 'text-green-600',
    warning: 'text-yellow-600',
    danger: 'text-red-600',
  }
  
  return (
    <motion.div
      className={`${colors[color]} ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <AnimatedCounter
        value={value}
        duration={duration}
        decimals={decimals}
        suffix="%"
        prefix={showSign && value > 0 ? '+' : ''}
      />
    </motion.div>
  )
}

export { AnimatedCounter, AnimatedNumber, AnimatedPercentage }
