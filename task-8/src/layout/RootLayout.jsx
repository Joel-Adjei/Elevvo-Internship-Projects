import React from 'react'
import { Outlet} from 'react-router-dom'
import Navigation from '../components/Navigation'

const RootLayout = () => {
  return (
    <div className="flex w-full min-h-screen bg-background/20">
      <Navigation />
      <div className="lg:ml-64 flex-1">
         <Outlet />  
      </div>
     
    </div>
  )
}

export default RootLayout