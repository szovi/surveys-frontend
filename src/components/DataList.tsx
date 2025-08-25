import React from "react"
import type { Page } from "../entities/Page"
import Pagination from "./Pagination"
import SortableHeader from "./SortableHeader"
import '../styles/DataList.scss'

export interface Column<T> {
  header: string
  accessor: keyof T | string
  render?: (item: T) => React.ReactNode
  sortable?: boolean
}

export interface DataListProps<T> {
  columns: Column<T>[]
  page: Page<T> | null | undefined
  loading?: boolean
  error?: string | null
  onPageChange?: (page: number) => void
  sortState?: { accessor: string; direction: "ASC" | "DESC" } | null
  onSortChange?: (accessor: string, direction: "ASC" | "DESC") => void
  showPagerTop?: boolean
  showPagerBottom?: boolean
}

const DataList = <T extends {}>({
  page,
  columns,
  loading = false,
  error = null,
  onPageChange,
  sortState,
  onSortChange,
  showPagerBottom = true,
}: DataListProps<T>): React.ReactElement => {
  if (loading) return <div className="data-list__loading">Loading...</div>
  if (error) return <div className="data-list__error">Error: {error}</div>
  if (!page) return <div className="data-list__empty">No data available</div>

  const rows = Array.isArray(page.content) ? page.content : []
  const totalPages = Math.max(1, Math.ceil(page.totalElements / page.pageSize))
  const currentPage = page.pageNumber ?? 1

  const renderCell = (row: T, col: Column<T>) => {
    if (col.render) return col.render(row)
    const value = (row as any)[col.accessor]
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      React.isValidElement(value) ||
      value == null
    ) return value
    return JSON.stringify(value)
  }

  return (
    <div className="data-list__wrapper">

      <table className="data-list">
        <thead>
          <tr>
            {columns.map((col, idx) => (
              <SortableHeader
                key={idx}
                header={col.header}
                accessor={col.accessor as string}
                sortable={col.sortable}
                sortState={sortState}
                onSortChange={onSortChange}
              />
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={columns.length}>No data</td></tr>
          ) : (
            rows.map((row, rowIdx) => (
              <tr key={rowIdx}>
                {columns.map((col, colIdx) => (
                  <td key={colIdx}>{renderCell(row, col)}</td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>

      {showPagerBottom && onPageChange && (
        <div className="pagination-wrapper">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} disabled={loading} />
        </div>
      )}
    </div>
  )
}

export default DataList
