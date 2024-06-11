import { FunctionComponent, PropsWithChildren, useReducer } from 'react';
import { useMediaQuery } from '@mui/material';
import { localStorageGet } from '@/utils/localStorage';
import { AppContextReturningType, AppStoreContext } from './AppStore';
import AppStoreReducer from './AppStoreReducer';
import { AppStoreState, INITIAL_APP_STORE_STATE } from './config';

/**
 * Main global Store as HOC with React Context API
 *
 * import {AppStoreProvider} from './store'
 * ...
 * <AppStoreProvider>
 *   <App/>
 * </AppStoreProvider>
 */
const AppStoreProvider: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  const previousDarkMode = Boolean(localStorageGet('darkMode'));
  // const tokenExists = Boolean(loadToken());

  const initialState: AppStoreState = {
    ...INITIAL_APP_STORE_STATE,
    darkMode: previousDarkMode || prefersDarkMode,
    // isAuthenticated: tokenExists,
  };
  const value: AppContextReturningType = useReducer(AppStoreReducer, initialState);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
};

export default AppStoreProvider;
