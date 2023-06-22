import {
  ReactNode,
  RefObject,
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

interface ScrollPos {
  top: number;
  left: number;
}

const ScrollCtx = createContext<ScrollPos | null>(null);

interface ScrollProviderProps {
  element: RefObject<HTMLElement>;
  children: ReactNode | ReactNode[];
}

export function ScrollProvider({ element, children }: ScrollProviderProps) {
  const [scroll, setScroll] = useState<ScrollPos>({ top: 0, left: 0 });

  const onScroll = useCallback((e: Event) => {
    if (!e.target || !(e.target instanceof HTMLElement)) return;

    setScroll({
      top: e.target.scrollTop,
      left: e.target.scrollLeft,
    });
  }, []);

  useEffect(() => {
    const el = element.current;
    el?.addEventListener("scroll", onScroll);
    return () => el?.removeEventListener("scroll", onScroll);
  }, [element, onScroll]);

  return <ScrollCtx.Provider value={scroll}>{children}</ScrollCtx.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useScroll() {
  const ctx = useContext(ScrollCtx);
  if (!ctx) {
    throw new Error('"useScroll" required a "ScrollProvide"');
  }

  return ctx;
}
