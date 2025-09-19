import { useEffect, useRef, useState, useCallback } from 'react'

// Accessibility hooks and utilities

// 1. Focus Management Hook
export function useFocusManagement() {
  const focusableElementsRef = useRef<HTMLElement[]>([])
  const currentIndexRef = useRef(0)

  const registerFocusableElement = useCallback((element: HTMLElement | null) => {
    if (element && !focusableElementsRef.current.includes(element)) {
      focusableElementsRef.current.push(element)
    }
  }, [])

  const unregisterFocusableElement = useCallback((element: HTMLElement | null) => {
    if (element) {
      const index = focusableElementsRef.current.indexOf(element)
      if (index > -1) {
        focusableElementsRef.current.splice(index, 1)
        if (currentIndexRef.current >= focusableElementsRef.current.length) {
          currentIndexRef.current = Math.max(0, focusableElementsRef.current.length - 1)
        }
      }
    }
  }, [])

  const focusNext = useCallback(() => {
    currentIndexRef.current = (currentIndexRef.current + 1) % focusableElementsRef.current.length
    focusableElementsRef.current[currentIndexRef.current]?.focus()
  }, [])

  const focusPrevious = useCallback(() => {
    currentIndexRef.current = currentIndexRef.current === 0 
      ? focusableElementsRef.current.length - 1 
      : currentIndexRef.current - 1
    focusableElementsRef.current[currentIndexRef.current]?.focus()
  }, [])

  const focusFirst = useCallback(() => {
    if (focusableElementsRef.current.length > 0) {
      currentIndexRef.current = 0
      focusableElementsRef.current[0].focus()
    }
  }, [])

  const focusLast = useCallback(() => {
    if (focusableElementsRef.current.length > 0) {
      currentIndexRef.current = focusableElementsRef.current.length - 1
      focusableElementsRef.current[currentIndexRef.current].focus()
    }
  }, [])

  return {
    registerFocusableElement,
    unregisterFocusableElement,
    focusNext,
    focusPrevious,
    focusFirst,
    focusLast,
  }
}

// 2. ARIA Live Region Hook
export function useAriaLiveRegion() {
  const [announcements, setAnnouncements] = useState<string[]>([])
  const timeoutRef = useRef<NodeJS.Timeout>()

  const announce = useCallback((message: string, priority: 'polite' | 'assertive' = 'polite') => {
    setAnnouncements(prev => [...prev, message])
    
    // Clear after announcement
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    
    timeoutRef.current = setTimeout(() => {
      setAnnouncements([])
    }, 1000)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { announce, announcements }
}

// 3. Keyboard Navigation Hook
export function useKeyboardNavigation(
  onEscape?: () => void,
  onEnter?: () => void,
  onArrowUp?: () => void,
  onArrowDown?: () => void,
  onArrowLeft?: () => void,
  onArrowRight?: () => void,
  onTab?: () => void,
  onShiftTab?: () => void
) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    switch (event.key) {
      case 'Escape':
        onEscape?.()
        break
      case 'Enter':
      case ' ':
        event.preventDefault()
        onEnter?.()
        break
      case 'ArrowUp':
        event.preventDefault()
        onArrowUp?.()
        break
      case 'ArrowDown':
        event.preventDefault()
        onArrowDown?.()
        break
      case 'ArrowLeft':
        event.preventDefault()
        onArrowLeft?.()
        break
      case 'ArrowRight':
        event.preventDefault()
        onArrowRight?.()
        break
      case 'Tab':
        if (event.shiftKey) {
          onShiftTab?.()
        } else {
          onTab?.()
        }
        break
    }
  }, [onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab, onShiftTab])

  return { handleKeyDown }
}

// 4. Screen Reader Announcements Hook
export function useScreenReaderAnnouncements() {
  const [announcements, setAnnouncements] = useState<{
    message: string
    priority: 'polite' | 'assertive'
    timestamp: number
  }[]>([])

  const announce = useCallback((
    message: string, 
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    const announcement = {
      message,
      priority,
      timestamp: Date.now(),
    }
    
    setAnnouncements(prev => [...prev, announcement])
    
    // Remove announcement after 5 seconds
    setTimeout(() => {
      setAnnouncements(prev => 
        prev.filter(a => a.timestamp !== announcement.timestamp)
      )
    }, 5000)
  }, [])

  const clearAnnouncements = useCallback(() => {
    setAnnouncements([])
  }, [])

  return { announcements, announce, clearAnnouncements }
}

// 5. High Contrast Mode Detection Hook
export function useHighContrastMode() {
  const [isHighContrast, setIsHighContrast] = useState(false)

  useEffect(() => {
    const checkHighContrast = () => {
      // Check for Windows High Contrast Mode
      if (window.matchMedia('(-ms-high-contrast: active)').matches) {
        setIsHighContrast(true)
        return
      }

      // Check for forced colors
      if (window.matchMedia('(forced-colors: active)').matches) {
        setIsHighContrast(true)
        return
      }

      // Check for reduced motion preference
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        setIsHighContrast(true)
        return
      }

      setIsHighContrast(false)
    }

    checkHighContrast()

    const mediaQuery = window.matchMedia('(-ms-high-contrast: active), (forced-colors: active)')
    mediaQuery.addEventListener('change', checkHighContrast)

    return () => {
      mediaQuery.removeEventListener('change', checkHighContrast)
    }
  }, [])

  return { isHighContrast }
}

// 6. Reduced Motion Detection Hook
export function useReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setPrefersReducedMotion(mediaQuery.matches)

    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches)
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return { prefersReducedMotion }
}

// 7. Color Scheme Detection Hook
export function useColorScheme() {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark' | 'no-preference'>('no-preference')

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    
    const updateColorScheme = () => {
      if (mediaQuery.matches) {
        setColorScheme('dark')
      } else {
        setColorScheme('light')
      }
    }

    updateColorScheme()
    mediaQuery.addEventListener('change', updateColorScheme)
    
    return () => mediaQuery.removeEventListener('change', updateColorScheme)
  }, [])

  return { colorScheme }
}

// 8. Focus Trap Hook
export function useFocusTrap(isActive: boolean = true) {
  const containerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!isActive || !containerRef.current) return

    const container = containerRef.current
    const focusableElements = container.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    ) as NodeListOf<HTMLElement>

    const firstElement = focusableElements[0]
    const lastElement = focusableElements[focusableElements.length - 1]

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        if (event.shiftKey) {
          if (document.activeElement === firstElement) {
            event.preventDefault()
            lastElement?.focus()
          }
        } else {
          if (document.activeElement === lastElement) {
            event.preventDefault()
            firstElement?.focus()
          }
        }
      }
    }

    container.addEventListener('keydown', handleKeyDown)
    
    // Focus first element when trap becomes active
    firstElement?.focus()

    return () => {
      container.removeEventListener('keydown', handleKeyDown)
    }
  }, [isActive])

  return { containerRef }
}

// 9. Skip Link Hook
export function useSkipLink(targetId: string, label: string = 'Skip to main content') {
  const [isVisible, setIsVisible] = useState(false)

  const handleSkip = useCallback(() => {
    const target = document.getElementById(targetId)
    if (target) {
      target.focus()
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }, [targetId])

  const handleFocus = useCallback(() => {
    setIsVisible(true)
  }, [])

  const handleBlur = useCallback(() => {
    setIsVisible(false)
  }, [])

  return {
    isVisible,
    handleSkip,
    handleFocus,
    handleBlur,
    label,
  }
}

// 10. ARIA Expanded Hook
export function useAriaExpanded(initialState: boolean = false) {
  const [isExpanded, setIsExpanded] = useState(initialState)

  const toggle = useCallback(() => {
    setIsExpanded(prev => !prev)
  }, [])

  const expand = useCallback(() => {
    setIsExpanded(true)
  }, [])

  const collapse = useCallback(() => {
    setIsExpanded(false)
  }, [])

  return {
    isExpanded,
    toggle,
    expand,
    collapse,
    'aria-expanded': isExpanded,
  }
}

// 11. ARIA Selected Hook
export function useAriaSelected(initialState: boolean = false) {
  const [isSelected, setIsSelected] = useState(initialState)

  const toggle = useCallback(() => {
    setIsSelected(prev => !prev)
  }, [])

  const select = useCallback(() => {
    setIsSelected(true)
  }, [])

  const deselect = useCallback(() => {
    setIsSelected(false)
  }, [])

  return {
    isSelected,
    toggle,
    select,
    deselect,
    'aria-selected': isSelected,
  }
}

// 12. ARIA Checked Hook
export function useAriaChecked(initialState: boolean = false) {
  const [isChecked, setIsChecked] = useState(initialState)

  const toggle = useCallback(() => {
    setIsChecked(prev => !prev)
  }, [])

  const check = useCallback(() => {
    setIsChecked(true)
  }, [])

  const uncheck = useCallback(() => {
    setIsChecked(false)
  }, [])

  return {
    isChecked,
    toggle,
    check,
    uncheck,
    'aria-checked': isChecked,
  }
}

// 13. ARIA Disabled Hook
export function useAriaDisabled(initialState: boolean = false) {
  const [isDisabled, setIsDisabled] = useState(initialState)

  const disable = useCallback(() => {
    setIsDisabled(true)
  }, [])

  const enable = useCallback(() => {
    setIsDisabled(false)
  }, [])

  return {
    isDisabled,
    disable,
    enable,
    'aria-disabled': isDisabled,
  }
}

// 14. ARIA Hidden Hook
export function useAriaHidden(initialState: boolean = false) {
  const [isHidden, setIsHidden] = useState(initialState)

  const hide = useCallback(() => {
    setIsHidden(true)
  }, [])

  const show = useCallback(() => {
    setIsHidden(false)
  }, [])

  return {
    isHidden,
    hide,
    show,
    'aria-hidden': isHidden,
  }
}

// 15. ARIA Label Hook
export function useAriaLabel(label: string, description?: string) {
  const ariaProps = {
    'aria-label': label,
    ...(description && { 'aria-describedby': description }),
  }

  return ariaProps
}

// 16. ARIA Live Region Component
export function AriaLiveRegion({ 
  announcements, 
  priority = 'polite' 
}: { 
  announcements: string[]
  priority?: 'polite' | 'assertive'
}) {
  return (
    <div
      aria-live={priority}
      aria-atomic="true"
      className="sr-only"
      role="status"
    >
      {announcements.map((announcement, index) => (
        <div key={index}>{announcement}</div>
      ))}
    </div>
  )
}

// 17. Screen Reader Only Text Component
export function ScreenReaderOnly({ children }: { children: React.ReactNode }) {
  return (
    <span className="sr-only">
      {children}
    </span>
  )
}

// 18. Focus Visible Hook
export function useFocusVisible() {
  const [isFocusVisible, setIsFocusVisible] = useState(false)

  useEffect(() => {
    const handleFocusIn = (event: FocusEvent) => {
      setIsFocusVisible(true)
    }

    const handleFocusOut = (event: FocusEvent) => {
      setIsFocusVisible(false)
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Tab') {
        setIsFocusVisible(true)
      }
    }

    document.addEventListener('focusin', handleFocusIn)
    document.addEventListener('focusout', handleFocusOut)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('focusin', handleFocusIn)
      document.removeEventListener('focusout', handleFocusOut)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  return { isFocusVisible }
}

// 19. ARIA Landmark Hook
export function useAriaLandmark(role: string, label?: string) {
  return {
    role,
    ...(label && { 'aria-label': label }),
  }
}

// 20. Accessibility Announcements Hook
export function useAccessibilityAnnouncements() {
  const [announcements, setAnnouncements] = useState<{
    message: string
    priority: 'polite' | 'assertive'
    timestamp: number
  }[]>([])

  const announce = useCallback((
    message: string,
    priority: 'polite' | 'assertive' = 'polite'
  ) => {
    const announcement = {
      message,
      priority,
      timestamp: Date.now(),
    }
    
    setAnnouncements(prev => [...prev, announcement])
    
    // Remove after 3 seconds
    setTimeout(() => {
      setAnnouncements(prev => 
        prev.filter(a => a.timestamp !== announcement.timestamp)
      )
    }, 3000)
  }, [])

  return { announcements, announce }
}
