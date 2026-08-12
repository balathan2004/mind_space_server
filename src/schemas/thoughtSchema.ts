import { z } from "zod";


export const thoughtSchema = z.object({
  _id: z.string().optional(),
  uid: z.string().optional(),

  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),

  occurredAt: z.string().datetime(),
  lastModified: z.string().datetime().optional(),

  tags: z.array(z.string()).optional().default([]),
  readsAt: z.array(z.string().datetime()).optional().default([]),
  deleted: z.string().optional()
});

export type ThoughtInput = z.infer<typeof thoughtSchema>;


export const tagPatchSchema = z.object({
  _id: z.string().optional(),
  uid: z.string().optional(),
  name: z.string().min(1, "tag title is required"),
  createdAt: z.string().datetime().optional(),
});

export const tagCreateSchema = z.object({

  name: z.string().min(1, "tag title is required"),

});


export type tagCreateInput = z.infer<typeof tagCreateSchema>;



export type tagInput = z.infer<typeof tagPatchSchema>;
