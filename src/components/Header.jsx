import { faStackOverflow } from '@fortawesome/free-brands-svg-icons';
import { faPowerOff } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect, useState } from 'react'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import { loginResponseContext } from '../context/ContextShare';
function Header() {

  const {setLoginResponse} = useContext(loginResponseContext)
  const [token, setToken]=useState("")
  const navigate = useNavigate()
  useEffect(()=>{
    if(sessionStorage.getItem("token")){
      setToken(sessionStorage.getItem("token"))
    }
  })

  const handleLogout = ()=>{
    alert(`Logout successfully`)
    sessionStorage.removeItem("existingUser")
    sessionStorage.removeItem("token")
    setLoginResponse(false)
    navigate('/')
  }
  return (
    
    <>
     <Navbar className="bg-success d-flex align-items-center">
        <Container>
          <Link to={'/'} style={{textDecoration:"none"}}> <Navbar.Brand className='text-light mx-5'>
           <span className='fs-3'>Project Fair <FontAwesomeIcon icon={faStackOverflow} className='me-5' /></span>
          </Navbar.Brand></Link>
          {token && <button onClick={handleLogout} className='btn btn-warning ms-auto rounded-0'><FontAwesomeIcon icon={faPowerOff} /> Log Out</button>}
        </Container>
      </Navbar>
    </>
  )
}

export default Header