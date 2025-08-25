import React from "react"

interface SortableHeaderProps {
  header: string
  accessor: string
  sortable?: boolean
  sortState?: { accessor: string; direction: "ASC" | "DESC" } | null
  onSortChange?: (accessor: string, direction: "ASC" | "DESC") => void
}

const SortableHeader: React.FC<SortableHeaderProps> = ({ header, accessor, sortable = false, sortState, onSortChange }) => {
  const isActive = sortState?.accessor === accessor
  const direction = isActive ? sortState?.direction : null

  const handleClick = () => {
    if (!sortable || !onSortChange) return
    const newDirection: "ASC" | "DESC" = isActive ? (direction === "ASC" ? "DESC" : "ASC") : "ASC"
    onSortChange(accessor, newDirection)
  }

  return (
    <th onClick={handleClick} style={{ cursor: sortable ? "pointer" : "default", userSelect: "none" }}>
      {header} {sortable && isActive ? (direction === "ASC" ? "▲" : "▼") : ""}
    </th>
  )
}

export default SortableHeader
