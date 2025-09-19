// PWA Service for advanced features
export class PWAService {
  private static instance: PWAService
  private registration: ServiceWorkerRegistration | null = null
  private deferredPrompt: any = null

  private constructor() {
    this.init()
  }

  public static getInstance(): PWAService {
    if (!PWAService.instance) {
      PWAService.instance = new PWAService()
    }
    return PWAService.instance
  }

  private async init() {
    if ('serviceWorker' in navigator) {
      try {
        this.registration = await navigator.serviceWorker.register('/sw.js')
        console.log('Service Worker registered successfully')
      } catch (error) {
        console.error('Service Worker registration failed:', error)
      }
    }

    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      e.preventDefault()
      this.deferredPrompt = e
    })

    // Listen for appinstalled event
    window.addEventListener('appinstalled', () => {
      console.log('PWA was installed')
      this.deferredPrompt = null
    })
  }

  // Install PWA
  public async installPWA(): Promise<boolean> {
    if (!this.deferredPrompt) {
      return false
    }

    try {
      this.deferredPrompt.prompt()
      const { outcome } = await this.deferredPrompt.userChoice
      this.deferredPrompt = null
      return outcome === 'accepted'
    } catch (error) {
      console.error('PWA installation failed:', error)
      return false
    }
  }

  // Check if PWA is installable
  public isInstallable(): boolean {
    return !!this.deferredPrompt
  }

  // Check if PWA is installed
  public isInstalled(): boolean {
    return window.matchMedia('(display-mode: standalone)').matches ||
           (window.navigator as any).standalone === true
  }

  // Background Sync
  public async registerBackgroundSync(tag: string, data?: any): Promise<void> {
    if (!this.registration) {
      throw new Error('Service Worker not registered')
    }

    try {
      await this.registration.sync.register(tag)
      if (data) {
        // Store data for background sync
        const cache = await caches.open('background-sync')
        await cache.put(`sync-${tag}`, new Response(JSON.stringify(data)))
      }
    } catch (error) {
      console.error('Background sync registration failed:', error)
    }
  }

  // Push Notifications
  public async requestNotificationPermission(): Promise<NotificationPermission> {
    if (!('Notification' in window)) {
      throw new Error('This browser does not support notifications')
    }

    if (Notification.permission === 'granted') {
      return 'granted'
    }

    if (Notification.permission === 'denied') {
      return 'denied'
    }

    const permission = await Notification.requestPermission()
    return permission
  }

  public async sendNotification(title: string, options?: NotificationOptions): Promise<void> {
    if (Notification.permission !== 'granted') {
      throw new Error('Notification permission not granted')
    }

    const notification = new Notification(title, {
      icon: '/pwa-192x192.png',
      badge: '/pwa-192x192.png',
      ...options,
    })

    notification.onclick = () => {
      window.focus()
      notification.close()
    }
  }

  // Periodic Background Sync
  public async registerPeriodicSync(tag: string, minInterval: number): Promise<void> {
    if (!this.registration) {
      throw new Error('Service Worker not registered')
    }

    try {
      await this.registration.periodicSync.register(tag, {
        minInterval: minInterval * 60 * 1000, // Convert minutes to milliseconds
      })
    } catch (error) {
      console.error('Periodic sync registration failed:', error)
    }
  }

  // Cache Management
  public async clearCache(): Promise<void> {
    const cacheNames = await caches.keys()
    await Promise.all(
      cacheNames.map(cacheName => caches.delete(cacheName))
    )
  }

  public async getCacheSize(): Promise<number> {
    const cacheNames = await caches.keys()
    let totalSize = 0

    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName)
      const requests = await cache.keys()
      
      for (const request of requests) {
        const response = await cache.match(request)
        if (response) {
          const blob = await response.blob()
          totalSize += blob.size
        }
      }
    }

    return totalSize
  }

  // Offline Detection
  public isOnline(): boolean {
    return navigator.onLine
  }

  public onOnlineStatusChange(callback: (isOnline: boolean) => void): () => void {
    const handleOnline = () => callback(true)
    const handleOffline = () => callback(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }

  // Share API
  public async share(data: ShareData): Promise<void> {
    if (!navigator.share) {
      throw new Error('Web Share API not supported')
    }

    try {
      await navigator.share(data)
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Share failed:', error)
      }
    }
  }

  // File System Access API
  public async saveFile(content: string, filename: string, type: string = 'text/plain'): Promise<void> {
    if (!('showSaveFilePicker' in window)) {
      // Fallback to download
      const blob = new Blob([content], { type })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = filename
      a.click()
      URL.revokeObjectURL(url)
      return
    }

    try {
      const fileHandle = await (window as any).showSaveFilePicker({
        suggestedName: filename,
        types: [{
          description: 'Text files',
          accept: { [type]: [`.${filename.split('.').pop()}`] },
        }],
      })
      
      const writable = await fileHandle.createWritable()
      await writable.write(content)
      await writable.close()
    } catch (error) {
      console.error('File save failed:', error)
    }
  }

  // Wake Lock API
  public async requestWakeLock(): Promise<WakeLockSentinel | null> {
    if (!('wakeLock' in navigator)) {
      return null
    }

    try {
      const wakeLock = await (navigator as any).wakeLock.request('screen')
      return wakeLock
    } catch (error) {
      console.error('Wake lock request failed:', error)
      return null
    }
  }

  // Device Orientation
  public async requestDeviceOrientation(): Promise<DeviceOrientationEvent | null> {
    if (!('DeviceOrientationEvent' in window)) {
      return null
    }

    return new Promise((resolve) => {
      const handleOrientation = (event: DeviceOrientationEvent) => {
        window.removeEventListener('deviceorientation', handleOrientation)
        resolve(event)
      }

      window.addEventListener('deviceorientation', handleOrientation)
      
      // Timeout after 5 seconds
      setTimeout(() => {
        window.removeEventListener('deviceorientation', handleOrientation)
        resolve(null)
      }, 5000)
    })
  }

  // Vibration API
  public vibrate(pattern: number | number[]): void {
    if ('vibrate' in navigator) {
      navigator.vibrate(pattern)
    }
  }

  // Battery API
  public async getBatteryInfo(): Promise<BatteryManager | null> {
    if (!('getBattery' in navigator)) {
      return null
    }

    try {
      const battery = await (navigator as any).getBattery()
      return battery
    } catch (error) {
      console.error('Battery API failed:', error)
      return null
    }
  }

  // Network Information
  public getNetworkInfo(): any {
    if (!('connection' in navigator)) {
      return null
    }

    const connection = (navigator as any).connection
    return {
      effectiveType: connection.effectiveType,
      downlink: connection.downlink,
      rtt: connection.rtt,
      saveData: connection.saveData,
    }
  }

  // Storage Quota
  public async getStorageQuota(): Promise<{ quota: number; usage: number } | null> {
    if (!('storage' in navigator) || !('estimate' in navigator.storage)) {
      return null
    }

    try {
      const estimate = await navigator.storage.estimate()
      return {
        quota: estimate.quota || 0,
        usage: estimate.usage || 0,
      }
    } catch (error) {
      console.error('Storage quota failed:', error)
      return null
    }
  }
}

// Export singleton instance
export const pwaService = PWAService.getInstance()
