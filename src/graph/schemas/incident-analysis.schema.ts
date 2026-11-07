import { z } from "zod";

export const IncidentAnalysisSchema = z
  .object({
    analysis: z.string(),
    needMoreInfo: z.boolean(),
    followUpQuestion: z.string(),
  })
  .refine(
    (data) =>
      data.needMoreInfo
        ? data.followUpQuestion.trim().length > 0
        : data.followUpQuestion.trim().length === 0,
    {
      message:
        "followUpQuestion must be non-empty when needMoreInfo is true, and empty when false",
      path: ["followUpQuestion"],
    },
  );