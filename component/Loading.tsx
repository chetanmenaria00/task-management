import LoadingAnimation from "@/utils/lottiefiles/loading.json";
import LottieWrapper from "./LottieWrapper";

function LoadingTextAnimation() {
  return <LottieWrapper animationData={LoadingAnimation} loop />;
}

export default LoadingTextAnimation;
