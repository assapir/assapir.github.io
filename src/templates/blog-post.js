import React, { useEffect, useState } from "react"
import { Link, graphql } from "gatsby"
import Comments from "../components/comments"

import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const currentSlug = post.fields.slug
  const { previous, next } = data

  const [comments, setComments] = useState([])
  const [hasCommentsErrors, setHasCommentsErrors] = useState(false)
  useEffect(() => {
    ;(async () => {
      //const response = await fetch(`/api/comments?slug=${currentSlug}`)
      try {
        //const json = await response.json()
        setComments([
          {
            name: "assaf",
            text: "adfasdfasdfasdfasdfsadfasdfasdfsadfasdf dfef erfe fdcvadf erf asd asdgfdsf ew",
          },
        ])
      } catch (error) {
        console.log("unable to show comments", error)
        setHasCommentsErrors(true)
      }
    })()
  }, [currentSlug])

  return (
    <Layout location={location} title={siteTitle}>
      <Seo
        title={post.frontmatter.title}
        description={post.frontmatter.description || post.excerpt}
        lang="he"
      />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{new Date(post.frontmatter.date).toLocaleDateString()}</p>
        </header>
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
      </article>
      <div>
        {!hasCommentsErrors && (
          <Comments commentsList={comments} slug={currentSlug} />
        )}
      </div>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 160)
      html
      frontmatter {
        title
        date
        description
      }
      fields {
        slug
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
