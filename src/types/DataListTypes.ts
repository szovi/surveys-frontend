import type { Page } from '../entities/Page'

export interface Column<T> {
  header: string
  accessor: keyof T | string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

export interface DataListProps<T> {
  columns: Column<T>[]
  page?: Page<T> | null | T[]
  loading?: boolean
  error?: string | null
  onPageChange?: (page: number) => void
  sortState?: { accessor: string; direction: 'ASC' | 'DESC' } | null
  onSortChange?: (accessor: string, direction: 'ASC' | 'DESC') => void
  showPagerTop?: boolean
  showPagerBottom?: boolean
}


export interface SortableHeaderProps {
  header: string
  accessor: string
  sortable?: boolean
  sortState?: { accessor: string; direction: 'ASC' | 'DESC' } | null
  onSortChange?: (accessor: string, direction: 'ASC' | 'DESC') => void
}
