import { create } from 'zustand'
import { devtools, subscribeWithSelector } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'
import { persist, createJSONStorage } from 'zustand/middleware'

// Advanced State Management Patterns

// 1. Command Pattern for Undo/Redo
interface Command {
  execute(): void
  undo(): void
  description: string
}

interface CommandState {
  history: Command[]
  currentIndex: number
  maxHistorySize: number
  executeCommand: (command: Command) => void
  undo: () => void
  redo: () => void
  canUndo: boolean
  canRedo: boolean
  clearHistory: () => void
}

export const useCommandStore = create<CommandState>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        history: [],
        currentIndex: -1,
        maxHistorySize: 50,
        
        executeCommand: (command: Command) => {
          set((state) => {
            // Remove any commands after current index
            state.history = state.history.slice(0, state.currentIndex + 1)
            
            // Add new command
            state.history.push(command)
            state.currentIndex++
            
            // Limit history size
            if (state.history.length > state.maxHistorySize) {
              state.history.shift()
              state.currentIndex--
            }
            
            // Execute command
            command.execute()
          })
        },
        
        undo: () => {
          const { history, currentIndex } = get()
          if (currentIndex >= 0) {
            const command = history[currentIndex]
            command.undo()
            set((state) => {
              state.currentIndex--
            })
          }
        },
        
        redo: () => {
          const { history, currentIndex } = get()
          if (currentIndex < history.length - 1) {
            set((state) => {
              state.currentIndex++
            })
            const command = history[currentIndex + 1]
            command.execute()
          }
        },
        
        get canUndo() {
          return get().currentIndex >= 0
        },
        
        get canRedo() {
          const { history, currentIndex } = get()
          return currentIndex < history.length - 1
        },
        
        clearHistory: () => {
          set((state) => {
            state.history = []
            state.currentIndex = -1
          })
        },
      }))
    ),
    { name: 'command-store' }
  )
)

// 2. Observer Pattern for Event System
type EventCallback = (data: any) => void

interface EventState {
  listeners: Map<string, Set<EventCallback>>
  subscribe: (event: string, callback: EventCallback) => () => void
  emit: (event: string, data?: any) => void
  unsubscribe: (event: string, callback: EventCallback) => void
  clear: () => void
}

export const useEventStore = create<EventState>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        listeners: new Map(),
        
        subscribe: (event: string, callback: EventCallback) => {
          set((state) => {
            if (!state.listeners.has(event)) {
              state.listeners.set(event, new Set())
            }
            state.listeners.get(event)!.add(callback)
          })
          
          // Return unsubscribe function
          return () => {
            get().unsubscribe(event, callback)
          }
        },
        
        emit: (event: string, data?: any) => {
          const { listeners } = get()
          const eventListeners = listeners.get(event)
          if (eventListeners) {
            eventListeners.forEach(callback => callback(data))
          }
        },
        
        unsubscribe: (event: string, callback: EventCallback) => {
          set((state) => {
            const eventListeners = state.listeners.get(event)
            if (eventListeners) {
              eventListeners.delete(callback)
              if (eventListeners.size === 0) {
                state.listeners.delete(event)
              }
            }
          })
        },
        
        clear: () => {
          set((state) => {
            state.listeners.clear()
          })
        },
      }))
    ),
    { name: 'event-store' }
  )
)

// 3. State Machine Pattern
type StateMachineState = 'idle' | 'loading' | 'success' | 'error'
type StateMachineEvent = 'start' | 'success' | 'error' | 'reset'

interface StateMachineConfig {
  [key: string]: {
    [key: string]: StateMachineState
  }
}

const stateMachineConfig: StateMachineConfig = {
  idle: {
    start: 'loading',
  },
  loading: {
    success: 'success',
    error: 'error',
  },
  success: {
    start: 'loading',
    reset: 'idle',
  },
  error: {
    start: 'loading',
    reset: 'idle',
  },
}

interface StateMachineStore {
  currentState: StateMachineState
  transition: (event: StateMachineEvent) => boolean
  canTransition: (event: StateMachineEvent) => boolean
  reset: () => void
}

export const useStateMachineStore = create<StateMachineStore>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        currentState: 'idle',
        
        transition: (event: StateMachineEvent) => {
          const { currentState } = get()
          const nextState = stateMachineConfig[currentState]?.[event]
          
          if (nextState) {
            set((state) => {
              state.currentState = nextState
            })
            return true
          }
          return false
        },
        
        canTransition: (event: StateMachineEvent) => {
          const { currentState } = get()
          return !!stateMachineConfig[currentState]?.[event]
        },
        
        reset: () => {
          set((state) => {
            state.currentState = 'idle'
          })
        },
      }))
    ),
    { name: 'state-machine-store' }
  )
)

// 4. Cache Pattern with TTL
interface CacheItem<T> {
  data: T
  timestamp: number
  ttl: number
}

interface CacheStore {
  cache: Map<string, CacheItem<any>>
  set: <T>(key: string, data: T, ttl?: number) => void
  get: <T>(key: string) => T | null
  has: (key: string) => boolean
  delete: (key: string) => boolean
  clear: () => void
  cleanup: () => void
}

export const useCacheStore = create<CacheStore>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        cache: new Map(),
        
        set: <T>(key: string, data: T, ttl: number = 5 * 60 * 1000) => {
          set((state) => {
            state.cache.set(key, {
              data,
              timestamp: Date.now(),
              ttl,
            })
          })
        },
        
        get: <T>(key: string): T | null => {
          const { cache } = get()
          const item = cache.get(key)
          
          if (!item) return null
          
          const now = Date.now()
          if (now - item.timestamp > item.ttl) {
            set((state) => {
              state.cache.delete(key)
            })
            return null
          }
          
          return item.data
        },
        
        has: (key: string) => {
          const { cache } = get()
          const item = cache.get(key)
          if (!item) return false
          
          const now = Date.now()
          if (now - item.timestamp > item.ttl) {
            set((state) => {
              state.cache.delete(key)
            })
            return false
          }
          
          return true
        },
        
        delete: (key: string) => {
          const { cache } = get()
          return cache.delete(key)
        },
        
        clear: () => {
          set((state) => {
            state.cache.clear()
          })
        },
        
        cleanup: () => {
          const now = Date.now()
          set((state) => {
            for (const [key, item] of state.cache.entries()) {
              if (now - item.timestamp > item.ttl) {
                state.cache.delete(key)
              }
            }
          })
        },
      }))
    ),
    { name: 'cache-store' }
  )
)

// 5. Repository Pattern for Data Management
interface Repository<T> {
  findById: (id: string) => T | null
  findAll: () => T[]
  create: (item: Omit<T, 'id'>) => T
  update: (id: string, updates: Partial<T>) => T | null
  delete: (id: string) => boolean
  search: (query: string, fields: (keyof T)[]) => T[]
}

interface RepositoryStore {
  repositories: Map<string, Repository<any>>
  createRepository: <T>(name: string, initialData?: T[]) => Repository<T>
  getRepository: <T>(name: string) => Repository<T> | null
  clearRepository: (name: string) => void
}

export const useRepositoryStore = create<RepositoryStore>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        repositories: new Map(),
        
        createRepository: <T>(name: string, initialData: T[] = []) => {
          const data = new Map<string, T>()
          initialData.forEach((item, index) => {
            data.set(index.toString(), { ...item, id: index.toString() } as T)
          })
          
          const repository: Repository<T> = {
            findById: (id: string) => data.get(id) || null,
            findAll: () => Array.from(data.values()),
            create: (item: Omit<T, 'id'>) => {
              const id = Date.now().toString()
              const newItem = { ...item, id } as T
              data.set(id, newItem)
              return newItem
            },
            update: (id: string, updates: Partial<T>) => {
              const item = data.get(id)
              if (item) {
                const updatedItem = { ...item, ...updates } as T
                data.set(id, updatedItem)
                return updatedItem
              }
              return null
            },
            delete: (id: string) => data.delete(id),
            search: (query: string, fields: (keyof T)[]) => {
              const results: T[] = []
              const lowerQuery = query.toLowerCase()
              
              for (const item of data.values()) {
                const matches = fields.some(field => {
                  const value = item[field]
                  return value && value.toString().toLowerCase().includes(lowerQuery)
                })
                if (matches) {
                  results.push(item)
                }
              }
              
              return results
            },
          }
          
          set((state) => {
            state.repositories.set(name, repository)
          })
          
          return repository
        },
        
        getRepository: <T>(name: string) => {
          const { repositories } = get()
          return repositories.get(name) as Repository<T> | null
        },
        
        clearRepository: (name: string) => {
          set((state) => {
            state.repositories.delete(name)
          })
        },
      }))
    ),
    { name: 'repository-store' }
  )
)

// 6. Middleware Pattern
type Middleware<T> = (state: T, action: any, next: (state: T, action: any) => T) => T

interface MiddlewareStore {
  middlewares: Middleware<any>[]
  addMiddleware: (middleware: Middleware<any>) => void
  removeMiddleware: (middleware: Middleware<any>) => void
  applyMiddlewares: <T>(state: T, action: any, reducer: (state: T, action: any) => T) => T
}

export const useMiddlewareStore = create<MiddlewareStore>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        middlewares: [],
        
        addMiddleware: (middleware: Middleware<any>) => {
          set((state) => {
            state.middlewares.push(middleware)
          })
        },
        
        removeMiddleware: (middleware: Middleware<any>) => {
          set((state) => {
            const index = state.middlewares.indexOf(middleware)
            if (index > -1) {
              state.middlewares.splice(index, 1)
            }
          })
        },
        
        applyMiddlewares: <T>(state: T, action: any, reducer: (state: T, action: any) => T) => {
          const { middlewares } = get()
          
          let currentState = state
          let currentReducer = reducer
          
          // Apply middlewares in reverse order
          for (let i = middlewares.length - 1; i >= 0; i--) {
            const middleware = middlewares[i]
            const nextReducer = currentReducer
            currentReducer = (state: T, action: any) => 
              middleware(state, action, nextReducer)
          }
          
          return currentReducer(currentState, action)
        },
      }))
    ),
    { name: 'middleware-store' }
  )
)

// 7. Selector Pattern for Computed Values
export const createSelector = <T, R>(
  selectors: ((state: T) => any)[],
  combiner: (...args: any[]) => R
) => {
  return (state: T): R => {
    const values = selectors.map(selector => selector(state))
    return combiner(...values)
  }
}

// 8. Subscription Pattern for Reactive Updates
interface Subscription {
  id: string
  callback: (data: any) => void
  selector?: (state: any) => any
  unsubscribe: () => void
}

interface SubscriptionStore {
  subscriptions: Map<string, Subscription>
  subscribe: (id: string, callback: (data: any) => void, selector?: (state: any) => any) => () => void
  notify: (id: string, data: any) => void
  notifyAll: (data: any) => void
  unsubscribe: (id: string) => void
  clear: () => void
}

export const useSubscriptionStore = create<SubscriptionStore>()(
  devtools(
    subscribeWithSelector(
      immer((set, get) => ({
        subscriptions: new Map(),
        
        subscribe: (id: string, callback: (data: any) => void, selector?: (state: any) => any) => {
          const unsubscribe = () => {
            set((state) => {
              state.subscriptions.delete(id)
            })
          }
          
          set((state) => {
            state.subscriptions.set(id, {
              id,
              callback,
              selector,
              unsubscribe,
            })
          })
          
          return unsubscribe
        },
        
        notify: (id: string, data: any) => {
          const { subscriptions } = get()
          const subscription = subscriptions.get(id)
          if (subscription) {
            subscription.callback(data)
          }
        },
        
        notifyAll: (data: any) => {
          const { subscriptions } = get()
          subscriptions.forEach(subscription => {
            subscription.callback(data)
          })
        },
        
        unsubscribe: (id: string) => {
          set((state) => {
            state.subscriptions.delete(id)
          })
        },
        
        clear: () => {
          set((state) => {
            state.subscriptions.clear()
          })
        },
      }))
    ),
    { name: 'subscription-store' }
  )
)
