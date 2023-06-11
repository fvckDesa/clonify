import { useLayoutEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useScrollRestoration() {
  const location = useLocation();
  const ref = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    if (!ref.current) return;

    ref.current.scrollTo({
      top: 0,
    });
  }, [location.pathname]);

  return ref;
}
