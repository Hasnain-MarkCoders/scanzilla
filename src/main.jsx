import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App"
import "./index.css"
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { store, persistor } from './Redux/Store/Store.js';
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>
)