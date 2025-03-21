import { faStackOverflow } from '@fortawesome/free-brands-svg-icons'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { loginAPI, registerAPI } from '../services/allApi'
// import { ToastContainer } from 'react-bootstrap'
// import { toast } from 'react-toastify'

function Auth({ register }) {

  const navigate = useNavigate()
  const [userDetails, setUserdetails] = useState({
    username: "",
    email: "",
    password: ""
  })
  console.log(userDetails);

  const handleRegister = async () => {
    const { username, email, password } = userDetails
    if (!username || !email || !password) {
      // toast.warning(`Please fill the form`)
      alert(`Please fill the form`)
    } else {
      //api calls
      const result = await registerAPI(userDetails)
      console.log(result);
      if (result.status == 200) {
        // toast.success(`Registered Successfully`)
        alert(`Registered Successfully`)
        setUserdetails({
          username: "",
          email: "",
          password: ""
        })
        navigate('/login')
      } else if (result.status == 406) {
        // toast.warning(result.response.data)
        alert(result.response.data)
      }
      else {
        // toast.error(`something went wrong`)
        alert(`Something Went Wrong`)
      }
    }
  }

  const handleLogin = async () => {
    const { email, password } = userDetails
    if (!email || !password) {
      // toast.warning(`Please fill the form`)
      alert(`Please fill the form`)
    } else {
      //api call
      const result = await loginAPI({ email, password })
      console.log(result);

      if (result.status == 200) {
        // toast.success(` Successfully Logged in`)
        alert(`Successfully Logged in`)
        sessionStorage.setItem("existingUser", JSON.stringify(result.data.existingUser))
        sessionStorage.setItem("token", result.data.token)
        setUserdetails({
          username: "",
          email: "",
          password: ""
        })
        setTimeout(() => {
          navigate('/')
        }, 2000)

      } else if (result.status == 406) {
        // toast.warning(result.response.data)
        alert(result.response.data)
        setUserdetails({
          username: "",
          email: "",
          password: ""
        })
      } else {
        // toast.error(`Something went wrong`)
        alert(`someting went wrong`)
        setUserdetails({
          username: "",
          email: "",
          password: ""
        })
      }
    }
  }

  return (
    <>
      <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className='conatiner w-75  mt-5 mb-5'>
          <h4><Link to={'/'} className='text-warning' style={{ textDecoration: "none" }}><FontAwesomeIcon icon={faArrowLeft} className='me-2' />Back Home</Link></h4>

          <div className='bg-success p-3'>
            <div className="row">
              <div className="col-md-6 d-flex justify-content-center align-items-center">
                <img src="https://cdn3d.iconscout.com/3d/premium/thumb/lock-accept-10615980-8579870.png" alt="" width={'70%'} />
              </div>
              <div className="col-md-6 d-flex justify-content-center align-items-center text-light">
                <form className='w-100' action="">
                  <h4 className='text-center text-light'>
                    <FontAwesomeIcon icon={faStackOverflow} className='fa-2x' />  Project Fair
                  </h4>
                  {!register ? <h5 className='text-center mb-5'>Sign In to Your Account</h5> :
                    <h5 className='text-center mb-5'>Sign Up to Your Account</h5>}

                  {register && <div className='mb-3'>
                    <input value={userDetails.username} onChange={(e) => setUserdetails({ ...userDetails, username: e.target.value })} type="text" placeholder='Username' className='form-control rounded-0' />
                  </div>}
                  <div className='mb-3'>
                    <input value={userDetails.email} onChange={(e) => setUserdetails({ ...userDetails, email: e.target.value })} type="email" placeholder='Email ID' className='form-control rounded-0' />
                  </div>
                  <div className='mb-3'>
                    <input value={userDetails.password} onChange={(e) => setUserdetails({ ...userDetails, password: e.target.value })} type="password" placeholder='Password' className='form-control rounded-0' />
                  </div>
                  <div className='mb-3'>
                    {!register ? <div>
                      <button onClick={handleLogin} type='button' className='btn btn-warning w-100 rounded-0'>Login</button>
                      <p className='mt-3'>New User? click Here to <Link to={'/register'} className='text-danger'>Register</Link></p>
                    </div> :
                      <div>
                        <button onClick={handleRegister} type='button' className='btn btn-warning w-100 rounded-0'>Register</button>
                        <p className='mt-3'>Already a User? click Here to <Link to={'/login'} className='text-danger'>Login</Link></p>
                      </div>}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
        {/* <ToastContainer position='top-center' /> */}
      </div>
    </>
  )
}

export default Auth