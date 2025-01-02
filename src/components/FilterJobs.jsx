import React from 'react'
import { Col, Form, Row } from 'react-bootstrap'

const FilterJobs = () => {


  return (
    <>
        <div className='d-flex justify-content-between align-items-center container p-2'>
            <h5>Filter</h5>
            <h6 className='fw-light'><>Clear all</></h6>
        </div>
        <div className='container'>
          <h6>Salary Range</h6>
          <Row className="mb-4">
          <Form.Group as={Col} md="4" controlId="validationCustom04">
      <Form.Label>Min Salary</Form.Label>
      <Form.Control type="text" placeholder=" INR" required />
      <Form.Control.Feedback type="invalid">
      </Form.Control.Feedback>
          </Form.Group>
          <Form.Group as={Col} md="4" controlId="validationCustom04">
      <Form.Label>Max Salary</Form.Label>
      <Form.Control type="text" placeholder=" INR" required />
      <Form.Control.Feedback type="invalid">
      </Form.Control.Feedback>
          </Form.Group>
          </Row>
        </div>
        <hr className='my-4' />
        <div className='container'>
          <h6>Job Type</h6>
          <Form>
         <div key={``}>
          <Form.Check // prettier-ignore
            id={`default`}
            label={`All`}
          />
        </div>
        <div key={``}>
          <Form.Check // prettier-ignore
            id={`default`}
            label={`Full-Time`}
          />
        </div>
        <div key={``}>
          <Form.Check // prettier-ignore
            id={`default`}
            label={`Part-Time`}
          />
        </div>
         </Form>
        </div>
        <hr className='my-4' />
        <div className='container'>
          <h6>Work Mode</h6>
          <Form>
         <div key={``}>
          <Form.Check // prettier-ignore
            id={`default`}
            label={`On-Site`}
          />
        </div>
        <div key={``}>
          <Form.Check // prettier-ignore
            id={`default`}
            label={`Remote`}
          />
        </div>
        <div key={``}>
          <Form.Check // prettier-ignore
            id={`default`}
            label={`Hybrid`}
          />
        </div>
        </Form>
        </div>

    </>
  )
}

export default FilterJobs