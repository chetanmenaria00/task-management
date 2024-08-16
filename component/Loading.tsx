import LoadingAnimation from "@/utils/lottiefiles/loading.json";
import LottieWrapper from "./LottieWrapper";

function LoadingTextAnimation() {
  return <LottieWrapper animationData={LoadingAnimation} loop className="h-[90vh] overflow-hidden" />;
}

export default LoadingTextAnimation;
