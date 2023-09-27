import React, { useState } from "react";
import { IoMdNotifications } from "react-icons/io";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Button } from "../ui/button";
import { Notification } from "./Notification";
import { Notifications } from "./Notifications";

export const NotificationNav = (props: {}) => {
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
        <Button variant={"outline"}>
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
        {/* <Notifications /> */}
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
