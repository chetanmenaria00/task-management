"use client";

import LoadingTextAnimation from "@/component/Loading";
import Notification from "@/component/Notification";
import TaskForm from "@/component/TaskForm";
import { axiosInstance } from "@/utils/axios/axiosInstance";
import useFetchOneTask from "@/utils/datafetching/useFetchTask";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

interface Props {
  params: { id: string };
}

type Inputs = {
  title: string;
  description: string;
  priority: string;
  status: string;
};

const Page: React.FC<Props> = ({ params: { id } }) => {
  const router = useRouter();
  const [showNotification, setShowNotification] = useState(false);
  const { data, isLoading, isError } = useFetchOneTask(id);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm<Inputs>({
    defaultValues: {
      title: "",
      description: "",
      priority: "",
      status: "",
    },
  });

  useEffect(() => {
    if (data) {
      reset({
        title: data.data.title,
        description: data.data.description,
        priority: data.data.priority,
        status: data.data.status,
      });
    }
  }, [data, reset]);

  // const { isSuccess, isError, isPending, mutate, data } = useMutation({
  const mutation = useMutation({
    mutationFn: async (data: Inputs) => {
      const res = await axiosInstance.put<any>(`/tasks/update/${id}`, data);
      console.log("res.data", res.data);
    },
  });

  const handleRequest = (data: any) => {
    mutation.mutate(data);
  };

  const onSubmit: SubmitHandler<Inputs> = (formData) => {
    console.log(formData);
    handleRequest(formData);
  };

  useEffect(() => {
    if (mutation.isSuccess) {
      setShowNotification(true);
      const timer = setTimeout(() => {
        setShowNotification(false);
        router.push("/tasks");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [mutation.isSuccess, router]);

  if (isLoading) {
    return <LoadingTextAnimation />;
  }

  if (isError) {
    return <div>Error loading task.</div>;
  }

  return (
    <div className="w-full flex flex-col items-center">
      {mutation.isPending && (
        <Notification message={"Updating Task..."} type={"info"} />
      )}
      {showNotification && (
        <Notification message={"Updated Task!"} type={"success"} />
      )}
      <div className="w-full flex justify-center md:justify-start">
        <Link href={"/tasks"}>
          <button className="lg:ml-16 px-16 py-4 rounded-xl bg-[rgb(13,198,184)] text-white font-semibold hover:animate-pulse">
            Back
          </button>
        </Link>
      </div>
      <h1 className="text-2xl lg:text-4xl mb-3 font-semibold text-green-500">
        Update Task!
      </h1>
      <TaskForm
        handleSubmit={handleSubmit}
        onSubmit={onSubmit}
        register={register}
        errors={errors}
        isPending={!isDirty}
      />
    </div>
  );
};

export default Page;
