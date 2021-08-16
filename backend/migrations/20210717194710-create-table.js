"use strict"

exports.up = async function (db) {
  await db.runSql(`CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) NOT NULL,
    parent_comment_id INTEGER,
    text VARCHAR(5000) NOT NULL,
    create_date TIMESTAMPTZ DEFAULT now() NOT NULL
  );`)

  return db.runSql(`CREATE INDEX comments_slug_idx ON comments (slug);`)
}

exports.down = function (db) {
  return db.runSql("DROP TABLE comments;")
}
