import { GroupId } from "@/Types/Group";
import { CommentId, PostId } from "@/Types/Post";
import { UserId } from "@/Types/User";
import { reportType, useCreateReport } from "@/apis/Report/useCreateReport";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useState } from "react";

type props = {
  reportDialogOpen: boolean;
  toggleReportDialog: () => void;
  userId: UserId
  postId?: PostId,
  groupId?: GroupId
  commentId?: CommentId
};

export function ReportPostDialog(props: props) {
  const [reportType, setReportType] = useState<reportType>("violences")
  const createReportMutation = useCreateReport()

  function report() {
    createReportMutation.mutate({
      userReportedId: props.userId, reportType: reportType, reportOptions: {
        postId: props.postId,
        groupId: props.groupId,
        commentId: props.commentId,
      }
    });
    props.toggleReportDialog()
  }

  return (
    <AlertDialog open={props.reportDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          Give us reasons why you reported this post.
        </AlertDialogHeader>
        <ul className="flex flex-col gap-2">
          <li
            onClick={() => setReportType("violences")}
            className="flex items-center gap-2">
            <Checkbox checked={reportType === "violences"} id="violences" />
            <Label htmlFor="violences">This post contains violences</Label>
          </li>
          <li
            onClick={() => setReportType("NSFW")}
            className="flex items-center gap-2">
            <Checkbox id="NSFW" checked={reportType === "NSFW"} />
            <Label htmlFor="NSFW">
              This post contains content that is NSFW
            </Label>
          </li>
          <li
            onClick={() => setReportType("false-information")}
            className="flex items-center gap-2">
            <Checkbox checked={reportType === "false-information"} id="false-information" />
            <Label htmlFor="false-information">
              This post spread false information
            </Label>
          </li>
        </ul>
        <AlertDialogFooter>
          <AlertDialogTrigger asChild>
            <Button onClick={report} variant={"destructive"}>
              Submit
            </Button>
          </AlertDialogTrigger>
          <AlertDialogTrigger asChild>
            <Button onClick={props.toggleReportDialog} variant={"ghost"}>
              Close
            </Button>
          </AlertDialogTrigger>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
