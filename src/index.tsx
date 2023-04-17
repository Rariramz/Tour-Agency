import React from 'react';
import * as ReactDOM from 'react-dom/client';
import './shared/config/i18n/i18n';
import { App } from './app/App';

const rootDiv =
  document.getElementById('root') ?? document.createElement('div');
const root = ReactDOM.createRoot(rootDiv);
root.render(<App />);
