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

type props = {
  reportDialogOpen: boolean;
  toggleReportDialog: () => void;
};

export function ReportPostDialog(props: props) {
  return (
    <AlertDialog open={props.reportDialogOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          Give us reasons why you reported this post.
        </AlertDialogHeader>
        <ul className="flex flex-col gap-2">
          <li className="flex items-center gap-2">
            <Checkbox id="violences" />
            <Label htmlFor="violences">This post contains violences</Label>
          </li>
          <li className="flex items-center gap-2">
            <Checkbox id="NSFW" />
            <Label htmlFor="NSFW">
              This post contains content that is NSFW
            </Label>
          </li>
          <li className="flex items-center gap-2">
            <Checkbox id="false-information" />
            <Label htmlFor="false-information">
              This post spread false information
            </Label>
          </li>
        </ul>
        <AlertDialogFooter>
          <AlertDialogTrigger asChild>
            <Button onClick={props.toggleReportDialog} variant={"destructive"}>
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
