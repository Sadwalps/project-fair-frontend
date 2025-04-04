import React from 'react'
import Header from '../components/Header'
import { Col, Container, Row } from 'react-bootstrap'
import MyProject from '../components/MyProject'
import Profile from '../components/Profile'

function Dashboard() {
  
  return (
    <>
    <Header/>
    <div className='p-4'>
      <h3>Welcome <span className='text-warning'>User</span></h3>
      <Container>
        <Row>
          <Col sm={12} md={7}><MyProject/></Col>
          <Col sm={12} md={5}><Profile/></Col>        
        </Row>
      </Container>
    </div>
    </>
  )
}

export default Dashboard