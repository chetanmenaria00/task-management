import React from "react";

const TaskForm = ({
  handleSubmit,
  onSubmit,
  register,
  errors,
  isPending,
}: any) => {
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col items-center justify-center gap-6 w-full lg:w-3/4"
    >
      <div className="mt-3 flex flex-col w-full items-center gap-2">
        <input
          className="h-12 px-3 w-10/12 border-[2px] border-black rounded-xl"
          type="text"
          placeholder="title"
          {...register("title", { required: true })}
        />
        {errors.title && (
          <span className="text-red-600 w-10/12 capitalize">
            {errors.title[0]}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-col w-full items-center gap-2">
        <input
          className="h-12 px-3 w-10/12 border-[2px] border-black rounded-xl"
          type="description"
          placeholder="description"
          {...register("description", { required: true })}
        />
        {errors.description && (
          <span className="text-red-600 w-10/12 capitalize">
            {errors.description[0]}
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-col w-full items-center gap-2">
        <label htmlFor="priority" className="w-10/12 text-lg font-semibold">
          Priority:
        </label>
        <select
          className="h-12 px-3 w-10/12 border-[2px] border-black rounded-xl"
          {...register("priority")}
        >
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        {errors.priority && (
          <span className="text-red-600 w-10/12 capitalize">
            {errors.priority[0]}
          </span>
        )}
      </div>

      <div className="mt-2 flex flex-col w-full items-center gap-2">
        <label htmlFor="status" className="w-10/12 text-lg font-semibold">
          Status:
        </label>
        <select
          className="h-12 px-3 w-10/12 border-[2px] border-black rounded-xl"
          {...register("status")}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>
        {errors.status && (
          <span className="text-red-600 w-10/12 capitalize">
            {errors.status[0]}
          </span>
        )}
      </div>

      <button
        className="h-12 px-2 w-10/12 border-[2px] border-black rounded-xl mt-3 hover:bg-[rgb(40,60,70)] opacity-80 hover:text-white font-bold transition-all delay-100 ease-in"
        type="submit"
        disabled={isPending}
      >
        Submit
      </button>
    </form>
  );
};

export default TaskForm;
