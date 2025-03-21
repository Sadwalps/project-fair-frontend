
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Projects from './pages/Projects'
import Dashboard from './pages/Dashboard'
import Auth from './pages/Auth'
import PageNotFound from './pages/PageNotFound'
import Footer from './components/Footer'
import { useContext } from 'react'
import { loginResponseContext } from './context/ContextShare'

function App() {
  const {loginResponse} = useContext(loginResponseContext)
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/projects' element={loginResponse? <Projects />:<PageNotFound />} />
        <Route path='/dashboard' element={loginResponse?<Dashboard />:<PageNotFound />} />
        <Route path='/login' element={<Auth />} />
        <Route path='/register' element={<Auth register={true} />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
      <Footer />
    </>
  )
}

export default App
