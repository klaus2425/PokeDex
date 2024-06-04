import { ReactNode, createContext, useContext, useState } from "react";

// Define the Result type
type Result = {
  name: string;
  url: string;
};

// Define the context type
type StateContextType = {
  results: Result[];
  setResults: React.Dispatch<React.SetStateAction<Result[]>>;
};

// Initialize the context with default values
const StateContext = createContext<StateContextType>({
  results: [],
  setResults: () => {}
});

export const ContextProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Initialize useState with an empty array for results
  const [results, setResults] = useState<Result[]>([]);

  return (
    <StateContext.Provider value={{ results, setResults }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
  