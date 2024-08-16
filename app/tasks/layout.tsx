"use client";

import LoadingTextAnimation from "@/component/Loading";
import { useLoading } from "@/utils/context/showNotification";
import useAuth from "@/utils/useAuth";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const isLoading = useAuth();
  const { isLoading: contextLoading } = useLoading();
  return (
    <div className="px-5 pt-10">{isLoading || contextLoading ? <LoadingTextAnimation /> : children}</div>
  );
};

export default Layout;
