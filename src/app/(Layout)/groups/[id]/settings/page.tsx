import { ztGroup } from "@/Types/Group";
import { PropsPage } from "@/Types/PropsPage";
import GroupSetting from "@/components/Groups/Group/GroupSetting";
import { Container } from "@/components/ui/Container";
import {
  zChangeGroupInfoWithoutAvatarDto,
  ztChangeGroupInfoWithoutAvatarDto,
} from "@/dtos/group/group-info.dto";
import { api } from "@/lib/axios.api";
import React from "react";

export default async function Settingspage(props: PropsPage) {
  try {
    const result = await api.get<ztChangeGroupInfoWithoutAvatarDto>(
      `groups/${props.params.id}`
    );
    const parsedResult = zChangeGroupInfoWithoutAvatarDto.parse(result.data);
    console.log(
      "🚀 ~ file: page.tsx:18 ~ Settingspage ~ parsedResult:",
      parsedResult
    );
    return (
      <Container>
        <GroupSetting groupId={props.params.id} groupInfo={parsedResult} />
      </Container>
    );
  } catch (error) {
    console.log(error);
    return <h1>error</h1>;
  }
}
