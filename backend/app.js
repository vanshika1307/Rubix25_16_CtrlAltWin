require("dotenv").config();
require("express-async-errors");
const express = require("express");
const app = express();

// utilities
const connectDB = require("./db/connect");

// routers
const authRouter = require("./routes/auth");
const jobsRouter = require("./routes/jobs");
const susRouter = require("./routes/sustain-score");
const scoreRouter = require("./routes/scores");
const postsRouter = require('./routes/posts');

// error handler
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const { authenticateUser } = require("./middleware/authentication");

// extra packages
const helmet = require("helmet");
const xss = require("xss-clean");
const cors = require("cors");
// const rateLimiter = require("express-rate-limit");

// middleware
// app.set("trust-proxy", 1);
// app.use(
//   rateLimiter({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//   })
// );
app.use(express.json());
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  credentials: true,
}));
app.use(xss());

// routes
app.get("/", (req, res) => {
  res.json({ msg: "Hello, user!" });
});
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", authenticateUser, jobsRouter);
app.use("/api/v1/scores", scoreRouter);
app.use("/api/v1/posts", postsRouter);
app.use(susRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => console.log(`Server is listening on port ${port}...`));
  } catch (error) {
    console.log(error);
  }
};

start();
