import { FunctionComponent, PropsWithChildren, useReducer } from 'react';
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
  // const tokenExists = Boolean(loadToken());

  const initialState: AppStoreState = {
    ...INITIAL_APP_STORE_STATE,
    // isAuthenticated: tokenExists,
  };
  const value: AppContextReturningType = useReducer(AppStoreReducer, initialState);

  return <AppStoreContext.Provider value={value}>{children}</AppStoreContext.Provider>;
};

export default AppStoreProvider;
