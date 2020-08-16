import { City } from '../models/City';
import { ACTION_TYPES } from './action-types';

export type Action = {
  type: string;
  payload: City;
};

export const reducer = (state: City[], action: Action) => {
  switch (action.type) {
    case ACTION_TYPES.ADD_CITY:
      const cityIndex = state.findIndex(
        (city) => city.id === action.payload.id
      );
      if (cityIndex === -1) {
        return [...state, action.payload];
      } else {
        return state;
      }
    case ACTION_TYPES.REMOVE_CITY:
      return state.filter((city) => city.id !== action.payload.id);
    default:
      return state;
  }
};
