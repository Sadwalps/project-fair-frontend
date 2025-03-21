import React from 'react'
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import { serverURL } from '../services/serverUrl';
function ProjectCard({projects}) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Card style={{ width: '100%' }}>
        <Card.Img variant="top" src={`${serverURL}/upload/${projects?.projectImage}`} onClick={handleShow}  />
        <Card.Body>
          <Card.Title className='text-center'>{projects?.title}</Card.Title>
        </Card.Body>
      </Card>


      {/* modal */}
      <Modal show={show} onHide={handleClose} centered size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{projects?.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-6">
                <img style={{ width: "100%" }} src={`${serverURL}/upload/${projects?.projectImage}`} alt="" />
              </div>
              <div className="col-md-6">
                <h4>Description</h4>
                <p>{projects?.overview}</p>
                <h4>Technologies</h4>
                <p>{projects?.language}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <div className='d-flex'>
            <Link to={projects?.github} target='_blank'><FontAwesomeIcon icon={faGithub} className='fa-2x me-3'/></Link>
            <Link to={projects?.website} target='_blank'> <FontAwesomeIcon icon={faGlobe} className='fa-2x me-3'/></Link>  
          </div>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default ProjectCard