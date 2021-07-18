import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const Tags = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const group = data.allMarkdownRemark && data.allMarkdownRemark.group
  console.log(data.allMarkdownRemark)

  return (
    <Layout title={siteTitle} location={location}>
      <article>
        <h1>כל התגיות</h1>
        <div className="tag-list">
          {group &&
            group.map(
              tag =>
                tag && (
                  <div key={tag.fieldValue}>
                    <p>
                      <Link to={`/tags/${tag.fieldValue}/`}>
                        {tag.fieldValue}:{" "}
                      </Link>
                      {tag.totalCount === 1 ? " פוסט " : "פוסטים"}
                      {tag.totalCount}
                    </p>
                  </div>
                )
            )}
        </div>
      </article>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark {
      group(field: frontmatter___tags) {
        fieldValue
        totalCount
      }
    }
  }
`

export default Tags
