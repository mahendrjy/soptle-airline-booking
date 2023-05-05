import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home.jsx'
import Registration from './pages/Registration.jsx'
import Admin from './pages/Admin.jsx'
import Booking from './pages/Booking.jsx'
import Header from './components/Header.jsx'

import './index.css'
import AppProvider from './contexts/AppContext.jsx'

const App = () => {
  return (
    <React.StrictMode>
      <BrowserRouter>
        <div className="mx-auto max-w-7xl px-4">
          <AppProvider>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/registration"
                element={<Registration />}
              />
              <Route path="/booking" element={<Booking />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </AppProvider>
        </div>
      </BrowserRouter>
    </React.StrictMode>
  )
}

export default App
