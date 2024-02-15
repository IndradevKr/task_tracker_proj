import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import axios from 'axios';
import { TasksList } from './tasks';
import "./assets/css/style.css";

axios.defaults.baseURL = "http://localhost:4000/api/";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <TasksList />
    </QueryClientProvider>
  </React.StrictMode>,
)
