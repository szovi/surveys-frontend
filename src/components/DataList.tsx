import React from "react"

export interface Column<T> {
  header: string
  accessor: keyof T | string
  render?: (item: T) => React.ReactNode
}

export interface DataListProps<T> {
  columns: Column<T>[]
  data: T[]
  loading?: boolean
  error?: string | null
}

const DataList = <T extends {}>({
  data,
  columns,
  loading = false,
  error = null
}: DataListProps<T>): React.ReactElement => {
  if (loading) return <div className="data-list__loading">Loading...</div>
  if (error) return <div className="data-list__error">Error: {error}</div>
  if (data.length === 0) return <div className="data-list__empty">No data available</div>

  const renderCell = (row: T, col: Column<T>): React.ReactNode => {
    if (col.render) return col.render(row)

    const value = (row as any)[col.accessor] // ideiglenes tipizálás, de a keyof T-s részt megtartjuk
    // minden primitívet stringgé alakítunk, ReactNode lesz
    if (
      typeof value === "string" ||
      typeof value === "number" ||
      typeof value === "boolean" ||
      React.isValidElement(value) ||
      value === null ||
      value === undefined
    ) {
      return value
    }
    return JSON.stringify(value)
  }

  return (
    <table className="data-list">
      <thead>
        <tr>
          {columns.map((col, idx) => (
            <th key={idx}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIdx) => (
          <tr key={rowIdx}>
            {columns.map((col, colIdx) => (
              <td key={colIdx}>{renderCell(row, col)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default DataList
