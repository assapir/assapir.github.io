import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const TagTemplate = ({ data, pageContext, location }) => {
  const { tag } = pageContext
  const siteTitle = data.site.siteMetadata.title
  const posts = data.allMarkdownRemark.edges

  return (
    <Layout title={siteTitle} location={location}>
      <article>
        <header>
          <h1>{`פוסטים עם התגית '${tag}':`}</h1>
        </header>
        <div className="post-list-item">
          {posts.map(({ node }) => {
            const title = node.frontmatter.title || node.fields.slug
            return (
              <div key={node.fields.slug}>
                <h2>
                  <Link to={node.fields.slug}>{title}</Link>
                </h2>
                <small>{node.frontmatter.date}</small>
                <p dangerouslySetInnerHTML={{ __html: node.excerpt }} />
                <br />
              </div>
            )
          })}
        </div>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query TagPage($tag: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      filter: { frontmatter: { tags: { in: [$tag] } } }
    ) {
      totalCount
      edges {
        node {
          excerpt(pruneLength: 200, format: HTML)
          fields {
            slug
          }
          frontmatter {
            date
            title
          }
        }
      }
    }
  }
`

export default TagTemplate
