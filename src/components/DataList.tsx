import React from "react"
import Pagination from "./Pagination"
import SortableHeader from "./SortableHeader"
import '../styles/DataList.scss'
import type { Column, DataListProps } from "../types/DataListTypes"


const DataList = <T extends {}>({
  page,
  columns,
  loading = false,
  error = null,
  onPageChange,
  sortState,
  onSortChange,
  showPagerTop = false,
  showPagerBottom = true,
}: DataListProps<T>): React.ReactElement => {
  if (loading) return <div className="data-list__loading">Loading...</div>
  if (error) return <div className="data-list__error">Error: {error}</div>
  if (!page || (Array.isArray(page) && page.length === 0) || (!Array.isArray(page) && !page.content?.length))
    return <div className="data-list__empty">No data available</div>

  const rows: T[] = Array.isArray(page) ? page : page.content || []

  const totalPages = !Array.isArray(page) && page.pageSize ? Math.max(1, Math.ceil(page.totalElements / page.pageSize)) : 1
  const currentPage = !Array.isArray(page) && page.pageNumber ? page.pageNumber : 1

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
      {showPagerTop && onPageChange && totalPages > 1 && (
        <div className="pagination-wrapper">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} disabled={loading} />
        </div>
      )}

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

      {showPagerBottom && onPageChange && totalPages > 1 && (
        <div className="pagination-wrapper">
          <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={onPageChange} disabled={loading} />
        </div>
      )}
    </div>
  )
}

export default DataList
