import { Customer } from './customer'

export interface ZapierEmailPayload {
  subject: string
  body: string
  from: string
  to: string
  date: string
  attachments?: string[]
}

export interface EmailParsingResult {
  customerName?: string
  reservationDate?: string
  menuName?: string
  status?: string
  confidence: number
  rawData: ZapierEmailPayload
}

export interface ZapierSettings {
  webhookUrl: string
  emailTemplatePatterns: {
    subject: string
    customerName: string
    reservationDate: string
    menuName: string
  }
  isActive: boolean
}

export interface CustomerMatchResult {
  customer?: Customer
  confidence: number
  method: 'PHONE_AND_NAME' | 'EMAIL_AND_NAME' | 'NAME_ONLY' | 'MANUAL'
  duplicates: Customer[]
  requiresManualReview: boolean
}

export interface DuplicateDetectionResult {
  hasDuplicates: boolean
  duplicateGroups: {
    similarity: number
    customers: Customer[]
  }[]
}