import { z } from "zod"

export const taskSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.string(),
  label: z.string(),
  priority: z.string(),
  created_at: z.string().optional(),
})

export type Task = z.infer<typeof taskSchema>
