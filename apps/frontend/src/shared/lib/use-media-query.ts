import { useEffect, useState } from "react";

export const useMediaQuery = (query: string) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);

    const documentChangeHandler = () => setMatches(mediaQueryList.matches);

    mediaQueryList.addEventListener("change", documentChangeHandler);
    documentChangeHandler();

    return () => {
      mediaQueryList.removeEventListener("change", documentChangeHandler);
    };
  }, [query]);

  return matches;
};

export const useIsMobileDevice = () => useMediaQuery("(max-width: 768px)");

export const useIsDesktopDevice = () => useMediaQuery("(min-width: 769px)");

export const useIsAboveLaptopDevice = () =>
  useMediaQuery("(max-width: 1024px)");
