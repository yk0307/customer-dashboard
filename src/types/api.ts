export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  UNAUTHORIZED = 'UNAUTHORIZED',
  INTEGRATION_ERROR = 'INTEGRATION_ERROR',
  DATABASE_ERROR = 'DATABASE_ERROR'
}

export interface ApiError {
  code: ErrorCode
  message: string
  details?: unknown
}

export interface ApiResponse<T> {
  data?: T
  error?: ApiError
}

export interface PaginationParams {
  page?: number
  limit?: number
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrevious: boolean
}