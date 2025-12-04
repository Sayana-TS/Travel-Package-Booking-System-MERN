import React from 'react'
import { BrowserRouter, Routes } from 'react-router-dom'
import { adminRoutes } from './Modules/Admin/Admin.Routes'
import { agentRoutes } from './Modules/Agent/Agent.Routes'
import { userRoutes } from './Modules/User/User.Routes'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {userRoutes}
          {agentRoutes}
          {adminRoutes}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
