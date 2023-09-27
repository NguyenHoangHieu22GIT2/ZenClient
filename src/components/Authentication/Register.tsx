"use client";
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
import { RegisterThirdStep } from "./RegisterThirdStep";
import { StepBack } from "lucide-react";

type Step = "STEP_ONE" | "STEP_TWO" | "STEP_THREE";
export const Register = () => {
  const [user, setUser] = useState<Partial<User>>({
    email: "",
    username: "",
    gender: "male",
    password: "",
  });

  const [step, setStep] = useState<Step>("STEP_ONE");
  const changeUser = useCallback(
    (userInfo: Partial<User>) => {
      setUser(userInfo);
    },
    [user]
  );
  const goBackStep = useCallback(() => {
    setStep("STEP_ONE");
  }, [setStep]);
  const nextStep = useCallback(() => {
    setStep("STEP_TWO");
  }, [setStep]);
  const finishStep = useCallback(() => {
    setStep("STEP_THREE");
  }, [setStep]);
  let registerStepElement = (
    <RegisterFirstStep onSetUser={changeUser} onChangeStep={nextStep} />
  );
  if (step === "STEP_TWO") {
    registerStepElement = (
      <RegisterSecondStep
        user={user}
        onStepBack={goBackStep}
        onFinishStep={finishStep}
      />
    );
  } else if (step === "STEP_THREE") {
    registerStepElement = <RegisterThirdStep />;
  }
  return (
    <Card className="m-2 h-screen flex flex-col justify-center shadow-lg">
      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>Register</span>
          {/* {step == "STEP_TWO" && <Button onClick={goBackStep}>Back</Button>} */}
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
