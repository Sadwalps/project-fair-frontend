import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ProjectCard from '../components/ProjectCard'
import { getHomeProjectAPI } from '../services/allApi'

function Home() {

  const [isLogin, setIsLogin] = useState(false)
  const [homeProjects, setHomeProjects] = useState([])

  const getHomeProjects = async ()=>{
    const result = await getHomeProjectAPI()
    setHomeProjects(result.data)
  }
  console.log(homeProjects);
  

  useEffect(()=>{
    getHomeProjects()
    if(sessionStorage.getItem("token")){
      setIsLogin(true)
    }else{
      setIsLogin(false)
    }
  },[])
  return (
    <>
    <div className=" bg-success p-lg-5 p-3" style={{height:"100vh"}}>
      <div className='container-fluid mt-5'>
      <div className="row d-flex justify-content-center align-items-center" >
        <div className="col-md-6 ">
       
                <h1 className='lg:text-6xl mt-lg-5 mt-2'>Project fair</h1>
                <p>One stop destination for all software development Projects</p>
                {isLogin==false?<Link to={'/login'}> <button className='btn text-light p-1 mt-3'>Get Started <FontAwesomeIcon icon={faArrowRight} /></button> </Link> :
                <Link to={'/dashboard'}> <button className='btn text-light p-1 mt-3'>Manage Projects <FontAwesomeIcon icon={faArrowRight} /></button> </Link>}
                </div>
        
        <div className="col-md-6 mt-5 mt-md-0  d-flex  justify-content-center pt-lg-5 pt-1">
        
            <img src="https://username4all.com/wp-content/uploads/Project-Names.jpg" alt="" className='w-100 mt-lg-5 mt-1  rounded' />
          

        </div>
      </div>
      </div>
      
    </div>

    {/*  */}
    <div>
      <h1 className='text-center mt-5'>Explore our Projects</h1>
      <div className=" container-fluid mt-5">
        <div className="row">
          <div className="col-md-1"></div>
          <div className="col-md-10">
          <div className="row">
          {homeProjects?.map((item)=>
            (<div className="col-md-4 mt-lg-2 mt-3"><ProjectCard projects={item} /></div>))}
          
        </div>
          </div>
          <div className="col-md-1"></div>
        </div>
        
      </div>
      <Link to={'/projects'} className='text-danger'><p className='text-center my-5'>See more Projects...</p></Link>
    </div>
  
    
    </>
  )
}

export default Home