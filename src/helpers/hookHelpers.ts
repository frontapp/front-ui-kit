import {useCallback, useEffect, useRef} from "react";

/*
 * Use Timeout.
 */

/** Returns a setTimeout-like function that clears the previous timeout when re-invoked or when the component unmounts. */
export function useTimeout(): [(handler: () => void, timeout?: number) => void, () => void] {
  const handleRef = useRef<number>();

  useEffect(() => () => clearTimeout(handleRef.current), []);

  const safeSetTimeout = useCallback((handler: () => void, timeout?: number) => {
    clearTimeout(handleRef.current);
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions, @typescript-eslint/no-explicit-any
    handleRef.current = setTimeout(handler, timeout) as any;
  }, []);
  const safeClearTimeout = useCallback(() => clearTimeout(handleRef.current), []);

  return [safeSetTimeout, safeClearTimeout];
}