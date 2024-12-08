import { ErrorBoundary } from '@/components';
import Routes from '@/routes';
import StoreProvider from '@/store';
import { ThemeProvider } from '@/theme';

/**
 * Root Application Component
 * @component MainApp
 */
const MainApp = () => {
  return (
    <ErrorBoundary name="App">
      <StoreProvider>
        <ThemeProvider>
          <Routes />
        </ThemeProvider>
      </StoreProvider>
    </ErrorBoundary>
  );
};

export default MainApp;
