import { z } from "zod";
import { Brand } from "./Brand";
import { zUser, zUserMinimalData } from "./User";

type ReportIdType = Brand<string, "Report">;

const ReportId = z.string().transform((data) => data as ReportIdType);

const zReport = z.object({
  _id: ReportId,
  reportType: z.string(),
  reportTitle: z.string(),
  reportBody: z.string(),
  userReport: zUserMinimalData,
  userReported: zUserMinimalData,
  options: z.object({
    postId: z.string().nullable(),
    commentId: z.string().nullable(),
    groupId: z.string().nullable(),
  }),
});

export type ztReport = z.infer<typeof zReport>;

export const zResultsOfReportsInfiniteQuery = z.object({
  reportsCount: z.number(),
  reports: z.array(zReport),
});

export type ztResultsOfReportsInfiniteQuery = z.infer<
  typeof zResultsOfReportsInfiniteQuery
>;

export type reportStatus = "FINISH" | "IGNORE" | "PENDING"

export const FINISHSTATUS: reportStatus = "FINISH"
export const IGNORESTATUS: reportStatus = "IGNORE"
export const PENDINGSTATUS: reportStatus = "PENDING"
