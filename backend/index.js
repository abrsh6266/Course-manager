const http = require("http");
const express = require("express");
const connectDB = require("./config/database");
const cors = require("cors");

//server
const app = express();

//middlewares
app.use(express.json()); //pass incoming data

//cors middleware
app.use(cors());

//db connect
connectDB();

//Routes

//not found middleware(404)
app.use(notFound);

//Error middlewares
app.use(globalErrHandler);

const server = http.createServer(app);

// Starting server

const PORT = process.env.PORT || 4000;
server.listen(PORT, console.log("Listening port: ", PORT));
