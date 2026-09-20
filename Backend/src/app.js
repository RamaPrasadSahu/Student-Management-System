import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import UserRouter from './routers/user.router.js'

const app = express()

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        return callback(null, origin);
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())

app.use("/api/v1/users", UserRouter)

// Global Error Handler Middleware
app.use((err, req, res, next) => {
    console.error("SERVER ERROR:", err);
    let statusCode = err.statusCode || err.statuscode || err.status || 500;
    let message = err.message || "Internal Server Error";

    if (err.name === "ValidationError") {
        statusCode = 400;
        message = Object.values(err.errors || {}).map(val => val.message).join(", ") || message;
    }
    if (err.name === "CastError") {
        statusCode = 400;
        message = `Invalid ID format: ${err.value}`;
    }
    if (err.code === 11000) {
        statusCode = 400;
        const duplicateField = Object.keys(err.keyValue || {})[0] || "field";
        message = `A student with this ${duplicateField} already exists`;
    }

    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
        errors: err.errors || []
    });
});

export default app