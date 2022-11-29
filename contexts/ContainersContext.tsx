import { createContext } from 'react';


interface ContextProps {
  // Variables
  showContainers: boolean;

  // Functions
  updateVisibility: (show: boolean) => void;
}

export const ContainersContext = createContext({} as ContextProps);