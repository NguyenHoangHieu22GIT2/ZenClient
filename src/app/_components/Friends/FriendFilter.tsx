import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { AiOutlineSearch } from "react-icons/ai";
import { RadioGroup, RadioGroupItem } from "@/app/_components/ui/radio-group";
import { Label } from "../ui/label";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";
export const FriendFilter = () => {
  const [openCriteria, setOpenCriteria] = useState(false);
  const style = openCriteria ? "block" : "";
  return (
    <div className="">
      <div className="mb-5">
        <h1 className="font-bold mb-1">Search:</h1>
        <div className="flex gap-2">
          <Input placeholder="name of the user" type="text" />
          <Button>
            <AiOutlineSearch />
          </Button>
        </div>
      </div>
      <div className={cn("mb-5 hidden md:block", style)}>
        <h1 className="font-bold mb-1">Distance:</h1>
        <RadioGroup defaultValue="comfortable">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="5km" id="r1" />
            <Label htmlFor="r1">{"<"}5Km</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="10km" id="r2" />
            <Label htmlFor="r2">{"<"}10Km</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="50km" id="r3" />
            <Label htmlFor="r3">{"<"}50Km</Label>
          </div>
        </RadioGroup>
      </div>
      <div className={cn("mb-5 hidden md:block", style)}>
        <h1 className="font-bold mb-1">Criteria:</h1>
        <div className="flex items-center gap-3">
          <Checkbox id="terms" />
          <Label>Relative with your friends.</Label>
        </div>
      </div>
      <Button className={cn("w-full hidden md:block", style)}>Filter</Button>
      <Button
        className={cn("w-full md:hidden", openCriteria && "hidden")}
        onClick={() => setOpenCriteria(true)}
      >
        More Criteria
      </Button>
    </div>
  );
};
