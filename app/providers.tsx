'use client';

import { getQueryClient } from '@/lib/tanstack-query';
import { QueryClientProvider } from '@tanstack/react-query';
import React from 'react';

export default function Providers({ children }: React.PropsWithChildren) {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
