import { useEffect, useRef, useCallback } from 'react'
import { useAppStore } from '@/store'

interface WebSocketMessage {
  type: string
  data: any
  timestamp: number
}

export const useWebSocket = (url: string) => {
  const wsRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const reconnectAttempts = useRef(0)
  const maxReconnectAttempts = 5
  const baseReconnectDelay = 1000

  const { setConnectionStatus, updateRealTimeData, addNotification } = useAppStore()

  const connect = useCallback(() => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      return
    }

    try {
      setConnectionStatus('connecting')
      wsRef.current = new WebSocket(url)

      wsRef.current.onopen = () => {
        console.log('WebSocket connected')
        setConnectionStatus('connected')
        reconnectAttempts.current = 0
        addNotification({
          type: 'success',
          title: 'Connection Established',
          message: 'Real-time connection is now active',
        })
      }

      wsRef.current.onmessage = (event) => {
        try {
          const message: WebSocketMessage = JSON.parse(event.data)
          
          // Update real-time data based on message type
          switch (message.type) {
            case 'metrics_update':
              updateRealTimeData('metrics', message.data)
              break
            case 'activity_update':
              updateRealTimeData('activity', message.data)
              break
            case 'system_status':
              updateRealTimeData('systemStatus', message.data)
              break
            default:
              updateRealTimeData(message.type, message.data)
          }
        } catch (error) {
          console.error('Error parsing WebSocket message:', error)
        }
      }

      wsRef.current.onclose = (event) => {
        console.log('WebSocket disconnected:', event.code, event.reason)
        setConnectionStatus('disconnected')
        
        if (!event.wasClean && reconnectAttempts.current < maxReconnectAttempts) {
          const delay = baseReconnectDelay * Math.pow(2, reconnectAttempts.current)
          reconnectTimeoutRef.current = setTimeout(() => {
            reconnectAttempts.current++
            connect()
          }, delay)
        } else if (reconnectAttempts.current >= maxReconnectAttempts) {
          setConnectionStatus('error')
          addNotification({
            type: 'error',
            title: 'Connection Failed',
            message: 'Unable to establish real-time connection after multiple attempts',
          })
        }
      }

      wsRef.current.onerror = (error) => {
        console.error('WebSocket error:', error)
        setConnectionStatus('error')
        addNotification({
          type: 'error',
          title: 'Connection Error',
          message: 'An error occurred with the real-time connection',
        })
      }
    } catch (error) {
      console.error('Failed to create WebSocket connection:', error)
      setConnectionStatus('error')
    }
  }, [url, setConnectionStatus, updateRealTimeData, addNotification])

  const disconnect = useCallback(() => {
    if (reconnectTimeoutRef.current) {
      clearTimeout(reconnectTimeoutRef.current)
      reconnectTimeoutRef.current = null
    }
    
    if (wsRef.current) {
      wsRef.current.close(1000, 'Manual disconnect')
      wsRef.current = null
    }
    
    setConnectionStatus('disconnected')
  }, [setConnectionStatus])

  const sendMessage = useCallback((message: Omit<WebSocketMessage, 'timestamp'>) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify({
        ...message,
        timestamp: Date.now(),
      }))
    } else {
      console.warn('WebSocket is not connected. Cannot send message.')
    }
  }, [])

  useEffect(() => {
    connect()
    
    return () => {
      disconnect()
    }
  }, [connect, disconnect])

  return {
    connectionStatus: useAppStore((state) => state.connectionStatus),
    sendMessage,
    connect,
    disconnect,
  }
}
