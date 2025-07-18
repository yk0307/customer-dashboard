export const PLANS = ['ベーシック', 'スタンダード', 'プレミアム'] as const
export const STATUSES = ['契約締結', '入金済み', '事前ノウハウ学習済み', '初回カウンセリング済み'] as const
export const RESERVATION_STATUSES = ['confirmed', 'cancelled', 'completed'] as const
export const MATCH_METHODS = ['PHONE_AND_NAME', 'EMAIL_AND_NAME', 'NAME_ONLY', 'MANUAL'] as const
export const DUPLICATE_STATUSES = ['PENDING', 'RESOLVED', 'IGNORED'] as const

export const FIRESTORE_COLLECTIONS = {
  CUSTOMERS: 'customers',
  RESERVATIONS: 'reservations',
  INTEGRATION_SETTINGS: 'integration_settings',
  CUSTOMER_MATCH_LOGS: 'customer_match_logs',
  DUPLICATE_ALERTS: 'duplicate_alerts',
} as const

export const ROUTES = {
  HOME: '/',
  CUSTOMERS: '/customers',
  CUSTOMER_DETAIL: (id: string) => `/customers/${id}`,
  NEW_CUSTOMER: '/customers/new',
  RESERVATIONS: '/reservations',
  SETTINGS: '/settings',
  INTEGRATION_LOGS: '/integration/logs',
  INTEGRATION_DUPLICATES: '/integration/duplicates',
} as const