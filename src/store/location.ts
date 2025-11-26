import { immer } from "zustand/middleware/immer"
import { create } from "zustand"
import { locations } from "#constants"

const DEFAULT_LOCATION = locations.work

export interface Location {
    id: number;
    type?: string;
    name: string;
    icon: string;
    kind: string;
    children?: Location[];
    [key: string]: any;
}

interface LocationStore {
    activeLocation: Location;
    setActiveLocation: (location: Location | null) => void;
    resetActiveLocation: () => void;
}

const useLocationStore = create<LocationStore>()(
    immer((set) => ({
        activeLocation: DEFAULT_LOCATION,

        setActiveLocation: (location = null) =>
            set((state: LocationStore) => {
                state.activeLocation = location || DEFAULT_LOCATION;
            }),

        resetActiveLocation: () => set((state: LocationStore) => {
            state.activeLocation = DEFAULT_LOCATION;
        })
    }))
);

export default useLocationStore
