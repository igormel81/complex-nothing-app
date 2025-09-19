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
