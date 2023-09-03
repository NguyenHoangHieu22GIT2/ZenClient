import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Separator } from "../ui/separator";
import { RegisterFirstStep } from "./RegisterFirstStep";
import { RegisterSecondStep } from "./RegisterSecondStep";
import { Button } from "../ui/button";
import { User } from "@/Types/User";
import { useMutation } from "@tanstack/react-query";
import { api } from "@/lib/axios.api";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "../../lib/firebase";
import { v4 } from "uuid";

type Step = "STEP_ONE" | "STEP_TWO" | "STEP_THREE";
export const Register = () => {
  const createUserMutation = useMutation({
    mutationFn: (newUser: User) => {
      return api.post("/users/register", newUser).then((data) => data.data);
    },
  });
  const [user, setUser] = useState<Partial<User>>({});
  const [step, setStep] = useState<Step>("STEP_ONE");
  const nextStep = useCallback(
    (userInfo: Partial<User>) => {
      if (step == "STEP_ONE") {
        setUser((oldUser) => ({ ...oldUser, ...userInfo }));
      }
      setStep("STEP_TWO");
    },
    [setStep, setUser, step]
  );
  const finishStep = useCallback(
    (userInfo: Partial<User>) => {
      setUser((oldUser) => ({ ...oldUser, ...userInfo }));
      setStep("STEP_THREE");
    },
    [setUser]
  );
  useEffect(() => {
    if (step === "STEP_THREE") {
      const theUser = user as User;
      const avatar = theUser.avatarFile;
      const avatarName = v4() + avatar.name;
      const imageRef = ref(storage, `images/${avatarName}`);
      uploadBytes(imageRef, avatar).then((snapshot) => {
        getDownloadURL(snapshot.ref);
      });
      //TODO: Send the request to server (Nest.JS)
      createUserMutation.mutate({
        ...theUser,
        avatar: avatarName,
      });
    }
  }, [step]);
  let registerStepElement = (
    <RegisterFirstStep user={user} onChangeStep={nextStep} />
  );
  if (step == "STEP_TWO") {
    registerStepElement = <RegisterSecondStep onFinishStep={finishStep} />;
  }
  const goBackStep = useCallback(() => {
    setStep("STEP_ONE");
  }, [setStep]);
  return (
    <Card className="m-2 w-[80vw] max-w-[500px] min-w-[300px] shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Register</span>
          {step == "STEP_TWO" && <Button onClick={goBackStep}>Back</Button>}
        </CardTitle>
        <CardDescription>
          Become a user of one of the best Social media
        </CardDescription>
        <CardDescription className="font-semibold flex gap-2">
          <span
            className={`${
              step == "STEP_ONE" ? "text-blue-300 font-bold" : "text-gray-500"
            }`}
          >
            Step 1
          </span>
          <span>-{">"}</span>
          <span
            className={`${
              step == "STEP_TWO" ? "text-blue-300 font-bold" : "text-gray-500"
            }`}
          >
            Step 2
          </span>
        </CardDescription>
        <Separator />
      </CardHeader>
      <CardContent>{registerStepElement}</CardContent>
    </Card>
  );
};
// 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
