import React from 'react'
import { NavLink } from 'react-router-dom'
import '../../styles/main.scss'

const Navbar: React.FC = () => {
  return (
    <nav className="navbar">
      <ul>
        <li><NavLink to="/surveys" className={({ isActive }) => isActive ? 'active' : ''}>Surveys</NavLink></li>
        <li><NavLink to="/upload" className={({ isActive }) => isActive ? 'active' : ''}>Data Upload</NavLink></li>
      </ul>
    </nav>
  )
}

export default Navbar
