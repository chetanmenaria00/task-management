"use client";

import LottieWrapper from "@/component/LottieWrapper";
import welcome from "@/utils/lottiefiles/welcome.json";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="flex flex-col items-center justify-center absolute top-0 z-20 w-full">
        <div className="w-1/2">
          <LottieWrapper animationData={welcome} loop />
        </div>
        <Link href={"/tasks"}>
          <button className="py-5 px-10 rounded-xl font-semibold text-xl bg-[rgb(255,152,29)] text-white hover:bg-purple-600 hover:rounded-3xl transition-all hover:animate-pulse delay-100  ">
            Start Now..
          </button>
        </Link>
      </div>
    </div>
  );
}
