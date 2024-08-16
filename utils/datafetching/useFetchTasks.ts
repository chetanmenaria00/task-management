import { axiosInstance } from "@/utils/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export interface Root {
  code: number;
  message: string;
  data: Task[];
}

export interface Task {
  _id: string;
  user: string;
  title: string;
  description: string;
  priority: string;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

const fetchTask = async (): Promise<Root> => {
  return axiosInstance
    .get<Root>("/tasks/get")
    .then((res) => res.data);
};

function useFetchTask() {
  return useQuery({
    queryKey: ["all-task"],
    queryFn: fetchTask,
  });
}

export default useFetchTask;
