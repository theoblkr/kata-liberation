import React, { StrictMode } from 'react'
import ReactDom from 'react-dom/client'
import './index.css'
import App from './App'
// Redeux
import { Provider } from 'react-redux'
import { store } from './store'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import SinglePage from './pages/SinglePage'

const rootElement = document.getElementById('root')
const root = ReactDom.createRoot(rootElement)

root.render(
  <Provider store={store}>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="movie/:idMovie" element={<SinglePage />}/>
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </Provider>
)
