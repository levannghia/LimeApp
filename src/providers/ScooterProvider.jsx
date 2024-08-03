import { createContext, useContext, useState } from "react";

const ScooterContext = createContext({});

export default function ScooterProvider({ children }) {
    const [selectedScooter, setSelectedScooter] = useState();
    return (
        <ScooterContext.Provider value={{
            selectedScooter,
            setSelectedScooter,
        }}
        >
            {children}
        </ScooterContext.Provider>
    )
}

export const useScooter = () => useContext(ScooterContext);
