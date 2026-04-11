import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';
import './index.css';

// Create a QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

// Function to render the app
async function enableMocking() {
  // Enable MSW if VITE_USE_MOCK_API is explicitly 'true', or if in dev mode and not explicitly 'false'
  const useMockApi =
    import.meta.env.VITE_USE_MOCK_API === 'true' ||
    (import.meta.env.DEV && import.meta.env.VITE_USE_MOCK_API !== 'false');

  if (useMockApi) {
    const { worker } = await import('./mocks/browser');

    // Start the worker with options
    return worker.start({
      serviceWorker: {
        url: `${import.meta.env.BASE_URL}mockServiceWorker.js`,
      },
      onUnhandledRequest: 'bypass', // Don't warn about unhandled requests
    });
  }

  return Promise.resolve();
}

// Initialize the app with MSW
enableMocking().then(() => {
  createRoot(document.getElementById('root')!).render(
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </StrictMode>
  );
});
