import React from "react"

interface PaginationProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  disabled?: boolean
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, disabled = false }) => {
  const canPrev = !disabled && currentPage > 1
  const canNext = !disabled && currentPage < totalPages

  return (
    <div className="pagination" style={{ display: "flex", gap: 8, alignItems: "center", justifyContent: "center", marginTop: 12 }}>
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
