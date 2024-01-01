"use client";
import { ChangeAvatar } from "@/components/Settings/ChangeAvatar";
import { ChangeInformation } from "@/components/Settings/ChangeInformation";
import { SettingsList } from "@/components/Settings/SettingsList";
import { Container } from "@/components/ui/Container";
import { ChangeEmailDto } from "@/dtos/user/change-email.dto";
import { ChangePasswordDto } from "@/dtos/user/change-password.dto";
import { ChangeUsernameDto } from "@/dtos/user/change-user.dto";
import React, { useCallback } from "react";

export type SettingsPane = "EMAIL" | "PASSWORD" | "USERNAME" | "AVATAR";


export default function settingPage() {
  const [settingPane, setSettingPane] = React.useState<SettingsPane>("EMAIL");
  let changeElement = (
    <ChangeInformation
      key={"email"}
      dto={ChangeEmailDto}
      pathServer="/auth/email"
      title="Email"
      propertyNames={{ email: "" }}
    />
  );
  switch (settingPane) {
    case "PASSWORD":
      changeElement = (
        <ChangeInformation
          key={"password"}
          dto={ChangePasswordDto}
          pathServer="/auth/password"
          title="password"
          propertyNames={{ oldPassword: "", newPassword: "" }}
        />
      );

      break;
    case "USERNAME":
      changeElement = (
        <ChangeInformation
          key={"username"}
          dto={ChangeUsernameDto}
          pathServer="/users/change-information"
          title="username"
          propertyNames={{ username: "" }}
        />
      );
      break;
    case "AVATAR":
      changeElement = <ChangeAvatar url="users/upload-avatar" />;
  }
  const changeSettingPane = useCallback(
    (pane: SettingsPane) => {
      setSettingPane(pane);
    },
    [setSettingPane]
  );
  return (
    <Container className="mt-5">
      <div className="flex md:flex-row flex-col gap-2 [&>*:first-child]:basis-1/4 [&>*:last-child]:basis-3/4">
        <SettingsList onChangePane={changeSettingPane} />
        {changeElement}
      </div>
    </Container>
  );
}
