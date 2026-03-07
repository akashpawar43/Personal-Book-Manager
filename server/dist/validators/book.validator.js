"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBookSchema = void 0;
const zod_1 = require("zod");
exports.createBookSchema = zod_1.z.object({
    title: zod_1.z.string(),
    author: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()).optional(),
    status: zod_1.z.enum(["want_to_read", "reading", "completed"]).optional()
});
