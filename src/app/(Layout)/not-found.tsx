"use client";
import { Button } from "@/components/ui/button";
import Modal from "@/components/uiOwnCreation/Modal";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="absolute w-full h-full top-0 left-0">
      <Modal className="top-1/2 left-1/2 text-center flex flex-col items-center justify-center  -translate-x-1/2 -translate-y-1/2  rounded-sm bg-blue-200 p-5 w-1/4 aspect-video">
        <h2 className="font-bold text-lg ">Not Found</h2>
        <p className="italic">Could not find requested resource</p>
        <Button variant={"secondary"} asChild>
          <Link href="/">Return Home</Link>
        </Button>
      </Modal>
    </div>
  );
}
