import { useSyncExternalStore } from "react";

import { MOBILE_BREAKPOINT_PX } from "@/constants/config";

const MEDIA_QUERY = `(max-width: ${MOBILE_BREAKPOINT_PX - 1}px)`;

function getSnapshot(): boolean {
    return window.matchMedia(MEDIA_QUERY).matches;
}

function getServerSnapshot(): boolean {
    return false;
}

function subscribe(callback: () => void): () => void {
    const mql = window.matchMedia(MEDIA_QUERY);

    mql.addEventListener("change", callback);

    return () => mql.removeEventListener("change", callback);
}

export function useIsMobile(): boolean {
    return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
