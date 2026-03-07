import express from "express";
import cors from "cors";
import { connectDB } from "./config/db";
import { env } from "./config/env";
import authRoutes from "./routes/auth.routes";
import bookRoutes from "./routes/book.routes";
import { errorHandler } from "./middleware/error.middleware";

const app = express();

const PORT = env.PORT || 5000;

app.use(cors({
    origin: env.FE_URL,
    credentials: true
}));
app.use(express.json());


app.get("/", (req, res) => {
    res.json({
        message: "health check"
    })
})

app.use("/api/auth", authRoutes);
app.use("/api/books", bookRoutes);

app.use(errorHandler);

const start = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`server listining on port http://localhost:${PORT}`)
    })
}

start();
