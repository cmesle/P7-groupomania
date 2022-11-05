import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'

import { FilterProvider, RefreshProvider } from './utils/context'

import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <RefreshProvider>
            <FilterProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </FilterProvider>
        </RefreshProvider>
    </React.StrictMode>
)
