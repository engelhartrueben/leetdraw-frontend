import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.tsx';
import Routes from './Routes';

console.log("in main");

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Routes />
  </StrictMode>
)
