import React from "react"

export default Comment = ({ comment, isChild = false }) => {
  const commentHeader = () => {
    return (
      comment && (
        <header>
          <h4>{`מאת: ${comment.name}`}</h4>
          <div className="comment-date">
            מתאריך: {new Date(comment.create_date).toLocaleDateString()}
          </div>
        </header>
      )
    )
  }

  return (
    <div className="comment">
      {commentHeader()}
      <p className="commentText">{comment.text}</p>
      <hr />
    </div>
  )
}
