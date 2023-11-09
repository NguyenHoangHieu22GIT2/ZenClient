import React from "react";
import { GroupInfos } from "./GroupInfos";
import { GroupActions } from "./GroupActions";
import { GroupData } from "./GroupData";
import { GroupPrivate } from "./GroupPrivate";
import { GroupId, zGroupQueries, ztGroup, ztGroupQueries } from "@/Types/Group";

type props = {
  groupId: GroupId;
};

export const GroupMainPage = (props: props) => {
  return (
    <section className="md:flex md:items-start  mt-5 gap-2 [&>*:first-child]:basis-8/12  [&>*:last-child]:basis-4/12">
      <main>
        <GroupPrivate />
        <GroupActions />
        <GroupData groupId={props.groupId} />
      </main>
      <GroupInfos groupId={props.groupId} />
    </section>
  );
};
