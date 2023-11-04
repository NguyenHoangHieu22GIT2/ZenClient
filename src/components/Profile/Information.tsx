import React, { useState } from "react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export default function Information() {
  const [isEdited, setIsEdited] = useState(false);
  return (
    <div className="flex flex-col items-center">
      <Button
        onMouseLeave={() => {
          setIsEdited(false);
        }}
        onClick={() => setIsEdited(true)}
        className="flex items-center gap-5 m-4 "
        variant={"outline"}
      >
        <Label className={!isEdited ? `pointer-events-none` : ""}>
          Description
        </Label>
        <Input
          className={`text-black ${
            !isEdited ? `pointer-events-none` : ""
          }  border-none bg-transparent`}
          defaultValue={"BLABLABLA"}
        />
      </Button>
      {/* <div>Description: aslkdjalksdjalskjd</div> */}
    </div>
  );
}
