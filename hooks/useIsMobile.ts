import { useEffect, useState } from "react";
import { MOBILE_BREAKPOINT_PX } from "@/constants/config";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`);

    function update() {
      setIsMobile(mql.matches);
    }

    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  return isMobile;
}
