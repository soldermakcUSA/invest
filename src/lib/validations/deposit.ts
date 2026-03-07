import { z } from "zod";

export const depositSchema = z.object({
  amount: z.number().positive().max(1_000_000),
  currency: z.string().min(3).max(10),
  provider: z.enum(["stripe", "heleket"])
});
