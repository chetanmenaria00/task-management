import { axiosInstance } from "@/utils/axios/axiosInstance";
import { useQuery } from "@tanstack/react-query";

export interface Root {
    code: number;
    message: string;
    data: Task;
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

const fetchTask = async (id: string): Promise<Root> => {
    const response = await axiosInstance.get<Root>("/tasks/get-one", {
        params: { id }, // Use object syntax for query params
    });
    console.log("response.data", response.data)
    return response.data as Root;
};

function useFetchOneTask(id: string) {
    return useQuery({
        queryKey: ["one-task","userEmail"],
        queryFn: () => fetchTask(id),
    });
}

export default useFetchOneTask;
