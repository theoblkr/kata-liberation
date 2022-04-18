import React, { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App'
// Redeux
import { Provider } from 'react-redux'
import { store } from './store'

const rootElement = document.getElementById('root')
const root = ReactDom.createRoot(rootElement)

root.render(
  <Provider store={store}>
    <StrictMode>
      <App />
    </StrictMode>
  </Provider>
)
