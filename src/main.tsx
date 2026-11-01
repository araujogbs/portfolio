import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource-variable/jetbrains-mono';
import '@fontsource-variable/instrument-sans';
import '@fontsource-variable/cinzel';
import './styles/global.css';
import { App } from './App';
// depois do App, para o tema vir depois do CSS de cada componente
import './styles/theme.css';

const root = document.getElementById('root');
if (!root) throw new Error('#root não encontrado');

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
