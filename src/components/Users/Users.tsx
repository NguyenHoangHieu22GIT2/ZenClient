import { ztUserMinimalData } from "@/Types/User";
import React from "react";
import User from "./User";

type props = {
  users: ztUserMinimalData[];
};

export default function Users(props: props) {
  return (
    <div>
      {props.users.map((user) => {
        return <User user={user} />;
      })}
    </div>
  );
}
