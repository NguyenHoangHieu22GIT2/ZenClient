import React from "react";
import { Card } from "../ui/card";
import Link from "next/link";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";
import { SettingsPane } from "@/app/settings/page";
type props = {
  onChangePane: (type: SettingsPane) => void;
};

export const SettingsList = React.memo((props: props) => {
  return (
    <Card className="p-5">
      <ul>
        <li>
          <Button
            onClick={props.onChangePane.bind(this, "EMAIL")}
            variant={"link"}
          >
            Change Email
          </Button>
        </li>
        <Separator></Separator>
        <li>
          <Button
            onClick={props.onChangePane.bind(this, "PASSWORD")}
            variant={"link"}
          >
            Change Password
          </Button>
        </li>
        <Separator></Separator>
        <li>
          <Button
            onClick={props.onChangePane.bind(this, "USERNAME")}
            variant={"link"}
          >
            Change Username
          </Button>
        </li>
      </ul>
    </Card>
  );
});
