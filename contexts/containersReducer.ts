import { ContainersState } from '.';


type ContainersActionType =
| { type: 'Devices - updateVisibility', payload: boolean };

export const containersReducer = (state: ContainersState, action: ContainersActionType): ContainersState => {

  switch (action.type) {
    case 'Devices - updateVisibility':
      return {
        ...state,
        showContainers: action.payload,
      }

    default:
      return state;
  }
}