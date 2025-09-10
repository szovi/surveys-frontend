import React from 'react'
import type { PaginationProps } from '../types/PaginationTypes'
import '../styles/Pagination.scss'

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, disabled = false }) => {
  const canPrev = !disabled && currentPage > 1
  const canNext = !disabled && currentPage < totalPages

  return (
    <div className="pagination">
      <button onClick={() => canPrev && onPageChange(currentPage - 1)} disabled={!canPrev}>
        ◀ Prev
      </button>
      <span>Page {currentPage} / {Math.max(totalPages, 1)}</span>
      <button onClick={() => canNext && onPageChange(currentPage + 1)} disabled={!canNext}>
        Next ▶
      </button>
    </div>
  )
}

export default Pagination
