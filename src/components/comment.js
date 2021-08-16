import React from "react"

// eslint-disable-next-line no-native-reassign
const Comment = ({ comment, isChild = false }) => {
  const commentHeader = () => {
    return (
      comment && (
        <header>
          <h4 className="comment-name">{`מאת: ${comment.name}`}</h4>
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
      <p className="comment-text">{comment.text}</p>
      <hr />
    </div>
  )
}

export default Comment
