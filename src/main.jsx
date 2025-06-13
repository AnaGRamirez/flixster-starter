import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {MovieProvider} from './context/MovieContext.jsx';
import { BrowserRouter, createBrowserRouter, RouterProvider } from 'react-router-dom';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter> 
    <MovieProvider>
       <App />
    </MovieProvider>
    </BrowserRouter>
)


