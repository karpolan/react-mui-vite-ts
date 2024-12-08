import { Reducer } from 'react';
import { AppStoreState, CurrentUser } from './config';

type SupportedPayload = undefined | boolean | CurrentUser;

export type AppStoreAction = {
  type: string;
  payload?: SupportedPayload;
};

/**
 * Reducer for global AppStore using "Redux styled" actions
 * @param {object} state - current/default state
 * @param {object} action - action object with .type and optional .payload
 */
const AppStoreReducer: Reducer<AppStoreState, AppStoreAction> = (state, action) => {
  // console.log('AppReducer() - action:', action);
  switch (action.type) {
    case 'CURRENT_USER':
      return {
        ...state,
        currentUser: action?.payload as CurrentUser,
      };

    case 'SIGN_UP':
    case 'LOG_IN':
      return {
        ...state,
        isAuthenticated: true,
        ...(action?.payload && { currentUser: action?.payload as CurrentUser }), // Also set the User data when provided
      };

    case 'LOG_OUT':
      return {
        ...state,
        isAuthenticated: false,
        currentUser: undefined, // Also reset previously logged User data
      };

    // MUI v6 has own Dark Mode implementation, so we can remove this
    // case 'DARK_MODE': {
    //   const darkMode = Boolean(action?.payload);
    //   localStorageSet('darkMode', darkMode); // Also save the User selected value into the LocalStorage
    //   return {
    //     ...state,
    //     darkMode,
    //   };
    // }
    default:
      return state;
  }
};

export default AppStoreReducer;
