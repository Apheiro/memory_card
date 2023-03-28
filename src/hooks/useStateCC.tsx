import { useState, useEffect, useRef, SetStateAction } from "react";

export default function useStateCC<T>(initialState: T) {
    const [state, setState] = useState(initialState);
    const callback = useRef<((state?: T) => void) | undefined>();
    const setStateCC = (newState: SetStateAction<T>, cb?: (state?: T) => void) => {
        setState(newState);
        callback.current = cb;
    };
    useEffect(() => {
        callback.current?.(state);
    }, [state]);
    return [state, setStateCC] as const;
}