import { ReactNode, createContext, useState } from "react";

type ContaContextType = {
    conta: any;
    setConta: React.Dispatch<any>;
};

export const ContaContext = createContext<ContaContextType | null>(null);

export const ContaContextProvider = ({ children }: { children: ReactNode }) => {
    const [conta, setConta] = useState<any>(null);

    return (
        <ContaContext.Provider value={{ conta, setConta }}>
            { children }
        </ContaContext.Provider>
    );
}