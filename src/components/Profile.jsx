import React, { useEffect, useState } from 'react'

import { updateUserProfileAPI } from '../services/allApi';
import { serverURL } from '../services/serverUrl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp } from '@fortawesome/free-solid-svg-icons';
import Collapse from 'react-bootstrap/Collapse';
function Profile() {
  const [open, setOpen] = useState(false);

  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    password: "",
    profile: "",
    github: "",
    linkedin: ""
  })
  console.log(userDetails);
  const [existingImg, setExistingImg] = useState("")
  const [preview, setPreview] = useState("")

  const handleFile = (e) => {
    setUserDetails({ ...userDetails, profile: e.target.files[0] })
  }
  useEffect(() => {
    if (userDetails.profile) {
      setPreview(URL.createObjectURL(userDetails.profile))
    }
  }, [userDetails.profile])

  const handleUpdate = async () => {
    const { username, email, password, profile, github, linkedin } = userDetails
    console.log(username, email, password, profile, github, linkedin);
    if (!github || !linkedin) {
      alert(`Please add GitHub and LinkedIn`)
    } else {
      const reqBody = new FormData()
      reqBody.append("username", username)
      reqBody.append("email", email)
      reqBody.append("password", password)
      reqBody.append("github", github)
      reqBody.append("linkedin", linkedin)
      preview ?
        reqBody.append("profile", profile) : reqBody.append("profile", existingImg)

      const token = sessionStorage.getItem("token")
      if (preview) {
        const reqHeader = {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserProfileAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          alert(`Profile Updated Successfully`)
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
        } else {
          alert(`Something Went Wrong`)
        }

      } else {
        const reqHeader = {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        }
        const result = await updateUserProfileAPI(reqBody, reqHeader)
        console.log(result);
        if (result.status == 200) {
          alert(`Profile Updated Successfully`)
          sessionStorage.setItem("existingUser", JSON.stringify(result.data))
        } else {
          alert(`Something Went Wrong`)
        }
      }
    }
  }

  useEffect(() => {
    if (sessionStorage.getItem("existingUser")) {
      const user = JSON.parse(sessionStorage.getItem("existingUser"))
      console.log(user);
      setUserDetails({ ...userDetails, username: user.username, email: user.email, password: user.password, github: user.github, linkedin: user.linkedin })
      setExistingImg(user.profile)
    }
  }, [])


  return (
    <>
      <div className='p-lg-4 p-1 shadow mt-5' onMouseEnter={()=>setOpen(true)} onMouseLeave={()=>setOpen(false)}>
        <div>
          <div className='d-flex justify-content-between'>
            <h4 className='text-success'>Profile</h4>
            <button className='btn'
              onClick={() => setOpen(!open)}
              aria-controls="example-collapse-text"
              aria-expanded={open}>
              {
                open == true?<FontAwesomeIcon icon={faAngleUp} />:
              <FontAwesomeIcon icon={faAngleDown} />}
            </button>

          </div>
          <Collapse in={open}>

            <div>
              <div className='d-flex justify-content-center align-items-center flex-column'>
                <label htmlFor="profileImage" className='text-center'>
                  <input onChange={(e) => handleFile(e)} type="file" id='profileImage' />
                  {existingImg == "" ? <img src={preview ? preview : "https://static.vecteezy.com/system/resources/previews/009/267/048/non_2x/user-icon-design-free-png.png"} alt="" style={{ width: "250px", height: "250px", borderRadius: "50%", marginBottom: "25px" }} /> :
                    <img src={preview ? preview : `${serverURL}/upload/${existingImg}`} alt="" style={{ width: "250px", height: "250px", borderRadius: "50%", marginBottom: "25px" }} />}
                </label>

                <div className='w-100'>
                  <div className='mb-3'>
                    <input value={userDetails?.github} onChange={(e) => setUserDetails({ ...userDetails, github: e.target.value })} type="text" placeholder='Github' className='form-control' />
                  </div>
                  <div className='mb-4'>
                    <input value={userDetails?.linkedin} onChange={(e) => setUserDetails({ ...userDetails, linkedin: e.target.value })} type="text" placeholder='LinkedIn' className='form-control' />
                  </div>
                  <div className='mb-2 text-center'>
                    <button onClick={handleUpdate} className='btn btn-success w-75 mt-2'>Update</button>
                  </div>
                </div>
              </div>
            </div>
          </Collapse>

        </div>
      </div>
    </>
  )
}

export default Profile