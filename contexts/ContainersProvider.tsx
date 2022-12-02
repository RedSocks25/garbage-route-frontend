import { FC, PropsWithChildren, useReducer } from 'react';
import { ContainersContext, containersReducer } from '.';


export interface ContainersState {
  showContainers: boolean;
}

const Containers_INITIAL_STATE: ContainersState = {
  showContainers: false,
}

export const ContainersProvider: FC<PropsWithChildren> = ({ children }) => {

  const [state, dispatch] = useReducer(containersReducer, Containers_INITIAL_STATE);

  const updateVisibility = (show: boolean) => {
    dispatch({ type: 'Devices - updateVisibility', payload: show });
  }

  return (
    <ContainersContext.Provider value={{
      // State variables
      ...state,

      // Functions
      updateVisibility,
    }}>
      { children }
    </ContainersContext.Provider>
  );
}
