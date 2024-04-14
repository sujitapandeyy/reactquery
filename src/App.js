import './App.css';
import Herolist from './features/heros/herolist';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';

const queryClient = new QueryClient();
function App() {
  return (
   <>
   {/* <main> */}
    <React.StrictMode>
   <QueryClientProvider client={queryClient}>
      <Herolist />
    </QueryClientProvider>
    </React.StrictMode>
    {/* </main> */}
   </>
  );
}

export default App;
