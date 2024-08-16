"use client";
import Notification from "@/component/Notification";
import TaskForm from "@/component/TaskForm";
import { axiosInstance } from "@/utils/axios/axiosInstance";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
const Page = () => {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  type Inputs = {
    title: string;
    description: string;
    priority: string;
    status: string;
  };

  const { isSuccess, isError, isPending, mutate, data } = useMutation({
    mutationFn: async (data: Inputs) => {
      const res = await axiosInstance.post<any>("/tasks/create", data);
      console.log("res.data", res.data);
    },
  });
  const handleRequest = (data: any) => {
    mutate(data);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
    handleRequest(data);
  };
  useEffect(() => {
    if (isSuccess) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        router.push("/tasks");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isSuccess, router]);
  return (
    <div className="w-full flex flex-col items-center">
      {isPending && <Notification message={"Adding Task..."} type={"info"} />}
      {showNotification && (
        <Notification message={"Added Task!"} type={"success"} />
      )}
      <div className="w-full flex justify-center md:justify-start">
        <Link href={"/tasks"}>
          <button className="lg:ml-16 px-16 py-4 rounded-xl bg-[rgb(13,198,184)] text-white font-semibold hover:animate-pulse">
            Back
          </button>
        </Link>
      </div>
      <h1 className="text-2xl lg:text-4xl mb-3 font-semibold text-green-500">
        Create a new Task!
      </h1>
      <TaskForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isPending={isPending}
      />
    </div>
  );
};

export default Page;
