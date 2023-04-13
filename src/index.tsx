import React from 'react';
import * as ReactDOM from 'react-dom/client';
import { App } from './App';

const rootDiv =
  document.getElementById('root') ?? document.createElement('div');
const root = ReactDOM.createRoot(rootDiv);
root.render(<App />);
