import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      analytics: 'Analytics',
      users: 'Users',
      settings: 'Settings',
      profile: 'Profile',
      notifications: 'Notifications',
      
      // Dashboard
      welcome: 'Welcome back',
      overview: 'Overview',
      metrics: 'Metrics',
      recentActivity: 'Recent Activity',
      quickActions: 'Quick Actions',
      
      // Metrics
      totalUsers: 'Total Users',
      activeSessions: 'Active Sessions',
      revenue: 'Revenue',
      conversionRate: 'Conversion Rate',
      bounceRate: 'Bounce Rate',
      avgSessionDuration: 'Avg Session Duration',
      
      // Actions
      refresh: 'Refresh',
      export: 'Export',
      filter: 'Filter',
      search: 'Search',
      save: 'Save',
      cancel: 'Cancel',
      delete: 'Delete',
      edit: 'Edit',
      view: 'View',
      
      // Status
      loading: 'Loading...',
      error: 'Error',
      success: 'Success',
      warning: 'Warning',
      info: 'Information',
      
      // Time
      now: 'Now',
      minutesAgo: '{{count}} minutes ago',
      hoursAgo: '{{count}} hours ago',
      daysAgo: '{{count}} days ago',
      
      // Common
      noData: 'No data available',
      retry: 'Retry',
      close: 'Close',
      open: 'Open',
      toggle: 'Toggle',
    }
  },
  es: {
    translation: {
      // Navigation
      dashboard: 'Panel de Control',
      analytics: 'Analíticas',
      users: 'Usuarios',
      settings: 'Configuración',
      profile: 'Perfil',
      notifications: 'Notificaciones',
      
      // Dashboard
      welcome: 'Bienvenido de nuevo',
      overview: 'Resumen',
      metrics: 'Métricas',
      recentActivity: 'Actividad Reciente',
      quickActions: 'Acciones Rápidas',
      
      // Metrics
      totalUsers: 'Usuarios Totales',
      activeSessions: 'Sesiones Activas',
      revenue: 'Ingresos',
      conversionRate: 'Tasa de Conversión',
      bounceRate: 'Tasa de Rebote',
      avgSessionDuration: 'Duración Promedio de Sesión',
      
      // Actions
      refresh: 'Actualizar',
      export: 'Exportar',
      filter: 'Filtrar',
      search: 'Buscar',
      save: 'Guardar',
      cancel: 'Cancelar',
      delete: 'Eliminar',
      edit: 'Editar',
      view: 'Ver',
      
      // Status
      loading: 'Cargando...',
      error: 'Error',
      success: 'Éxito',
      warning: 'Advertencia',
      info: 'Información',
      
      // Time
      now: 'Ahora',
      minutesAgo: 'Hace {{count}} minutos',
      hoursAgo: 'Hace {{count}} horas',
      daysAgo: 'Hace {{count}} días',
      
      // Common
      noData: 'No hay datos disponibles',
      retry: 'Reintentar',
      close: 'Cerrar',
      open: 'Abrir',
      toggle: 'Alternar',
    }
  },
  fr: {
    translation: {
      // Navigation
      dashboard: 'Tableau de Bord',
      analytics: 'Analytiques',
      users: 'Utilisateurs',
      settings: 'Paramètres',
      profile: 'Profil',
      notifications: 'Notifications',
      
      // Dashboard
      welcome: 'Bon retour',
      overview: 'Aperçu',
      metrics: 'Métriques',
      recentActivity: 'Activité Récente',
      quickActions: 'Actions Rapides',
      
      // Metrics
      totalUsers: 'Utilisateurs Totaux',
      activeSessions: 'Sessions Actives',
      revenue: 'Revenus',
      conversionRate: 'Taux de Conversion',
      bounceRate: 'Taux de Rebond',
      avgSessionDuration: 'Durée Moyenne de Session',
      
      // Actions
      refresh: 'Actualiser',
      export: 'Exporter',
      filter: 'Filtrer',
      search: 'Rechercher',
      save: 'Sauvegarder',
      cancel: 'Annuler',
      delete: 'Supprimer',
      edit: 'Modifier',
      view: 'Voir',
      
      // Status
      loading: 'Chargement...',
      error: 'Erreur',
      success: 'Succès',
      warning: 'Avertissement',
      info: 'Information',
      
      // Time
      now: 'Maintenant',
      minutesAgo: 'Il y a {{count}} minutes',
      hoursAgo: 'Il y a {{count}} heures',
      daysAgo: 'Il y a {{count}} jours',
      
      // Common
      noData: 'Aucune donnée disponible',
      retry: 'Réessayer',
      close: 'Fermer',
      open: 'Ouvrir',
      toggle: 'Basculer',
    }
  },
  de: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      analytics: 'Analysen',
      users: 'Benutzer',
      settings: 'Einstellungen',
      profile: 'Profil',
      notifications: 'Benachrichtigungen',
      
      // Dashboard
      welcome: 'Willkommen zurück',
      overview: 'Übersicht',
      metrics: 'Metriken',
      recentActivity: 'Letzte Aktivität',
      quickActions: 'Schnellaktionen',
      
      // Metrics
      totalUsers: 'Gesamtbenutzer',
      activeSessions: 'Aktive Sitzungen',
      revenue: 'Umsatz',
      conversionRate: 'Konversionsrate',
      bounceRate: 'Absprungrate',
      avgSessionDuration: 'Durchschn. Sitzungsdauer',
      
      // Actions
      refresh: 'Aktualisieren',
      export: 'Exportieren',
      filter: 'Filtern',
      search: 'Suchen',
      save: 'Speichern',
      cancel: 'Abbrechen',
      delete: 'Löschen',
      edit: 'Bearbeiten',
      view: 'Anzeigen',
      
      // Status
      loading: 'Laden...',
      error: 'Fehler',
      success: 'Erfolg',
      warning: 'Warnung',
      info: 'Information',
      
      // Time
      now: 'Jetzt',
      minutesAgo: 'vor {{count}} Minuten',
      hoursAgo: 'vor {{count}} Stunden',
      daysAgo: 'vor {{count}} Tagen',
      
      // Common
      noData: 'Keine Daten verfügbar',
      retry: 'Wiederholen',
      close: 'Schließen',
      open: 'Öffnen',
      toggle: 'Umschalten',
    }
  },
  it: {
    translation: {
      // Navigation
      dashboard: 'Dashboard',
      analytics: 'Analisi',
      users: 'Utenti',
      settings: 'Impostazioni',
      profile: 'Profilo',
      notifications: 'Notifiche',
      
      // Dashboard
      welcome: 'Bentornato',
      overview: 'Panoramica',
      metrics: 'Metriche',
      recentActivity: 'Attività Recente',
      quickActions: 'Azioni Rapide',
      
      // Metrics
      totalUsers: 'Utenti Totali',
      activeSessions: 'Sessioni Attive',
      revenue: 'Ricavi',
      conversionRate: 'Tasso di Conversione',
      bounceRate: 'Tasso di Rimbalzo',
      avgSessionDuration: 'Durata Media Sessione',
      
      // Actions
      refresh: 'Aggiorna',
      export: 'Esporta',
      filter: 'Filtra',
      search: 'Cerca',
      save: 'Salva',
      cancel: 'Annulla',
      delete: 'Elimina',
      edit: 'Modifica',
      view: 'Visualizza',
      
      // Status
      loading: 'Caricamento...',
      error: 'Errore',
      success: 'Successo',
      warning: 'Avviso',
      info: 'Informazione',
      
      // Time
      now: 'Ora',
      minutesAgo: '{{count}} minuti fa',
      hoursAgo: '{{count}} ore fa',
      daysAgo: '{{count}} giorni fa',
      
      // Common
      noData: 'Nessun dato disponibile',
      retry: 'Riprova',
      close: 'Chiudi',
      open: 'Apri',
      toggle: 'Commuta',
    }
  },
  ja: {
    translation: {
      // Navigation
      dashboard: 'ダッシュボード',
      analytics: '分析',
      users: 'ユーザー',
      settings: '設定',
      profile: 'プロフィール',
      notifications: '通知',
      
      // Dashboard
      welcome: 'おかえりなさい',
      overview: '概要',
      metrics: 'メトリクス',
      recentActivity: '最近のアクティビティ',
      quickActions: 'クイックアクション',
      
      // Metrics
      totalUsers: '総ユーザー数',
      activeSessions: 'アクティブセッション',
      revenue: '収益',
      conversionRate: 'コンバージョン率',
      bounceRate: 'バウンス率',
      avgSessionDuration: '平均セッション時間',
      
      // Actions
      refresh: '更新',
      export: 'エクスポート',
      filter: 'フィルター',
      search: '検索',
      save: '保存',
      cancel: 'キャンセル',
      delete: '削除',
      edit: '編集',
      view: '表示',
      
      // Status
      loading: '読み込み中...',
      error: 'エラー',
      success: '成功',
      warning: '警告',
      info: '情報',
      
      // Time
      now: '今',
      minutesAgo: '{{count}}分前',
      hoursAgo: '{{count}}時間前',
      daysAgo: '{{count}}日前',
      
      // Common
      noData: 'データがありません',
      retry: '再試行',
      close: '閉じる',
      open: '開く',
      toggle: '切り替え',
    }
  },
  zh: {
    translation: {
      // Navigation
      dashboard: '仪表板',
      analytics: '分析',
      users: '用户',
      settings: '设置',
      profile: '个人资料',
      notifications: '通知',
      
      // Dashboard
      welcome: '欢迎回来',
      overview: '概览',
      metrics: '指标',
      recentActivity: '最近活动',
      quickActions: '快速操作',
      
      // Metrics
      totalUsers: '总用户数',
      activeSessions: '活跃会话',
      revenue: '收入',
      conversionRate: '转化率',
      bounceRate: '跳出率',
      avgSessionDuration: '平均会话时长',
      
      // Actions
      refresh: '刷新',
      export: '导出',
      filter: '筛选',
      search: '搜索',
      save: '保存',
      cancel: '取消',
      delete: '删除',
      edit: '编辑',
      view: '查看',
      
      // Status
      loading: '加载中...',
      error: '错误',
      success: '成功',
      warning: '警告',
      info: '信息',
      
      // Time
      now: '现在',
      minutesAgo: '{{count}}分钟前',
      hoursAgo: '{{count}}小时前',
      daysAgo: '{{count}}天前',
      
      // Common
      noData: '暂无数据',
      retry: '重试',
      close: '关闭',
      open: '打开',
      toggle: '切换',
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  })

export default i18n
