import { useState, useEffect } from "react";

const useTimeTickerHook = (shouldStart: boolean, timeInMinues?: number) => {
  const [timeRemaining, setTimeRemaining] = useState(timeInMinues || 0);

  useEffect(() => {
    if (shouldStart) {
      setTimeout(() => {
        const subtractedTime = Math.max(0, timeRemaining - 1);
        setTimeRemaining(subtractedTime);
      }, 60000);
    }
  }, [shouldStart]);

  return { timeRemaining };
};
export default useTimeTickerHook;
