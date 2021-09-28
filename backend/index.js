const express = require("express")
const cors = require("cors")
const rateLimit = require("express-rate-limit")
const { Pool } = require("pg")

process.on("unhandledRejection", reason => {
  console.log(`Unhandled rejection: ${reason.message}: ${reason.stack}`)
})

const isProduction = process.env.NODE_ENV === "production"

const dbConfig = {
  user: process.env.DB_USER ?? "postgres",
  password: process.env.DB_PASSWORD ?? "pg",
  host: process.env.DB_HOST ?? "localhost",
  port: 5432,
  database: "commentsdb",
  ssl: isProduction,
}

const pool = new Pool(dbConfig)
pool.on("error", err => {
  console.error(`Error from database: ${err.message}`)
})

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
isProduction &&
  app.use(
    rateLimit({
      windowMs: 1 * 60 * 1000, // 1 minute
      max: 20, // 20 requests,
    })
  )
app.use(
  cors({
    origin: isProduction ? "https://blog.ass.af" : "*",
  })
)

app.use((req, res, next) => {
  // log the request time, url and incoming ip
  console.log(`${new Date()} ${req.method} ${req.path} - ${req.ip}`)
  next()
})

app.use('/webhooks', require('./webhooks'));

app.get("/comments", async (req, res) => {
  const results = await pool.query(
    "SELECT * FROM comments ORDER BY create_date DESC"
  )
  res.status(200).json(results.rows)
})

app.get("/comments/:slug", async (req, res) => {
  const slug = encodeURIComponent(req.params.slug)

  const results = await pool.query(
    "SELECT * FROM comments WHERE slug = $1 ORDER BY create_date DESC",
    [slug]
  )

  res.status(200).json(results.rows)
})

app.post("/comments", async (req, res) => {
  const { name, slug, text } = req.body
  const parentCommentId = parseInt(req.body.parentCommentId || 0, 10)

  await pool.query(
    "INSERT INTO comments (name, slug, text, parent_comment_id) VALUES ($1, $2, $3, $4)",
    [name, slug, text, parentCommentId]
  )
  res.status(201).json({ status: "success", message: "New comment added." })
})

app.put("/comments/:id", async (req, res) => {
  const { name, slug, text } = req.body
  const id = parseInt(req.params.id)
  const parentCommentId = parseInt(req.body.parentCommentId || 0, 10)
  await pool.query(
    "UPDATE comments SET name = $1, slug = $2, text = $3, parent_comment_id = $4 WHERE id = $5",
    [name, slug, text, parentCommentId, id]
  )
  res
    .status(200)
    .json({ status: "success", message: `Comment modified with ID: ${id}` })
})

app.delete("/comments/:id", async (req, res) => {
  const id = parseInt(req.params.id)

  await pool.query("DELETE FROM comments WHERE id = $1", [id])
  res
    .status(200)
    .json({ status: "success", message: `Comment deleted with ID: ${id}` })
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).send("Something broke!")
})

const port = process.env.PORT || 3001
app.listen(port, () => {
  console.log(`Server listening on ${port}`)
})
