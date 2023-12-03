"use client"
import { useMutation } from '@tanstack/react-query'
import { UserId } from '@/Types/User'
import { api } from '@/lib/axios.api'
import { CommentId, PostId } from '@/Types/Post';
import { GroupId } from '@/Types/Group';

export type reportType = 'violences' | 'NSFW' | 'false-information';

export type ReportOptions = {
  postId?: PostId;
  groupId?: GroupId;
  commentId?: CommentId;
};
export function useCreateReport() {
  const createReportMutation = useMutation({
    mutationKey: ["create-report"],
    mutationFn: async ({ reportType, reportOptions, userReportedId }: { userReportedId: UserId, reportType: reportType, reportOptions: ReportOptions }) => {
      console.log(userReportedId, reportType, reportOptions)
      return api.post("reports", { userId: userReportedId, reportType, reportOptions }, { withCredentials: true })
    }
  })
  return createReportMutation
}
