export interface Page<T> {
    content: T[]
    pageNumber: number
    pageSize: number
    totalElements: number
    numberOfElements: number
  }
  