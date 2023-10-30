"use client";
import React, { useCallback, useState } from "react";
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
import { zUserRegisterStepOne, ztUserRegisterStepOne } from "@/Types/User";
import { RegisterThirdStep } from "./RegisterThirdStep";

type Step = "STEP_ONE" | "STEP_TWO" | "STEP_THREE";
export const Register = () => {
  const [user, setUser] = useState<ztUserRegisterStepOne>({
    email: "",
    username: "",
    gender: "male",
    password: "",
  });

  const [step, setStep] = useState<Step>("STEP_ONE");
  const changeUser = useCallback(
    (userInfo: ztUserRegisterStepOne) => {
      const parsedUserInfo = zUserRegisterStepOne.parse(userInfo);
      setUser(parsedUserInfo);
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
