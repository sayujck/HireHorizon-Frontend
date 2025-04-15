import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './redux/store.js'
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { AppContextProvider } from './context/AppContext.jsx';

const persistor = persistStore(store)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppContextProvider> 
            <App />
          </AppContextProvider>
        </PersistGate>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
