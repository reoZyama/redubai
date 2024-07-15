'use client';
import { SWRConfig } from 'swr';
import { axios } from '@/libs';

export const SWRProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SWRConfig
      value={{
        fetcher: (url: string) =>
          axios(url)
            .then((res) => res.data)
            .catch((error) => {
              switch (error?.response?.status) {
                default:
                  throw error;
              }
            }),
      }}
    >
      {children}
    </SWRConfig>
  );
};
