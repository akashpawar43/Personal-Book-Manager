import { z } from "zod";

export const createBookSchema = z.object({
  title: z.string(),
  author: z.string(),
  tags: z.array(z.string()).optional(),
  status: z.enum(["want_to_read", "reading", "completed"]).optional()
});