import React, { useEffect, useState } from 'react'
import Header from '../components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearchengin } from '@fortawesome/free-brands-svg-icons'
import ProjectCard from '../components/ProjectCard'
import { getAllProjectsAPI } from '../services/allApi'
import { Link } from 'react-router-dom'

function Projects() {
  const [token, setToken]=useState("")
  const [allProjects, setAllProjects] = useState([])
  const [searchKey, setSearchKey] = useState("")

  const getAllProjects = async ()=>{
    if(sessionStorage.getItem("token")) {
      const token = sessionStorage.getItem("token")
      const reqHeader = {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      }
      const result = await getAllProjectsAPI(searchKey,reqHeader)
      setAllProjects(result.data)
    }
  }
  console.log(allProjects);
  console.log(searchKey);
  
  
  useEffect(() => {
    getAllProjects()
    if(sessionStorage.getItem("token")) {
      setToken(sessionStorage.getItem("token"))
    }
  }, [searchKey])

  return (
    <>
    <Header/>
    {token?<div className='my-5'>
      <h1 className='text-center'>All Projects</h1>
      <div className='container-fluid mt-5'>
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4 d-flex">
            <input onChange={(e)=>setSearchKey(e.target.value)} type="text" className='form-control shadow'  placeholder='Technologies'/>
            <FontAwesomeIcon style={{color:"lightgray", marginTop:"11px", marginLeft:"-30px"}} icon={faSearchengin} />
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
      <div className='container-fluid mt-5 p-5'>
        <div className="row mt-lg-3 mt-2">
          {
            allProjects?.map((item)=>(<div className="col-md-3 mt-lg-1 mt-3"> <ProjectCard projects={item}/></div>))
            }
          
        </div>
      </div>
    </div>:
    <div className='container-fluid pt-lg-4 pt-3 pb-lg-3 pb-2'>
      <div className="row mt-lg-5 mt-3 mb-lg-5 mb-3 ">
        <div className="col-md-4"></div>
        <div className="col-md-4 text-center">
        <img src="https://t3.ftcdn.net/jpg/01/63/74/22/360_F_163742279_D7S3IQzYWFMR97T3llVaEzA7WVhvcg7f.jpg" alt="" style={{height:"180px", borderRadius:"50%"}} className='mt-lg-4 mt-2 mb-lg-4 mb-3' />
        <h5 style={{color:"red"}}>Please<span className='ms-2' ><Link to={'/login'} className='text-success'>login</Link></span> to See More Projects</h5>
        </div>
        <div className="col-md-4"></div>
      </div>
    </div>
    }
    </>
  )
}

export default Projects