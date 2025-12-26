import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CITY_DEFAULT, NameSpace, SortOption } from '../../const';

type AppProcess = {
  cityActive: string;
  currentSortOption: SortOption;
  error: string | null;
};

const initialState: AppProcess = {
  cityActive: CITY_DEFAULT,
  currentSortOption: SortOption.Popular,
  error: null,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<string>) => {
      state.cityActive = action.payload;
    },
    changeSort: (state, action: PayloadAction<SortOption>) => {
      state.currentSortOption = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { changeCity, changeSort, setError } = appProcess.actions;
