import { z } from "zod";

export const zChangeNormalInformationDto = z.object({
  description: z.string().min(0).max(255),
})

export type ztChangeNormalInformationDto = z.infer<typeof zChangeNormalInformationDto>
