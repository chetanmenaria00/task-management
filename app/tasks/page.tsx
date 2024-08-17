"use client"; // Ensures the component is rendered on the client side

import LoadingTextAnimation from "@/component/Loading";
import LottieWrapper from "@/component/LottieWrapper";
import TaskCard from "@/component/taskCard";
import { setAuthToken } from "@/utils/axios/axiosInstance";
import { useLoading } from "@/utils/context/showNotification";
import useFetchTask from "@/utils/datafetching/useFetchTasks";
import above from "@/utils/lottiefiles/above.json";
import empty from "@/utils/lottiefiles/empty.json";
import { useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter } from "next/navigation";

function Page() {
  const queryClient = useQueryClient();
  const { data, isLoading, isError } = useFetchTask();
  console.log("data", data);
  console.log("data?.data", data?.data);
  const router = useRouter();
  const handleLogout = () => {
    setAuthToken("");
    localStorage.removeItem("authToken");
    router.push("/auth/login");
    queryClient.invalidateQueries({ queryKey: ["all-task"] });
    queryClient.invalidateQueries({ queryKey: ["one-task"] });
  };
  if (isLoading || isError) {
    return <LoadingTextAnimation />;
  }
  return (
    <div className="text-black flex flex-col w-full gap-6">
      <div className="w-full flex justify-between gap-2 md:gap-0">
        <Link href={"/tasks/create"}>
          <button className="px-10 py-4 rounded-xl bg-[rgb(13,198,184)] text-white font-semibold hover:animate-pulse">
            Create Task
          </button>
        </Link>
        <button
          onClick={handleLogout}
          className="px-10 py-4 rounded-xl bg-[rgb(255,99,72)] text-white font-semibold hover:animate-pulse"
        >
          Logout
        </button>
      </div>
      {data?.data?.length === 0 ? (
        <div className="w-full flex flex-col justify-center items-center">
          <LottieWrapper
            animationData={above}
            loop
            autoPlay
            className="absolute top-20 md:left-3 lg:left-0 md:top-24 w-[200px]"
          />
          <h1 className="text-xl mt-28 lg:mt-0 md:text-4xl">
            No tasks, please create one!
          </h1>
          <LottieWrapper
            animationData={empty}
            loop
            className="w-3/4 md:w-1/4"
          />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:p-8">
          {data?.data?.map((task) => (
            <TaskCard
              key={task._id}
              title={task.title}
              description={task.description}
              priority={task.priority}
              status={task.status}
              id={task._id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Page;
