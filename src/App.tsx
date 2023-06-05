// npm modules 
import { useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'

// pages
import Signup from './pages/Signup/Signup'
import Login from './pages/Login/Login'
import Landing from './pages/Landing/Landing'
import Profiles from './pages/Profiles/Profiles'
import ChangePassword from './pages/ChangePassword/ChangePassword'
import GardenBeds from './pages/GardenBeds/GardenBeds'
import Seeds from './pages/Seeds/Seeds'
import GardenBedDetails from './pages/GardenBedDetails/GardenBedDetails'

// components
import NavBar from './components/NavBar/NavBar'
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute'

// services
import * as authService from './services/authService'

// styles
import './App.css'

// types
import { User } from './types/models'
import SeedDetails from './pages/SeedDetails/SeedDetails'

function App(): JSX.Element {
  const [user, setUser] = useState<User | null>(authService.getUser())
  const navigate = useNavigate()
  
  const handleLogout = (): void => {
    authService.logout()
    setUser(null)
    navigate('/')
  }

  const handleAuthEvt = (): void => {
    setUser(authService.getUser())
  }

  return (
    <>
      <NavBar user={user} handleLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Landing user={user} />} />
        <Route
          path="/profiles"
          element={
            <ProtectedRoute user={user}>
              <Profiles />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profiles/:profileId"
          element={
            <ProtectedRoute user={user}>
            </ProtectedRoute>
          }
        />
        <Route
          path="/auth/signup"
          element={<Signup handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/login"
          element={<Login handleAuthEvt={handleAuthEvt} />}
        />
        <Route
          path="/auth/change-password"
          element={
            <ProtectedRoute user={user}>
              <ChangePassword handleAuthEvt={handleAuthEvt} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gardenBeds"
          element={
            <ProtectedRoute user={user}>
              <GardenBeds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gardenBeds/:gardenBedId"
          element={
            <ProtectedRoute user={user}>
              <GardenBedDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seeds"
          element={
            <ProtectedRoute user={user}>
              <Seeds />
            </ProtectedRoute>
          }
        />
        <Route
          path="/seeds/:seedId"
          element={
            <ProtectedRoute user={user}>
              <SeedDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="/gardenBeds/:gardenBedId/seeds/:seedId"
          element={
            <ProtectedRoute user={user}>
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
    
  )
}

export default App
