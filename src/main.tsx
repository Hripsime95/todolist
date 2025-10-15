import { createRoot } from 'react-dom/client';
import './index.css';
import { StrictMode } from 'react';
import { store } from './app/store';
import { Provider } from 'react-redux';
import App from './app/App';
import { BrowserRouter } from 'react-router';

createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <Provider store={store}>
      <StrictMode>
        <App />
      </StrictMode>
    </Provider>
  </BrowserRouter>,
);
