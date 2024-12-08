import { FunctionComponent, PropsWithChildren, useReducer } from 'react';
import { AppStoreState, INITIAL_APP_STORE_STATE } from './config';
import { AppContextReturningType, AppStoreContext } from './AppStore';
import AppStoreReducer from './AppStoreReducer';

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

  return <AppStoreContext value={value}>{children}</AppStoreContext>;
};

export default AppStoreProvider;
