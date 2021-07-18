import React from "react"
import { Link } from "gatsby"

export default function Tags({ tags }) {
  return (
    <div className="tags">
      תגיות:
      {` `}
      {tags.map((tag, i) => (
        <Link key={tag} href={`/tags/${tag}`}>
          {tag}
          {tags.length > i + 1 ? `, ` : ` `}
        </Link>
      ))}
    </div>
  )
}
