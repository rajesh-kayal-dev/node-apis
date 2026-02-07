import { z } from "zod";

export const postSchema = z.object({
    title: z.string().min(3),
    description: z.string().min(10),
    skills: z.array(z.string()).optional()
}) 