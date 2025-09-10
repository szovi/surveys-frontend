import React from 'react'
import '../styles/SortableHeader.scss'
import type { SortableHeaderProps } from '../types/DataListTypes'

const SortableHeader: React.FC<SortableHeaderProps> = ({ header, accessor, sortable = false, sortState, onSortChange }) => {
  const isActive = sortState?.accessor === accessor
  const direction = isActive ? sortState?.direction : null

  const handleClick = () => {
    if (!sortable || !onSortChange) return
    const newDirection: 'ASC' | 'DESC' = isActive ? (direction === 'ASC' ? 'DESC' : 'ASC') : 'ASC'
    onSortChange(accessor, newDirection)
  }

  return (
    <th
      onClick={handleClick}
      className={`sortable-header ${sortable ? 'sortable' : ''} ${isActive ? 'active' : ''}`}
    >
      {header} {sortable && isActive ? (direction === 'ASC' ? '▲' : '▼') : ''}
    </th>
  )
}

export default SortableHeader
