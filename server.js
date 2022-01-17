const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config()

app.use(express.json())
app.use(cors())

const db = require("./models")

const usersRouter = require("./routes/Users")
app.use("/auth", usersRouter)

const noteRouter = require("./routes/Notes")
app.use("/notes", noteRouter)

db.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3001, () => {
    console.log("Server running on port 3001")
  })
})
.catch((err) => {
  console.log(err)
})
