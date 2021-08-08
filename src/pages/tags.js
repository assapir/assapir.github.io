import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"

const Tags = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata.title
  const tags = data.allMarkdownRemark?.group

  return (
    <Layout title={siteTitle} location={location}>
      <article>
        <h2>כל התגיות</h2>
        <div>
          {tags?.map(
            tag =>
              tag && (
                <div key={tag.fieldValue} className="tag-list-item">
                  <p>
                    <Link to={`/tags/${tag.fieldValue}/`}>
                      {tag.fieldValue}:
                    </Link>
                    <br />
                    {tag.totalCount === 1
                      ? "פוסט אחד"
                      : `${tag.totalCount} פוסטים`}
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
        nodes {
          frontmatter {
            title
          }
        }
      }
    }
  }
`

export default Tags
