import { NameSpace } from '../../const';
import { State } from '../../types/state';


export const getCity = (state: State): string => state[NameSpace.App].cityActive;
export const getSortOption = (state: State) => state[NameSpace.App].currentSortOption;
export const getError = (state: State) => state[NameSpace.App].error;
