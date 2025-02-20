const express = require('express'); // Express Framework
const errorHandler = require('./middlewares/errorHandler'); // here will be your error handler
const cookieParser = require('cookie-parser');
const cors = require('cors');

const authRouter = require('./routers/authRoutes');

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use(express.json());

app.use(cookieParser());

app.use("/api/v1/users", authRouter)


app.use(errorHandler); // middleware for handling errors of each route

module.exports = app;
