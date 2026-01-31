import { useEffect, useState } from "react";

interface KeyPressOptions {
  targetKey: string;
  callback?: () => void;
}

const useKeyPress = (options: KeyPressOptions): boolean => {
  const { targetKey, callback } = options;
  const [keyPressed, setKeyPressed] = useState<boolean>(false);

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const matches = event.key === targetKey;
      setKeyPressed(matches);

      if (matches && callback) {
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    window.addEventListener("keyup", handler);

    return () => {
      window.removeEventListener("keydown", handler);
      window.removeEventListener("keyup", handler);
    };
  }, [targetKey, callback]);

  return keyPressed;
};

export default useKeyPress;
