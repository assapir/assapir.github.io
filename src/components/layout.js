import React from "react"
import Bio from "./bio"
import Header from "./header"

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath} dir="auto">
      <Header title={title} isRootPath={isRootPath} />
      <main>{children}</main>
      <footer dir="ltr">
        <Bio />© Assaf Sapir, {new Date().getFullYear()}, Built with
        {` `}
        <a
          href="https://www.gatsbyjs.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          Gatsby
        </a>
        .{` `}
        Hosted with{" "}
        <a
          href="https://pages.github.com"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub Pages
        </a>
        .
        <br />
        Source code on my{" "}
        <a
          href="https://github.com/assapir/assapir.github.io"
          target="_blank"
          rel="noreferrer noopener"
        >
          GitHub
        </a>
        .
      </footer>
    </div>
  )
}

export default Layout
