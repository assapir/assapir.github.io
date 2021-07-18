import React from "react"
import { Link } from "gatsby"

export default function Tags({ tags }) {
  return (
    <div className="tags">
      תגיות:
      {` `}
      {tags.map(tag => (
        <Link key={tag} href={`/tags/${tag}`}>
          {tag}
        </Link>
      ))}
    </div>
  )
}
