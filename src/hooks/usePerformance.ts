import { useCallback, useMemo, useRef, useEffect, useState } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

// Performance optimization hooks

// 1. Debounced Value Hook
export function useDebouncedValue<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}

// 2. Throttled Callback Hook
export function useThrottledCallback<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
): T {
  const lastRun = useRef(Date.now())

  return useCallback(
    ((...args: any[]) => {
      if (Date.now() - lastRun.current >= delay) {
        callback(...args)
        lastRun.current = Date.now()
      }
    }) as T,
    [callback, delay]
  )
}

// 3. Memoized Selector Hook
export function useMemoizedSelector<T, R>(
  selector: (state: T) => R,
  state: T,
  deps: any[] = []
): R {
  return useMemo(() => selector(state), [selector, state, ...deps])
}

// 4. Virtual Scrolling Hook
export function useVirtualScrolling<T>({
  items,
  itemHeight,
  containerHeight,
  overscan = 5,
}: {
  items: T[]
  itemHeight: number
  containerHeight: number
  overscan?: number
}) {
  const parentRef = useRef<HTMLDivElement>(null)

  const virtualizer = useVirtualizer({
    count: items.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => itemHeight,
    overscan,
  })

  return {
    parentRef,
    virtualizer,
    virtualItems: virtualizer.getVirtualItems(),
    totalSize: virtualizer.getTotalSize(),
  }
}

// 5. Intersection Observer Hook for Lazy Loading
export function useIntersectionObserver(
  elementRef: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasIntersected, setHasIntersected] = useState(false)

  useEffect(() => {
    const element = elementRef.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true)
        }
      },
      options
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [elementRef, options, hasIntersected])

  return { isIntersecting, hasIntersected }
}

// 6. Performance Monitor Hook
export function usePerformanceMonitor() {
  const [metrics, setMetrics] = useState<{
    renderTime: number
    memoryUsage: number
    fps: number
  }>({
    renderTime: 0,
    memoryUsage: 0,
    fps: 0,
  })

  const measureRender = useCallback((fn: () => void) => {
    const start = performance.now()
    fn()
    const end = performance.now()
    setMetrics(prev => ({ ...prev, renderTime: end - start }))
  }, [])

  useEffect(() => {
    const measureMemory = () => {
      if ('memory' in performance) {
        const memory = (performance as any).memory
        setMetrics(prev => ({
          ...prev,
          memoryUsage: memory.usedJSHeapSize / memory.jsHeapSizeLimit,
        }))
      }
    }

    const measureFPS = () => {
      let lastTime = performance.now()
      let frameCount = 0

      const tick = () => {
        frameCount++
        const currentTime = performance.now()
        
        if (currentTime - lastTime >= 1000) {
          setMetrics(prev => ({ ...prev, fps: frameCount }))
          frameCount = 0
          lastTime = currentTime
        }
        
        requestAnimationFrame(tick)
      }

      requestAnimationFrame(tick)
    }

    measureMemory()
    measureFPS()

    const interval = setInterval(measureMemory, 1000)
    return () => clearInterval(interval)
  }, [])

  return { metrics, measureRender }
}

// 7. Batch Updates Hook
export function useBatchedUpdates() {
  const updatesRef = useRef<(() => void)[]>([])
  const timeoutRef = useRef<NodeJS.Timeout>()

  const batchUpdate = useCallback((update: () => void) => {
    updatesRef.current.push(update)

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }

    timeoutRef.current = setTimeout(() => {
      const updates = updatesRef.current
      updatesRef.current = []
      
      // Batch all updates
      React.unstable_batchedUpdates(() => {
        updates.forEach(update => update())
      })
    }, 0)
  }, [])

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { batchUpdate }
}

// 8. Memoized Callback with Dependencies
export function useStableCallback<T extends (...args: any[]) => any>(
  callback: T,
  deps: any[]
): T {
  const callbackRef = useRef(callback)
  const depsRef = useRef(deps)

  // Update callback if dependencies changed
  if (depsRef.current.length !== deps.length || 
      depsRef.current.some((dep, index) => dep !== deps[index])) {
    callbackRef.current = callback
    depsRef.current = deps
  }

  return useCallback(
    ((...args: any[]) => callbackRef.current(...args)) as T,
    []
  )
}

// 9. Lazy Loading Hook
export function useLazyLoading<T>(
  loadFn: () => Promise<T[]>,
  dependencies: any[] = []
) {
  const [data, setData] = useState<T[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [hasLoaded, setHasLoaded] = useState(false)

  const load = useCallback(async () => {
    if (hasLoaded || loading) return

    setLoading(true)
    setError(null)

    try {
      const result = await loadFn()
      setData(result)
      setHasLoaded(true)
    } catch (err) {
      setError(err as Error)
    } finally {
      setLoading(false)
    }
  }, [loadFn, hasLoaded, loading, ...dependencies])

  const reload = useCallback(() => {
    setHasLoaded(false)
    setData([])
    load()
  }, [load])

  return { data, loading, error, load, reload, hasLoaded }
}

// 10. Resource Pool Hook
export function useResourcePool<T>(
  createResource: () => T,
  maxSize: number = 10
) {
  const poolRef = useRef<T[]>([])
  const inUseRef = useRef<Set<T>>(new Set())

  const acquire = useCallback((): T => {
    let resource = poolRef.current.pop()
    
    if (!resource) {
      resource = createResource()
    }
    
    inUseRef.current.add(resource)
    return resource
  }, [createResource])

  const release = useCallback((resource: T) => {
    if (inUseRef.current.has(resource)) {
      inUseRef.current.delete(resource)
      
      if (poolRef.current.length < maxSize) {
        poolRef.current.push(resource)
      }
    }
  }, [maxSize])

  const clear = useCallback(() => {
    poolRef.current = []
    inUseRef.current.clear()
  }, [])

  return { acquire, release, clear }
}

// 11. Performance Profiler Hook
export function useProfiler(name: string) {
  const startTimeRef = useRef<number>()
  const [measurements, setMeasurements] = useState<number[]>([])

  const start = useCallback(() => {
    startTimeRef.current = performance.now()
  }, [])

  const end = useCallback(() => {
    if (startTimeRef.current) {
      const duration = performance.now() - startTimeRef.current
      setMeasurements(prev => [...prev, duration])
      startTimeRef.current = undefined
    }
  }, [])

  const measure = useCallback((fn: () => void) => {
    start()
    fn()
    end()
  }, [start, end])

  const getAverage = useCallback(() => {
    if (measurements.length === 0) return 0
    return measurements.reduce((sum, measurement) => sum + measurement, 0) / measurements.length
  }, [measurements])

  const getMin = useCallback(() => {
    return measurements.length > 0 ? Math.min(...measurements) : 0
  }, [measurements])

  const getMax = useCallback(() => {
    return measurements.length > 0 ? Math.max(...measurements) : 0
  }, [measurements])

  const clear = useCallback(() => {
    setMeasurements([])
  }, [])

  return {
    start,
    end,
    measure,
    measurements,
    average: getAverage(),
    min: getMin(),
    max: getMax(),
    clear,
  }
}

// 12. Web Worker Hook
export function useWebWorker(workerScript: string) {
  const workerRef = useRef<Worker | null>(null)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const worker = new Worker(workerScript)
    workerRef.current = worker

    worker.onmessage = () => {
      setIsReady(true)
    }

    return () => {
      worker.terminate()
      workerRef.current = null
    }
  }, [workerScript])

  const postMessage = useCallback((message: any) => {
    if (workerRef.current) {
      workerRef.current.postMessage(message)
    }
  }, [])

  const onMessage = useCallback((callback: (event: MessageEvent) => void) => {
    if (workerRef.current) {
      workerRef.current.onmessage = callback
    }
  }, [])

  return { postMessage, onMessage, isReady }
}

// 13. Request Deduplication Hook
export function useRequestDeduplication() {
  const pendingRequestsRef = useRef<Map<string, Promise<any>>>(new Map())

  const deduplicate = useCallback(<T>(
    key: string,
    requestFn: () => Promise<T>
  ): Promise<T> => {
    const pending = pendingRequestsRef.current.get(key)
    
    if (pending) {
      return pending
    }

    const promise = requestFn().finally(() => {
      pendingRequestsRef.current.delete(key)
    })

    pendingRequestsRef.current.set(key, promise)
    return promise
  }, [])

  return { deduplicate }
}

// 14. Cache with LRU Eviction Hook
export function useLRUCache<K, V>(maxSize: number = 100) {
  const cacheRef = useRef<Map<K, V>>(new Map())
  const accessOrderRef = useRef<K[]>([])

  const get = useCallback((key: K): V | undefined => {
    const value = cacheRef.current.get(key)
    
    if (value !== undefined) {
      // Move to end (most recently used)
      const index = accessOrderRef.current.indexOf(key)
      if (index > -1) {
        accessOrderRef.current.splice(index, 1)
      }
      accessOrderRef.current.push(key)
    }
    
    return value
  }, [])

  const set = useCallback((key: K, value: V) => {
    // Remove if already exists
    if (cacheRef.current.has(key)) {
      const index = accessOrderRef.current.indexOf(key)
      if (index > -1) {
        accessOrderRef.current.splice(index, 1)
      }
    }

    // Add new entry
    cacheRef.current.set(key, value)
    accessOrderRef.current.push(key)

    // Evict if over capacity
    while (cacheRef.current.size > maxSize) {
      const oldestKey = accessOrderRef.current.shift()!
      cacheRef.current.delete(oldestKey)
    }
  }, [maxSize])

  const clear = useCallback(() => {
    cacheRef.current.clear()
    accessOrderRef.current = []
  }, [])

  return { get, set, clear, size: cacheRef.current.size }
}
