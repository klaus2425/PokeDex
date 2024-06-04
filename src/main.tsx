import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ContextProvider } from './Context/ContextProvider'
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    }
  }
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </ContextProvider>
  </React.StrictMode>,
)
