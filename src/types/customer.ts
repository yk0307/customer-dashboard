import { Timestamp } from 'firebase/firestore'

export interface Customer {
  id: string
  name: string
  email?: string
  phone?: string
  plan: 'ベーシック' | 'スタンダード' | 'プレミアム'
  status: '契約締結' | '入金済み' | '事前ノウハウ学習済み' | '初回カウンセリング済み'
  contractDate?: string
  makeupCount: number
  hairCount: number
  fashionCount: number
  nextDate?: string
  nextContent?: string
  createdAt: Timestamp
  updatedAt: Timestamp
  reservations?: Reservation[]
}

export interface Reservation {
  id: string
  customerId: string
  reservationDate: string
  menuName: string
  status: 'confirmed' | 'cancelled' | 'completed'
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface IntegrationSettings {
  id: string
  zapierWebhookUrl: string
  emailParsingRules: {
    subjectPattern: string
    bodyPatterns: {
      customerName: string
      reservationDate: string
      menuName: string
    }
  }
  isActive: boolean
  createdAt: Timestamp
  updatedAt: Timestamp
}

export interface CustomerMatchLog {
  id: string
  emailData: {
    subject: string
    body: string
    receivedAt: string
  }
  extractedData: {
    customerName?: string
    reservationDate?: string
    menuName?: string
  }
  matchedCustomerId?: string
  matchMethod: 'PHONE_AND_NAME' | 'EMAIL_AND_NAME' | 'NAME_ONLY' | 'MANUAL'
  confidence: number
  isManualMatch: boolean
  duplicateCount: number
  notes?: string
  createdAt: Timestamp
}

export interface DuplicateAlert {
  id: string
  primaryCustomerId: string
  duplicateCustomerId: string
  similarity: number
  status: 'PENDING' | 'RESOLVED' | 'IGNORED'
  resolvedBy?: string
  resolvedAt?: Timestamp
  createdAt: Timestamp
}