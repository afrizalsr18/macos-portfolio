import { INITIAL_Z_INDEX, WINDOW_CONFIG } from '#constants';
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Typed store for window management
export type WindowKey = keyof typeof WINDOW_CONFIG;

type WindowState = {
    isOpen: boolean;
    zIndex: number;
    data: unknown | null;
};

type WindowsConfig = Record<WindowKey, WindowState>;

interface WindowStore {
    windows: WindowsConfig;
    nextZIndex: number;
    openWindow: (windowKey: WindowKey, data?: unknown | null) => void;
    closeWindow: (windowKey?: WindowKey | null) => void;
    focusWindow: (windowKey: WindowKey) => void;
}

const useWindowStore = create<WindowStore>()(immer((set) => ({
    windows: WINDOW_CONFIG as unknown as WindowsConfig,
    nextZIndex: INITIAL_Z_INDEX + 1,

    openWindow: (windowKey: WindowKey, data = null) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = true;
        win.zIndex = state.nextZIndex;
        win.data = data ?? win.data;
        state.nextZIndex++;
    }),
    closeWindow: (windowKey = null) => set((state) => {
        if (!windowKey) return; // no-op if no key provided
        const win = state.windows[windowKey];
        if (!win) return;
        win.isOpen = false;
        win.zIndex = INITIAL_Z_INDEX;
        win.data = null;
        state.nextZIndex++;
    }),
    focusWindow: (windowKey: WindowKey) => set((state) => {
        const win = state.windows[windowKey];
        if (!win) return;
        win.zIndex = state.nextZIndex++;
    })
})),
);

export default useWindowStore