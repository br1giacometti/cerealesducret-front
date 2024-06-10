import { z } from "zod";

export const optionItem = z.object({
  label: z.string(),
  value: z.number(),
  currentValue: z.number(),
});

const createRenditionSchema = z.object({
  description: z.string(),
  value: z.string().transform((val, ctx) => {
    const parsed = Number.parseInt(val.replaceAll(".", ""), 10);
    if (Number.isNaN(parsed)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Required",
      });

      return z.NEVER;
    }
    if (parsed <= 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "mustBePositive",
      });

      return z.NEVER;
    }
    return parsed;
  }),
  isVirtualPaid: z.boolean(),
  cashBoxOrigin: optionItem,

  movementType: z.string(),
  date: z.string(),
});

export type CreateRenditionSchema = z.infer<typeof createRenditionSchema>;

export default createRenditionSchema;
