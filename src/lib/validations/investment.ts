import { z } from "zod";

export const createInvestmentSchema = z.object({
  projectId: z.string().min(1),
  amount: z.number().positive().max(10_000_000)
});
