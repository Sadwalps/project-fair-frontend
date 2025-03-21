import { faFacebook, faInstagram, faLinkedinIn, faStackOverflow, faXTwitter } from '@fortawesome/free-brands-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

function Footer() {
  return (
    <>
      <div className='p-5 bg-success' mt-5>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-4">
              <h3 className='text-light'>Project Fair <FontAwesomeIcon icon={faStackOverflow} className='me-5' /></h3>
              <p className='mt-4' style={{ textAlign: "justify" }}> Lorem, ipsum dolor sit amet consectetur adipisicing elit. Perferendis labore nobis eligendi. Architecto culpa ipsum odio! Pariatur sed iusto ipsa.
              </p>
            </div>
            <div className="col-md-2 d-md-flex justify-content-center">
              <div>
                <h3 className='text-light'>Guides</h3>
                <p className='mt-4'>Home</p>
                <p>Projets</p>
                <p>Dashboard</p>
              </div>
            </div>
            <div className="col-md-1"></div>
            <div className="col-md-2 d-md-flex justify-content-center">
              <div>
                <h3 className='text-light'>Links</h3>
                <p className='mt-4'>React</p>
                <p>Projets</p>
                <p>Dashboard</p>
              </div>
            </div>
            <div className="col-md-3">
              <h3 className='text-light'>Conatct us</h3>
              <div className='d-flex mt-4'>
                <input type="text" placeholder='Email Id' className='form-control rounded-0' />
                <button className='btn btn-warning ms-3 rounded-0'>Subscribe</button>
              </div>
              <div className='d-flex justify-content-between mt-4'>
                <FontAwesomeIcon icon={faInstagram} className='fa-2x text-light' />
                <FontAwesomeIcon icon={faXTwitter} className='fa-2x text-light' />
                <FontAwesomeIcon icon={faFacebook} className='fa-2x text-light' />
                <FontAwesomeIcon icon={faLinkedinIn} className='fa-2x text-light' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Footer