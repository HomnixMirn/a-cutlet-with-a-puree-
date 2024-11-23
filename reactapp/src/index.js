import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  BrowserRouter} from "react-router-dom";
export const API_URL = "http://localhost:8000/api/calendar/"
export const API_MEDIA = "http://localhost:8000"


ReactDOM.createRoot(document.getElementById('root')).render(
 //<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  //</React.StrictMode>
);
