import React from "react";
import { Group } from "./Group";

export const Groups = (props: {}) => {
  return (
    <div className="[&>*]:mb-6 sm:grid sm:grid-cols-2 sm:gap-2 md:grid-cols-3 lg:grid-cols-4">
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
      <Group />
    </div>
  );
};
