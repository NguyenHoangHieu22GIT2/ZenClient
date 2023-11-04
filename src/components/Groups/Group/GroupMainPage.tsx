import React from "react";
import { GroupInfos } from "./GroupInfos";
import { GroupActions } from "./GroupActions";
import { GroupData } from "./GroupData";
import { GroupPrivate } from "./GroupPrivate";
import { api } from "@/lib/axios.api";
import { zGroupQueries, ztGroup, ztGroupQueries } from "@/Types/Group";

type props = {
  groupId: string;
};

export const GroupMainPage = async  (props: props) => {
  const resultGroupInfos = await api.get<ztGroupQueries>(`groups/${props.groupId}`,{withCredentials:true});
  const parsedResult = zGroupQueries.parse(resultGroupInfos); 
  return (
    <section className="md:flex md:items-start  mt-5 gap-2 [&>*:first-child]:basis-8/12  [&>*:last-child]:basis-4/12">
      <main>
        <GroupPrivate />
        <GroupActions />
        <GroupData />
      </main>
      <GroupInfos />
    </section>
  );
};
