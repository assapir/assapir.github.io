import React, { useState } from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import NavBar from "./navBar"
import HamburgerIcon from "./HamburgerIcon.svg"

const HomeHeader = ({ title }) => {
  return <h1 className="main-heading">{title}</h1>
}

const RegularHeader = ({ title }) => {
  return (
    <Link className="header-link-home" to="/">
      {title}
    </Link>
  )
}

const Header = ({ isRootPath, title }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          menuLinks {
            name
            link
          }
        }
      }
    }
  `)

  const onHamburgerClick = () => {
    setIsMenuOpen(() => !isMenuOpen)
  }

  return (
    <header className="global-header">
      {isRootPath ? (
        <HomeHeader title={title} />
      ) : (
        <>
          <HamburgerIcon size={20} onClick={onHamburgerClick} fill="red" />
          <RegularHeader title={title} />
          <NavBar
            menuLinks={data.site.siteMetadata.menuLinks}
            isMenuOpen={isMenuOpen}
          />
        </>
      )}
    </header>
  )
}

export default Header
