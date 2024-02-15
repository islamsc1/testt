import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
// import './index.css'
import {disablereactDevTools} from "@fvilers/disable-react-devtools"
disablereactDevTools();

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <button class="monthbtn" id="m10Button">October 10/2023</button>
    <App />
  </React.StrictMode>,
)
