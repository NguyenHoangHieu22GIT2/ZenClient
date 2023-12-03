import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import { UserAvatarHoverCard } from "../Header/UserAvatarHoverCard";
import { FINISHSTATUS, ztReport } from "@/Types/Report";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import { ztUserMinimalData } from "@/Types/User";
type props = {
  report: ztReport
  onSetReports: React.Dispatch<React.SetStateAction<ztReport[]>>
};


export const Report = React.memo((props: props) => {
  const banMutation = useMutation({
    mutationKey: ["ban-user"],
    mutationFn: async () => {
      await api.patch("reports/", { reportId: props.report._id, status: FINISHSTATUS })
      const result = await api.patch<ztUserMinimalData>("users/ban-user", { userId: props.report.userReported._id },)
      if (result.status >= 200 && result.status <= 400) {
        props.onSetReports(reports => {
          return reports.filter(report => report._id !== props.report._id)
        })
      }
    }
  })
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex gap-3 items-center">
          <UserAvatarHoverCard user={props.report.userReport} />
          report
          <UserAvatarHoverCard user={props.report.userReported} />
        </CardTitle>
        <CardDescription></CardDescription>
      </CardHeader>
      <CardContent>
        <div>
          <h1 className="italic">Reason:</h1>
          <h3 className="font-bold text-lg">
            {props.report.reportTitle}
          </h3>
        </div>
        <div className="flex gap-3">
          <Button variant={"link"}>View</Button>
          <Button variant={"secondary"}>Ignore</Button>
          <Button variant={"default"}>Restrict</Button>
          <Button onClick={() => banMutation.mutate()} variant={"destructive"}>Ban</Button>
        </div>
      </CardContent>
    </Card>
  );
})
