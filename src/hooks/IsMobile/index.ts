import { useEffect, useState } from "react";

const breakpoints = {
  desktop: 1224,
  tablet: 768,
};

const initialState = {
  isDesktop: false,
  isMobile: false,
  isTablet: false,
};

const useDeviceDetection = () => {
  const [windowWidth, setWindowWidth] = useState(window.outerWidth);
  const [device, setDevice] = useState(initialState);

  useEffect(() => {
    function handleResize() {
      if (window.outerWidth >= breakpoints.desktop) {
        setDevice({ ...initialState, isDesktop: true });
      } else if (window.outerWidth >= breakpoints.tablet) {
        setDevice({ ...initialState, isTablet: true });
      } else {
        setDevice({ ...initialState, isTablet: true });
      }

      setWindowWidth(window.outerWidth);
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return { ...device, windowWidth };
};

export default useDeviceDetection;
