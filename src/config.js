export const dev = {
  env: "development",
  api: "http://localhost:3001",
}
export const prod = {
  env: "production",
  api: "https://api2.ass.af",
}

const env = process.env.NODE_ENV === "production" ? prod : dev
export const uri = env.api
