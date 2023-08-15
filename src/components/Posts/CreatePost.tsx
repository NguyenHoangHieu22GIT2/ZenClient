import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import Image from "next/image";
import { Container } from "../ui/Container";

export const CreatePost = (props: {}) => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploadFile, setUploadFile] = useState<boolean>(false);
  const onDrop = useCallback(
    (files: File[]) => {
      let isValid = true;
      files.forEach((file) => {
        if (
          !file.type.endsWith("jpg") &&
          !file.type.endsWith("jpeg") &&
          !file.type.endsWith("png")
        ) {
          isValid = false;
        }
      });
      isValid &&
        setFiles((prevArray: File[]) => {
          return [...prevArray, ...files];
        });
    },
    [setFiles],
  );
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });
  let uploadFileButton = !uploadFile ? (
    <Button
      onClick={() => {
        setUploadFile(true);
      }}
    >
      Image
    </Button>
  ) : (
    <Button
      onClick={() => {
        setUploadFile(false);
        setFiles([]);
      }}
    >
      Clear
    </Button>
  );
  let uploadFileElement;
  if (uploadFile) {
    uploadFileElement = (
      <>
        {" "}
        <div
          {...getRootProps()}
          className="p-3 border border-slate-400/70 rounded-sm text-slate-400/90"
        >
          <Input name="file0" {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <p>
              Drag &apos; n &apos; drop some files here, or click to select
              files
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          {files.length > 0 &&
            files.map((image, index) => {
              return (
                <div key={index} className="relative">
                  <Image
                    src={`${URL.createObjectURL(image)}`}
                    alt=""
                    width={200}
                    height={200}
                  />
                  <span
                    className="absolute top-1 right-1 px-3 py-1 rounded-full cursor-pointer text-zinc-50 bg-slate-700/30"
                    onClick={() => {
                      setFiles((prevArray) => {
                        return prevArray.filter(
                          (file) => file.name !== image.name,
                        );
                      });
                    }}
                  >
                    X
                  </span>
                </div>
              );
            })}
        </div>
      </>
    );
  }
  return (
    <Card className="m-2">
      <Container>
        <CardHeader>
          <CardTitle>Express Yourself</CardTitle>
          <CardDescription>Show yourself to the world!</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <Textarea placeholder="John, How do you feel? ☺️" />
            <div className="mt-4">{uploadFileElement}</div>
          </form>
        </CardContent>
        <CardFooter className="flex gap-3 items-center">
          {uploadFileButton}
          <Button>Post</Button>
        </CardFooter>
      </Container>
    </Card>
  );
};
