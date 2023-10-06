import { createAction, createReducer, on, createSelector } from '@ngrx/store';

export interface StocksState {
  appleStock: number;
  googleStock: number;
  microsoftStock: number;
}

export const updateUSDRate = createAction(
  '[Currency] Update USD Rate',
);

export const updateCOPRate = createAction(
  '[Currency] Update COP Rate'
);

export const initialState: StocksState = {
  appleStock: 189.46,
  googleStock: 135.66,
  microsoftStock: 328.66,
};

export const currencyReducer = createReducer(
  initialState,
  on(updateUSDRate, (state) => ({
    ...state,
    appleStock: initialState.appleStock,
    googleStock: initialState.googleStock,
    microsoftStock: initialState.microsoftStock,
  })),
  on(updateCOPRate, (state) => ({
    ...state,
    appleStock: state.appleStock * 4028,
    googleStock: state.googleStock  * 4028,
    microsoftStock: state.microsoftStock  * 4028,
  }))
);

const selectFeature = (state: StocksState) => state;

export const selectStocks = createSelector(
  selectFeature,
  (state: StocksState) => state
);
