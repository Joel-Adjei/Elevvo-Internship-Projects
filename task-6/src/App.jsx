import React from 'react'
import {BrowserRouter , Routes , Route } from 'react-router-dom'
import RootLayout from './layout/RootLayout'
import Overview from './pages/Overview'
import Projects from './pages/Projects'
import Profile from './pages/Profile'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<RootLayout />}>
            <Route index element={<Overview />} />
            <Route path='projects' element={<Projects />} />
            <Route path='profile' element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
