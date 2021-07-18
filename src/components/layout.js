import React from "react"
import { Link } from "gatsby"
import Bio from "./bio"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  const header = isRootPath ? (
    <h1 className="main-heading">
      <Link to="/">{title}</Link>
    </h1>
  ) : (
    <Link className="header-link-home" to="/">
      {title}
    </Link>
  )

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath} dir="auto">
      <header className="global-header">{header}</header>
      <main>{children}</main>
      <footer dir="ltr">
        <Bio />© {new Date().getFullYear()}, Built with
        {` `}
        <a href="https://www.gatsbyjs.com">Gatsby</a>.{` `}
        Hosted with <a href="https://pages.github.com">GitHub Pages</a>
      </footer>
    </div>
  )
}

export default Layout
