import React, { useState, useRef, useEffect } from 'react'
import { motion, useAnimation, useInView, useSpring, useTransform, useMotionValue } from 'framer-motion'
import { clsx } from 'clsx'

// Particle System Component
export const ParticleSystem: React.FC<{ count?: number; className?: string }> = ({ 
  count = 50, 
  className 
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
  }>>([])

  useEffect(() => {
    const newParticles = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
      size: Math.random() * 4 + 1,
      opacity: Math.random() * 0.5 + 0.1,
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className={clsx('absolute inset-0 overflow-hidden pointer-events-none', className)}>
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full bg-primary-500"
          style={{
            width: particle.size,
            height: particle.size,
            x: particle.x,
            y: particle.y,
            opacity: particle.opacity,
          }}
          animate={{
            x: [particle.x, particle.x + particle.vx * 100],
            y: [particle.y, particle.y + particle.vy * 100],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}

// Morphing Shape Component
export const MorphingShape: React.FC<{ 
  shapes: string[]
  duration?: number
  className?: string 
}> = ({ shapes, duration = 3, className }) => {
  const [currentShape, setCurrentShape] = useState(0)
  
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentShape((prev) => (prev + 1) % shapes.length)
    }, duration * 1000)
    
    return () => clearInterval(interval)
  }, [shapes.length, duration])

  const pathVariants = {
    circle: "M50,50 m-50,0 a50,50 0 1,1 100,0 a50,50 0 1,1 -100,0",
    square: "M0,0 L100,0 L100,100 L0,100 Z",
    triangle: "M50,0 L100,100 L0,100 Z",
    star: "M50,0 L61,35 L98,35 L68,57 L79,91 L50,70 L21,91 L32,57 L2,35 L39,35 Z",
    heart: "M50,85 C50,85 10,45 10,25 C10,15 20,5 30,5 C40,5 50,15 50,25 C50,15 60,5 70,5 C80,5 90,15 90,25 C90,45 50,85 50,85 Z",
  }

  return (
    <motion.div className={clsx('w-32 h-32', className)}>
      <motion.svg
        width="100%"
        height="100%"
        viewBox="0 0 100 100"
        className="text-primary-500"
      >
        <motion.path
          d={pathVariants[shapes[currentShape] as keyof typeof pathVariants] || pathVariants.circle}
          fill="currentColor"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </motion.svg>
    </motion.div>
  )
}

// Magnetic Button Component
export const MagneticButton: React.FC<{
  children: React.ReactNode
  className?: string
  strength?: number
  onClick?: () => void
}> = ({ children, className, strength = 0.3, onClick }) => {
  const ref = useRef<HTMLButtonElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const distanceX = (e.clientX - centerX) * strength
    const distanceY = (e.clientY - centerY) * strength
    
    x.set(distanceX)
    y.set(distanceY)
  }
  
  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }
  
  return (
    <motion.button
      ref={ref}
      className={className}
      style={{ x, y }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  )
}

// Liquid Loading Component
export const LiquidLoader: React.FC<{ 
  progress: number
  size?: number
  className?: string 
}> = ({ progress, size = 100, className }) => {
  const circumference = 2 * Math.PI * (size / 2 - 5)
  const strokeDasharray = circumference
  const strokeDashoffset = circumference - (progress / 100) * circumference

  return (
    <div className={clsx('relative', className)}>
      <svg width={size} height={size} className="transform -rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 5}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          className="text-slate-200 dark:text-slate-700"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 5}
          stroke="currentColor"
          strokeWidth="4"
          fill="none"
          strokeLinecap="round"
          className="text-primary-500"
          style={{
            strokeDasharray,
            strokeDashoffset,
          }}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.span
          className="text-sm font-medium text-slate-900 dark:text-white"
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </div>
  )
}

// Floating Action Button with Ripple Effect
export const FloatingActionButton: React.FC<{
  icon: React.ReactNode
  onClick?: () => void
  className?: string
  rippleColor?: string
}> = ({ icon, onClick, className, rippleColor = 'rgba(255, 255, 255, 0.3)' }) => {
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  const handleClick = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    
    const newRipple = {
      id: Date.now(),
      x,
      y,
    }
    
    setRipples(prev => [...prev, newRipple])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
    
    onClick?.()
  }

  return (
    <motion.button
      className={clsx(
        'relative overflow-hidden rounded-full bg-primary-600 text-white p-4 shadow-lg',
        'hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500',
        className
      )}
      onClick={handleClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            backgroundColor: rippleColor,
          }}
          initial={{ width: 0, height: 0, x: -0, y: -0 }}
          animate={{ width: 100, height: 100, x: -50, y: -50 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        />
      ))}
      {icon}
    </motion.button>
  )
}

// Parallax Scrolling Component
export const ParallaxSection: React.FC<{
  children: React.ReactNode
  speed?: number
  className?: string
}> = ({ children, speed = 0.5, className }) => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start']
  })
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', `${speed * 100}%`])

  return (
    <div ref={ref} className={clsx('relative overflow-hidden', className)}>
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </div>
  )
}

// Stagger Animation Container
export const StaggerContainer: React.FC<{
  children: React.ReactNode
  staggerDelay?: number
  className?: string
}> = ({ children, staggerDelay = 0.1, className }) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <motion.div
      ref={containerRef}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Stagger Animation Item
export const StaggerItem: React.FC<{
  children: React.ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' }
        },
      }}
    >
      {children}
    </motion.div>
  )
}

// Text Reveal Animation
export const TextReveal: React.FC<{
  text: string
  className?: string
  delay?: number
}> = ({ text, className, delay = 0 }) => {
  const words = text.split(' ')
  
  return (
    <div className={className}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          className="inline-block mr-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            delay: delay + index * 0.1,
            duration: 0.5,
            ease: 'easeOut'
          }}
        >
          {word}
        </motion.span>
      ))}
    </div>
  )
}

// 3D Card Hover Effect
export const Card3D: React.FC<{
  children: React.ReactNode
  className?: string
  intensity?: number
}> = ({ children, className, intensity = 20 }) => {
  const ref = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / centerY * intensity
    const rotateY = (centerX - x) / centerX * intensity
    
    ref.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`
  }
  
  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)'
  }
  
  return (
    <motion.div
      ref={ref}
      className={clsx('transition-transform duration-300', className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      whileHover={{ scale: 1.02 }}
    >
      {children}
    </motion.div>
  )
}
