import { ThemeProvider } from "@/theme";
import StoreProvider from "@/store";
import { ErrorBoundary } from "@/components";
import Routes from "@/routes";

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
