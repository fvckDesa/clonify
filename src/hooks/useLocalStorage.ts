import { useState, useEffect, useCallback, SetStateAction } from "react";

type InitState<T> = T | (() => T);
type ParseJsonFn = (key: string, value: unknown) => unknown;

export function useLocalStorage<T>(
  key: string,
  init: InitState<T>,
  parseJsonFn?: ParseJsonFn
) {
  const [state, setState] = useState<T>(init);

  const setLocalStorage = useCallback(
    (newState: SetStateAction<T>) => {
      setState((prev) => {
        const state = newState instanceof Function ? newState(prev) : newState;
        localStorage.setItem(key, JSON.stringify(state));
        return state;
      });
    },
    [key]
  );

  useEffect(() => {
    const item = localStorage.getItem(key);
    if (!item) return;
    setState(JSON.parse(item, parseJsonFn));
  }, [key, parseJsonFn]);

  return [state, setLocalStorage] as const;
}
