import { z } from "zod";

export const thoughtSchema = z.object({
  _id: z.string().optional(),
  uid: z.string().optional(),

  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),

  occurredAt: z.string().datetime(),
  createdAt: z.string().datetime().optional(),
  lastModified: z.string().datetime().optional(),

  tags: z.array(z.string()).optional().default([]),
  readsAt: z.array(z.string().datetime()).optional().default([]),
});

export type ThoughtInput = z.infer<typeof thoughtSchema>;
