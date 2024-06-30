'use client';

import { QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { useRouter } from 'next/navigation';
import React from "react"


const ReactQueryProvider = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();

   const queryClient = new QueryClient({
      defaultOptions: {
         queries: {
            retry: false,
         },
      },
      queryCache: new QueryCache({
         onError: (error, query) => {
            console.log('queryClient error 2:', error, error?.response?.status, query, typeof error)
            if(error == 'Unauthorized') {
               router.push('/login')
            }
         }
      })
   });

   return (
       <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
   )
}

export default ReactQueryProvider;
