import React, { useState } from "react"

const Comments = ({ commentsList, slug }) => {
  const initialState = {
    comments: commentsList || [],
    newComment: {
      name: "",
      text: "",
      slug: slug,
      parentCommentId: null,
    },
    submitting: false,
    success: false,
    error: false,
  }
  const [commentsState, setCommentsState] = useState(initialState)

  const onSubmitComment = async event => {
    event.preventDefault()

    setCommentsState(prevState => {
      return {
        ...prevState,
        submitting: true,
      }
    })

    const { newComment, comments } = commentsState

    try {
      await fetch(`https://blbla.com/comments`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(newComment),
      })

      setCommentsState(prevState => {
        return {
          ...prevState,
          comments: [newComment, ...comments],
          newComment: {
            name: "",
            text: "",
            slug,
            parentCommentId: null,
          },
          success: true,
          error: false,
        }
      })
    } catch (error) {
      setCommentsState(prevState => {
        return {
          ...prevState,
          error: true,
        }
      })
    }
  }

  const handleChange = event => {
    const { newComment } = commentsState
    const { name, value } = event.target

    setCommentsState(prevState => {
      return {
        ...prevState,
        newComment: {
          ...newComment,
          [name]: value,
        },
      }
    })
  }

  const showError = () =>
    error && (
      <div className="error">
        <p>Comment failed to submit.</p>
      </div>
    )

  const showSuccess = () =>
    success && (
      <div className="success">
        <p>Comment submitted!</p>
      </div>
    )

  const {
    submitting,
    success,
    error,
    comments,
    newComment: { name, text },
  } = commentsState
  return (
    <form id="new-comment" onSubmit={onSubmitComment}>
      <label for="name">
        Name:
        <input
          type="text"
          name="name"
          id="name"
          value={name}
          onChange={handleChange}
          maxLength="255"
          placeholder="Name"
          required
        />
      </label>
      <label for="text">
        Comment
        <textarea
          rows="2"
          cols="5"
          name="text"
          id="text"
          value={text}
          onChange={handleChange}
          placeholder="Comment"
          required
        />
      </label>
      <button
        type="submit"
        disabled={!name || !text || text.length < 20 || submitting}
      >
        Submit
      </button>
    </form>
  )
}

export default Comments
