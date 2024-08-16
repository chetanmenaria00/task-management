"use client";

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { setAuthToken } from './axios/axiosInstance';
import { useLoading } from './context/showNotification';

const useAuth = () => {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading, setIsLoading } = useLoading();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (!isMounted) return;

    setIsLoading(true); // Start loading when checking auth

    const token = localStorage.getItem('authToken');

    if (!token || token === "") {
      setIsLoading(false); // Stop loading before redirecting
      router.push("/auth/login");
    } else {
      setAuthToken(token); // Set auth token if available
      setIsLoading(false); // Stop loading after setting token
    }
  }, [isMounted, router, setIsLoading]);

  return isLoading;
};

export default useAuth;
