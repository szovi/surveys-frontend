import React from "react"
import { NavLink } from "react-router-dom"
import type { BreadcrumbItem } from "../../context/BreadcrumbContext"

interface BreadcrumbProps {
  items: BreadcrumbItem[]
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items }) => {
  return (
    <nav className="breadcrumb-wrapper">
      {items.map((item, index) => (
        <span key={index} className="breadcrumb-item">
          {item.to ? (
            <NavLink to={item.to} className="breadcrumb-link">
              {item.label}
            </NavLink>
          ) : (
            <span className="breadcrumb-current">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="breadcrumb-separator">/</span>}
        </span>
      ))}
    </nav>
  )
}

export default Breadcrumb
