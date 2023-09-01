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
import axios from "axios";
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
export const Register = () => {
  const createUserMutation = useMutation({
    mutationFn: (newUser: User) => {
      return api.post("/users/register", newUser).then((data) => data.data);
    },
  });
  const [user, setUser] = useState<Partial<User>>({});
  const [step, setStep] = useState(1);
  const nextStep = useCallback(
    (userInfo: Partial<User>) => {
      if (step == 1) {
        setUser((oldUser) => ({ ...oldUser, ...userInfo }));
      }
      setStep((oldStep) => ++oldStep);
    },
    [setStep, setUser, step],
  );
  const finishStep = useCallback(
    (userInfo: Partial<User>) => {
      setUser((oldUser) => ({ ...oldUser, ...userInfo }));
      setStep(3);
    },
    [setUser],
  );
  useEffect(() => {
    if (step === 3) {
      const theUser = user as User;
      const avatar = theUser.avatar as File;
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
  if (step >= 2) {
    registerStepElement = <RegisterSecondStep onFinishStep={finishStep} />;
  }
  const goBackStep = useCallback(() => {
    setStep((oldStep) => --oldStep);
  }, [setStep]);
  return (
    <Card className="m-2 w-[80vw] max-w-[500px] min-w-[300px] shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Register</span>
          {step > 1 && <Button onClick={goBackStep}>Back</Button>}
        </CardTitle>
        <CardDescription>
          Become a user of one of the best Social media
        </CardDescription>
        <CardDescription className="font-semibold flex gap-2">
          <span
            className={`${step == 1 ? "text-blue-300 font-bold" : "text-gray-500"
              }`}
          >
            Step 1
          </span>
          <span>-{">"}</span>
          <span
            className={`${step == 2 ? "text-blue-300 font-bold" : "text-gray-500"
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
