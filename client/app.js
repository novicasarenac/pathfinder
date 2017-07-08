import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import React from 'react';
import { render } from 'react-dom';
import AppProvider from './containers/AppProvider';

render(
  <div className="h-100">
    <AppProvider />
  </div>,
  document.getElementById('app')
);
