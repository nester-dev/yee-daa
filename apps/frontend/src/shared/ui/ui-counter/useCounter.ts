import { useCallback, useState } from "react";

type Params = {
  initialValue: number;
  minValue?: number;
  maxValue?: number;
};

export const useCounter = ({
  initialValue,
  minValue = 1,
  maxValue = 999,
}: Params) => {
  const [count, setCount] = useState(initialValue);

  const handleDecrement = useCallback(() => {
    if (count > minValue) {
      setCount((count) => count - 1);
    }
  }, [minValue, count]);

  const handleIncrement = useCallback(() => {
    if (count < maxValue) {
      setCount((count) => count + 1);
    }
  }, [maxValue, count]);

  return {
    count,
    handleDecrement,
    handleIncrement,
  };
};
