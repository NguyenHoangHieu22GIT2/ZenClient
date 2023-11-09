import { z } from "zod";

export const zChangeGroupInfoWithoutAvatarDto = z.object({
  groupName: z.string().min(5),
  groupDescription: z.string().min(20),
  isPrivate: z.boolean(),
});

export type ztChangeGroupInfoWithoutAvatarDto = z.infer<
  typeof zChangeGroupInfoWithoutAvatarDto
>;
