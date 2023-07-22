import { useEffect, useState, useRef, useCallback } from "react";

export const useStateWithCallback = <T>(initialState: T) => {
  const [state, setState] = useState<T>(initialState);

  const callbackRef = useRef<((state: T) => void) | null>(null);

  const updateState = useCallback(
    (newState: T | ((prev: T) => T), callback?: (state: T) => void) => {
      if (callback) {
        callbackRef.current = callback;
      }

      setState((prev) =>
        typeof newState === "function"
          ? (newState as (prev: T) => T)(prev)
          : newState
      );
    },
    []
  );

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  return [state, updateState] as const;
};
