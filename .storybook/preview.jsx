import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css';
import '../src/shared/i18n/i18n';
import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { mswLoader } from 'msw-storybook-addon/csf3';
import { mswHandlers } from './msw-handlers';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

/** @type { import('@storybook/react-vite').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </QueryClientProvider>
    ),
  ],
  loaders: [mswLoader()],
  async beforeEach({ msw }) {
    if (msw) {
      msw.use(...mswHandlers);
    }
  },
};

export default preview;