import React from "react";
import { IoMdNotifications } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";
import { Notifications } from "./Notifications";
import { Notification } from "@/Types/Notification";

type props = {
  notifications: Notification[];
};

export const NotificationNav = (props: props) => {
  // const [clearData, setClearData] = useState(false);
  // let notificationContent = <Notifications />;
  // if (clearData) {
  //   notificationContent = (
  //     <object type="image/svg+xml" data="/Notification.svg">
  //       Notification
  //     </object>
  //   );
  // }
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            " after:text-white after:w-5 after:h-5 after:absolute relative after:bg-red-500 after:-top-1 after:-right-1 after:rounded-full"
          )}
        >
          <IoMdNotifications />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Notifications</SheetTitle>
          <SheetDescription>
            Don{"'"}t miss out any important event!!!
          </SheetDescription>
        </SheetHeader>
        {/*This is new for me, Using object tag to ship SVG*/}
        {/* <object type="image/svg+xml" data="/Notification.svg"> */}
        {/*   Notification */}
        {/* </object> */}
        <Notifications notifications={props.notifications} />
        {/* {notificationContent}
        <SheetFooter>
          <Button onClick={() => setClearData(true)} variant={"destructive"}>
            Clear
          </Button>
        </SheetFooter> */}
      </SheetContent>
    </Sheet>
  );
};
