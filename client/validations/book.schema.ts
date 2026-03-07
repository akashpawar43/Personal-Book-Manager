import { z } from "zod";

export const bookSchema = z.object({
    title: z
        .string()
        .min(1, "Title is required")
        .max(200, "Title too long"),

    author: z
        .string()
        .min(1, "Author is required"),

    tags: z
        .array(z.string())
        .optional(),

    status: z.enum(["want_to_read", "reading", "completed"])
});