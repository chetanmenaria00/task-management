"use client";

import Notification from "@/component/Notification";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import signup from "@/utils/lottiefiles/signup.json";
import LottieWrapper from "@/component/LottieWrapper";

type Inputs = {
  name: string;
  email: string;
  password: string;
};

export default function Page() {
  const [error, setError] = useState(false);
  const [logIn, setLogIn] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [errorType, setErrorType] = useState<"error" | "success" | "info">(
    "error"
  );
  const router = useRouter();
  const handleRequest = (user: {
    email: string;
    password: string;
    name: string;
  }) => {
    const axios = require("axios");
    let data = JSON.stringify({
      name: user.name,
      email: user.email,
      password: user.password,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://localhost:8080/api/users/register",
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response: any) => {
        console.log("response", response);
        const data: any = response.data;
        console.log("data", data);
        if (response.status !== 200) {
          console.log("response.status", response.status);
          setError(true);
          setErrorMessage("Some Internal Error!");
          setTimeout(() => {
            setError(false);
          }, 5000);
        } else if (data.code === 201) {
          console.log("data.code", data.code);
          setErrorMessage(data.message);
          setErrorType("success");
          localStorage.setItem("authToken", data.data.token);
          router.push("/tasks");
        } else if (data.code === 409) {
          console.log("data", data);
          console.log("data.message", data.message);
          setError(true);
          setErrorMessage(data.message);
          setErrorType("error");
          setTimeout(() => {
            setError(false);
          }, 5000);
          setLogIn(true);
        } else {
          console.log("data", data);
          console.log("data.message", data.message);
          setError(true);
          setErrorMessage(data.message);
          setErrorType("error");
          setTimeout(() => {
            setError(false);
          }, 5000);
        }
      })
      .catch((error: any) => {
        console.log("error", error);
        setError(true);
        setErrorMessage("Some Internal Error!");
        setErrorType("error");
        setTimeout(() => {
          setError(false);
        }, 5000);
      });
  };

  // form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    handleRequest(data);
  };

  return (
    <>
      {error && <Notification message={errorMessage} type={errorType} />}
      <div className="w-full h-[100vh] flex items-center justify-center">
        <div className="flex w-full h-full justify-center items-center">
          <div className="flex w-full h-full justify-center items-center">
            <div className="flex w-full h-full justify-center items-center">
              <LottieWrapper animationData={signup} loop autoPlay />
            </div>
          </div>
          <div className="flex flex-col gap-6 w-full h-full justify-center items-center bg-[rgb(255,112,0)] opacity-90 px-5 rounded-s-full">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="flex flex-col items-center justify-center gap-6 w-full border-[2px] border-[rgb(13,21,29)] py-32 rounded-s-full border-r-0"
            >
              <div className="mt-3 flex flex-col w-full items-center gap-2">
                <input
                  className="h-12 px-2 w-10/12 border border-black rounded-xl"
                  type="text"
                  placeholder="name"
                  {...register("name", { required: true })}
                />
                {errors.name && <span>name is required..</span>}
              </div>

              <div className="mt-3 flex flex-col w-full items-center gap-2">
                <input
                  className="h-12 px-2 w-10/12 border border-black rounded-xl"
                  type="email"
                  placeholder="email"
                  {...register("email", { required: true })}
                />
                {errors.email && <span>email is required..</span>}
              </div>

              <div className="mt-3 flex flex-col w-full items-center gap-2">
                <input
                  className="h-12 px-2 w-10/12 border border-black rounded-xl"
                  type="password"
                  placeholder="password"
                  {...register("password", { required: true })}
                />
                {errors.password && <span>password is required..</span>}
              </div>

              <button
                className="h-12 px-2 w-10/12 border border-black rounded-xl mt-3 hover:bg-[rgb(217,217,209)] font-bold transition-all delay-100 ease-in"
                type="submit"
              >
                Submit
              </button>
            </form>
            {logIn && (
              <Link href={"/auth/login"}>
                <p className="text-white bg-[rgb(40,60,70)] px-12 rounded-xl py-4">
                  Try using LogIn!
                </p>
              </Link>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
