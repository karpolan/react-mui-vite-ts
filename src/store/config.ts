/**
 * Structure of the "State" in the AppStore
 */
export interface AppStoreState {
  darkMode: boolean;
  isAuthenticated: boolean;
  currentUser?: unknown | undefined;
}

/**
 * Initial values of the "State" in the AppStore
 */
export const INITIAL_APP_STORE_STATE: AppStoreState = {
  darkMode: false, // Overridden by useMediaQuery('(prefers-color-scheme: dark)') or from localStorage
  isAuthenticated: false, // Overridden in AppStore by checking auth token
};
