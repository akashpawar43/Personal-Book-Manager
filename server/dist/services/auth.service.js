"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const password_1 = require("../utils/password");
const jwt_1 = require("../utils/jwt");
const registerUser = async (email, password) => {
    const existing = await user_model_1.default.findOne({ email });
    if (existing)
        throw new Error("User already exists");
    const hashed = await (0, password_1.hashPassword)(password);
    const user = await user_model_1.default.create({
        email,
        password: hashed
    });
    const token = (0, jwt_1.generateToken)(user._id.toString());
    return { user, token };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await user_model_1.default.findOne({ email });
    if (!user)
        throw new Error("Invalid credentials");
    const isMatch = await (0, password_1.comparePassword)(password, user.password);
    if (!isMatch)
        throw new Error("Invalid credentials");
    const token = (0, jwt_1.generateToken)(user._id.toString());
    return { user, token };
};
exports.loginUser = loginUser;
