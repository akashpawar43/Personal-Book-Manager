"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const zod_1 = require("zod");
const response_util_1 = require("../utils/response.util");
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        next();
    }
    catch (error) {
        if (error instanceof zod_1.ZodError) {
            const formattedError = (0, zod_1.flattenError)(error);
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: formattedError.fieldErrors
            });
        }
        return (0, response_util_1.sendError)(res, "Internal Server Error", 400);
    }
};
exports.validate = validate;
