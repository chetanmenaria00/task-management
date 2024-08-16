// components/LottieBackground.js

import animationData from "@/utils/lottiefiles/background.json"; // Adjust the path if necessary
import LottieWrapper from "./LottieWrapper";

const LottieBackground = () => {
  return (
    <div className="inset-0 w-full h-full">
      <LottieWrapper
        autoplay
        className="!opacity-[0.3]"
        loop
        animationData={animationData}
      />
    </div>
  );
};

export default LottieBackground;
