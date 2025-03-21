import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useContext, useEffect } from 'react'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { serverURL } from '../services/serverUrl';
import { updateUserProjectAPI } from '../services/allApi';
import { editResponseContext } from '../context/ContextShare';

function Edit({projects}) {

  const {setEditResponse} = useContext(editResponseContext)

  const [show, setShow] = useState(false);
  const [preview, setPreview] = useState("")
  const [key, setKey] = useState(0)

  const handleClose = () => {
    handleCancel()
    setShow(false)
  };
  

  const handleShow = () => setShow(true);
  // console.log(projects);

  const [projectDetails, setProjectDetails]= useState({
    title: projects?.title,
    language: projects?.language,
    github: projects?.github,
    website: projects?.website,
    overview: projects?.overview,
    projectImage:""
  })
  // console.log(projectDetails);

  const handleFile = (e)=>{
    setProjectDetails({...projectDetails, projectImage: e.target.files[0]})
  }

  const handleCancel = ()=>{
    setProjectDetails({
      title: projects?.title,
      language: projects?.language,
      github: projects?.github,
      website: projects?.website,
      overview: projects?.overview,
      projectImage:""
    })
    setPreview("")
    if(key == 0){
      setKey(1)
    }else{
      setKey(0)
    }
  }

  const handleUpdate = async ()=>{
    const {title, language, github, website, overview, projectImage} = projectDetails
    console.log(title, language, github, website, overview, projectImage);

    if(!title || !language || !github || !website || !overview){
      alert(`Fill the form completely`)
    }else{
      //reqBody
      const reqBody = new FormData()
      reqBody.append("title", title)
      reqBody.append("language", language)
      reqBody.append("github", github)
      reqBody.append("website", website)
      reqBody.append("overview", overview)
      preview ? reqBody.append("projectImage", projectImage) : reqBody.append("projectImage", projects.projectImage)

      //reqHeader
      const token = sessionStorage.getItem("token")
      if(preview){
        const reqHeader = {          
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`          
        }
        const result = await updateUserProjectAPI(projects._id, reqBody, reqHeader)
        console.log(result);
        if(result.status == 200){
          setEditResponse(result)
          alert(`Project  Successfully Updated`)
          setTimeout(()=>{
            handleClose()
          },[3000])
        }else if(result.status==406){
          alert(result.response.data)
        }else{
          alert(`Something Went Wrong`)
        }
        
      }else{
        const reqHeader = {          
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`          
      }
      const result = await updateUserProjectAPI(projects._id, reqBody, reqHeader)
      console.log(result);
      if(result.status == 200){
        setEditResponse(result)
        alert(`Project  Successfully Updated`)
        setTimeout(()=>{
          handleClose()
        },[3000])
      }else if(result.status==406){
        alert(result.response.data)
      }else{
        alert(`Something Went Wrong`)
      }  
      }
        
    }
    }
  

  useEffect(()=>{
    if(projectDetails.projectImage){
      setPreview(URL.createObjectURL(projectDetails.projectImage))
    }
  },[projectDetails.projectImage])
  
  
  return (
    <>
      <FontAwesomeIcon onClick={handleShow} icon={faPenToSquare} className='text-info me-3' />
      <Modal show={show} onHide={handleClose} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>Add Project Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='container'>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="projectImage" >
                  <input key={key} onChange={(e)=>handleFile(e)} id='projectImage' type="file"  />
                  <img src={preview  ? preview : `${serverURL}/upload/${projects?.projectImage}`} alt="" className='img-fluid' />
                </label>
              </div>
              <div className="col-md-6">
                <div className='mb-3'>
                  <input onChange={(e)=>setProjectDetails({...projectDetails, title: e.target.value})} value={projectDetails.title} type="text" className='form-control' placeholder='Title' />
                </div>
                <div className='mb-3'>
                  <input onChange={(e)=>setProjectDetails({...projectDetails, language: e.target.value})} value={projectDetails.language} type="text" className='form-control' placeholder='Language' />
                </div>
                <div className='mb-3'>
                  <input onChange={(e)=>setProjectDetails({...projectDetails, github: e.target.value})} value={projectDetails.github} type="text" className='form-control' placeholder='Github' />
                </div>
                <div className='mb-3'>
                  <input onChange={(e)=>setProjectDetails({...projectDetails, website: e.target.value})} value={projectDetails.website} type="text" className='form-control' placeholder='Website' />
                </div>
                <div className='mb-3'>
                  <textarea onChange={(e)=>setProjectDetails({...projectDetails, overview: e.target.value})} value={projectDetails.overview} rows={5} className='form-control' placeholder='Overview'></textarea>
                </div>
              </div>
            </div>
          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary me-3" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleUpdate}>
            Add Project
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default Edit