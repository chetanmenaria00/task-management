import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BE_API,
});

const setAuthToken = (token: string) => {
  axiosInstance.defaults.headers["Authorization"] = `Bearer ${token}`;
};

export { axiosInstance, setAuthToken };
