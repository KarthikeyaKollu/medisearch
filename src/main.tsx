import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {ListProvider} from "../src/context/Chatcontext.jsx"

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
     <ListProvider>

    <App />
     </ListProvider>
  </React.StrictMode>
)
