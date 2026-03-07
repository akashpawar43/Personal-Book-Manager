"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = require("./config/db");
const env_1 = require("./config/env");
const auth_routes_1 = __importDefault(require("./routes/auth.routes"));
const book_routes_1 = __importDefault(require("./routes/book.routes"));
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
const PORT = env_1.env.PORT || 5000;
app.use((0, cors_1.default)({
    origin: env_1.env.FE_URL,
    credentials: true
}));
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        message: "health check"
    });
});
app.use("/api/auth", auth_routes_1.default);
app.use("/api/books", book_routes_1.default);
app.use(error_middleware_1.errorHandler);
const start = async () => {
    await (0, db_1.connectDB)();
    app.listen(PORT, () => {
        console.log(`server listining on port http://localhost:${PORT}`);
    });
};
start();
