import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {  BrowserRouter} from "react-router-dom";
export const API_URL = "https://shadow7x.pythonanywhere.com/api/calendar/"
export const API_MEDIA = "https://shadow7x.pythonanywhere.com/"


ReactDOM.createRoot(document.getElementById('root')).render(
 //<React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  //</React.StrictMode>
);
