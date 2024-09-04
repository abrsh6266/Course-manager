const http = require("http");
const express = require("express");
const connectDB = require("./config/database");
const {
  globalErrHandler,
  notFound,
} = require("./middlewares/globalErrorHandler");
const cors = require("cors");
const userRoutes = require("./Routes/userRoutes");
const courseRoutes = require("./Routes/courseRoutes");

//server
const app = express();

//middlewares
app.use(express.json());

//cors middleware
app.use(cors());

//db connect
connectDB();

// Routes middleware
app.use("/api/users", userRoutes);
app.use("/api/courses", courseRoutes);

//not found middleware(404)
app.use(notFound);

//Error middlewares
app.use(globalErrHandler);

const server = http.createServer(app);

// Starting server

const PORT = process.env.PORT || 4000;
server.listen(PORT, console.log("Listening port: ", PORT));
