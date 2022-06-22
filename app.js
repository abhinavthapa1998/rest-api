require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const alienRouter = require("./routes/aliens");
const usersRouter = require("./routes/users");
const documentRouter = require("./routes/document");
// const WebSocket = require("ws");
// const server = new WebSocket.Server({ port: 8080 });
// server.on("connection", (socket) => {
//   console.log("User Connected");
// });
const app = express();
const con = mongoose.connection;
const url = process.env.MONGO_URI;
mongoose.connect(url, {
  useNewUrlParser: true,
});
const jwt = require("jsonwebtoken");
app.use(express.json());

con.on("open", () => {
  console.log("Connected to MongoDB");
});

app.listen(9000, () => {
  console.log("Server Started at 9000");
});
app.use("/aliens", alienRouter);
app.use("/users", usersRouter);
app.use("/document", documentRouter);

// app.get("/", (req, res) => {
//   res.send("ACCESS GRANTED");
// });

// FUNCTION TO GENERATE A ACCESS TOKEN
function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "15s" });
}

// POST AND LOGGING IN
// app.post("/login", (req, res) => {
//   const username = req.body.username;
//   const user = { name: username };
//   const accessToken = generateAccessToken(user);
//   const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET);
//   res.json({ accessToken: accessToken, refreshToken: refreshToken });
// });

// POST TO TOKEN AND GENERATE REFRESH TOKENS

let refreshTokens = [];
app.post("/token", (req, res) => {
  const refreshToken = req.body.token;
  if (refreshToken == null) return res.sendStatus(401);
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403);
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    const accessToken = generateAccessToken({ name: user.name });
    res.json({ accessToken: accessToken });
  });
});

// LOGOUT/DELETE REFRESH TOKENS

// app.delete("/logout", (req, res) => {
//   refreshTokens = refreshTokens.filter((token) => token != req.body.token);
//   res.sendStatus(204);
// });

//AUTHORIZATION MIDDLEWARE

function authenticateToken(req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) {
    return res.sendStatus(401);
  }
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }

    req.user = user;
    next();
  });
}
