"use client";
import { ChangeEmail } from "@/components/Settings/ChangeEmail";
import { ChangePassword } from "@/components/Settings/ChangePassword";
import { ChangeUsername } from "@/components/Settings/ChangeUsername";
import { SettingsList } from "@/components/Settings/SettingsList";
import { Container } from "@/components/ui/Container";
import React, { useCallback } from "react";

export type SettingsPane = "EMAIL" | "PASSWORD" | "USERNAME";

export default function settingPage() {
  const [settingPane, setSettingPane] = React.useState<SettingsPane>("EMAIL");
  let changeElement = <ChangeEmail />;
  switch (settingPane) {
    case "PASSWORD":
      changeElement = <ChangePassword></ChangePassword>;
      break;
    case "USERNAME":
      changeElement = <ChangeUsername></ChangeUsername>;
      break;
  }
  const changeSettingPane = useCallback(
    (pane: SettingsPane) => {
      setSettingPane(pane);
    },
    [setSettingPane],
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
