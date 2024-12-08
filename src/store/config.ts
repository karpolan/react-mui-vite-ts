/**
 * Structure of the "Current User" in the AppStore
 * TODO: Replace with your API/DTO structure
 */
export interface CurrentUser {
  displayName: string;
  avatarUrl?: string;
  userId?: string;
}

/**
 * Structure of the "State" in the AppStore
 */
export interface AppStoreState {
  isAuthenticated: boolean;
  currentUser?: CurrentUser | undefined;
}

/**
 * Initial values of the "State" in the AppStore
 */
export const INITIAL_APP_STORE_STATE: AppStoreState = {
  isAuthenticated: false, // Overridden in AppStore by checking auth token
};
