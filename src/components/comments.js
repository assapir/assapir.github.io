import React, { useState, useEffect } from "react"
import { uri } from "../config"

const Comments = ({ slug }) => {
  const newCommentInitialState = {
    name: "",
    text: "",
    slug: encodeURIComponent(slug),
    parentCommentId: null,
  }
  const initialState = {
    comments: [],
    newComment: newCommentInitialState,
    submitting: false,
    success: false,
    error: false,
  }
  const [commentsState, setCommentsState] = useState(initialState)
  const [hasError, setHasError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${uri}/comments/${encodeURIComponent(slug)}`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "GET",
          }
        )
        const comments = await response.json()
        setCommentsState(prevState => {
          return {
            ...prevState,
            comments,
          }
        })
      } catch (error) {
        console.log("unable to show comments", error)
        setHasError(true)
      }
    }
    fetchData()
  }, [slug])

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
      await fetch(`${uri}/comments`, {
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
          newComment: newCommentInitialState,
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

  const showError = () => {
    error && (
      <div className="error">
        <p>אוי לא!</p>
      </div>
    )
  }

  const showSuccess = () => {
    success && (
      <div className="success">
        <p>תגובתכם נשלחה בהצלחה!</p>
      </div>
    )
  }

  const commentForm = () => {
    return (
      <form id="new-comment" onSubmit={onSubmitComment}>
        <label htmlFor="name">
          שם:
          <input
            type="text"
            name="name"
            id="name"
            value={name}
            onChange={handleChange}
            maxLength="255"
            placeholder="קראו לי ישמעאל"
            required
          />
        </label>
        <label htmlFor="text">
          תגובה
          <textarea
            rows="2"
            cols="5"
            name="text"
            id="text"
            value={text}
            onChange={handleChange}
            placeholder="תגובתכם?"
            required
          />
        </label>
        <button
          type="submit"
          disabled={!name || !text || text.length < 20 || submitting}
        >
          שליחה
        </button>
      </form>
    )
  }

  const {
    submitting,
    success,
    error,
    comments,
    newComment: { name, text },
  } = commentsState

  return hasError ? null : (
    <section id="comments">
      {success || error ? showError() || showSuccess() : commentForm()}
      {comments.length > 0 &&
        comments
          .filter(comment => !comment.parent_comment_id)
          .map((comment, i) => {
            let child
            if (comment.id) {
              child = comments.find(c => comment.id === c.parent_comment_id)
            }
            return (
              <div className="comment" key={i}>
                <header>
                  <h2>{comment.name}</h2>
                  <div className="comment-date">{comment.date}</div>
                </header>
                <p>{comment.text}</p>
                {child && (
                  <div className="comment reply">
                    <header>
                      <h3>{child.name}</h3>
                      <div className="comment-date">{child.date}</div>
                    </header>
                    <p>{child.text}</p>
                  </div>
                )}
              </div>
            )
          })}
      <hr />
    </section>
  )
}

export default Comments
