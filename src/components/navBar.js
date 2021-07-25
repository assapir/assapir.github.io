import React from "react"
import { Link } from "gatsby"

const NavBar = ({ menuLinks, isMenuOpen }) => {
  return (
    <div>
      <nav>
        <ul className={`navbar ${isMenuOpen ? "open" : ""}`}>
          {menuLinks.map(link => (
            <li key={link.name} className="navbar-item">
              <Link to={link.link}>{link.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default NavBar
