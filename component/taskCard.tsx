import { axiosInstance } from "@/utils/axios/axiosInstance";
import deleteIcon from "@/utils/icons/delete.svg";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Notification from "./Notification";
import Image from "next/image";

interface CardProps {
  title: string;
  description: string;
  priority: string;
  status: string;
  id: string;
}

const TaskCard: React.FC<CardProps> = ({
  title,
  description,
  priority,
  id,
  status,
}) => {
  const queryClient = useQueryClient();
  const [showNotification, setShowNotification] = useState(false);
  const { mutate, isError, isSuccess, isPending } = useMutation({
    mutationFn: async (id: string) => {
      const res = await axiosInstance.delete<any>(`/tasks/delete/${id}`);
      console.log("res.data", res.data);
    },
  });
  useEffect(() => {
    if (isSuccess) {
      setShowNotification(true);

      const timer = setTimeout(() => {
        setShowNotification(false);
      }, 5000);
      queryClient.invalidateQueries({ queryKey: ["all-task"] });

      return () => clearTimeout(timer);
    }
  }, [isSuccess, queryClient]);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this task?")) {
      mutate(id);
    }
  };

  return (
    <div className="relative bg-green-200 shadow-lg rounded-lg overflow-hidden border border-gray-200 flex flex-col">
      {isPending && <Notification message={"Deleting Task..."} type={"info"} />}
      {showNotification && (
        <Notification message={"Deleted Task!"} type={"success"} />
      )}
      <div className="absolute right-2 top-2">
        <button onClick={() => handleDelete(id)}>
          <Image src={deleteIcon} alt="delete icon" />
        </button>
      </div>
      <Link href={`tasks/${id}`}>
        <div className="p-6 flex-1">
          <h2 className="text-2xl break-words font-semibold text-gray-800 mb-2">
            {title}
          </h2>
          <p className="text-gray-600 mb-4 break-words">{description}</p>
          <div className="flex justify-between items-center">
            <span className="text-sm break-words font-medium text-gray-700">Priority:</span>
            <span
              className={`px-2 py-1 rounded text-xs break-words font-semibold ${getPriorityColor(
                priority
              )}`}
            >
              {priority}
            </span>
          </div>
          <div className="flex justify-between items-center mt-2">
            <span className="text-sm break-words font-medium text-gray-700">Status:</span>
            <span
              className={`px-2 py-1 rounded text-xs break-words font-semibold ${getStatusColor(
                status
              )}`}
            >
              {status}
            </span>
          </div>
        </div>
      </Link>
    </div>
  );
};

// Utility function to get priority color
const getPriorityColor = (priority: string) => {
  switch (priority.toLowerCase()) {
    case "high":
      return "bg-red-500";
    case "medium":
      return "bg-yellow-500";
    case "low":
      return "bg-green-500";
    default:
      return "bg-gray-500";
  }
};

// Utility function to get status color
const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "pending":
      return "bg-yellow-500";
    case "completed":
      return "bg-green-500";
    case "in-progress":
      return "bg-blue-500";
    default:
      return "bg-gray-500";
  }
};

export default TaskCard;
