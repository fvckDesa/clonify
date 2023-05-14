import { useRef, useState, useLayoutEffect, useCallback } from "react";

export function useColumns<E extends HTMLElement>(minWidth: number) {
  const ref = useRef<E>(null);
  const [numColumns, setNumColumns] = useState(1);

  const calculateColumns = useCallback(() => {
    const width = ref.current?.clientWidth ?? 0;
    setNumColumns(Math.max(Math.floor(width / minWidth), 1));
  }, [minWidth]);

  useLayoutEffect(() => {
    calculateColumns();
    window.addEventListener("resize", calculateColumns);
    return () => window.removeEventListener("resize", calculateColumns);
  }, [calculateColumns]);

  return {
    ref,
    numColumns,
  };
}
