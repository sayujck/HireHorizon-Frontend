import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Header from '../components/Header';


const PostJob = () => {
    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <>
    <Header/>
    <div className='container d-flex align-items-center mt-5 w-100'>
    <Form noValidate validated={validated} onSubmit={handleSubmit}>
    <Row className="mb-5">
    <Form.Group as={Col} lg="12" controlId="validationCustom01">
      <Form.Label>Job Title</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="Add job title, role vacancies etc"
        defaultValue=""
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>
    </Row>

    <Row className="mb-5">
    <Form.Group as={Col} md="4" controlId="validationCustom02">
      <Form.Label>Tags</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="Job keyword,tag etc"
        defaultValue=""
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="4" controlId="validationCustom02">
      <Form.Label>Job Role</Form.Label>
      <Form.Control
        required
        type="text"
        placeholder="Job Role"
        defaultValue=""
      />
      <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="4" controlId="validationCustom04">
      <Form.Label>Job Level</Form.Label>
      <Form.Control type="text" placeholder="" required />
      <Form.Control.Feedback type="invalid">
      </Form.Control.Feedback>
    </Form.Group>
    </Row>

    <Row className="mb-5">
    <Form.Group as={Col} md="4" controlId="validationCustom04">
      <Form.Label>Min Salary</Form.Label>
      <Form.Control type="text" placeholder="INR" required />
      <Form.Control.Feedback type="invalid">
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="4" controlId="validationCustom04">
      <Form.Label>Max Salary</Form.Label>
      <Form.Control type="text" placeholder="INR" required />
      <Form.Control.Feedback type="invalid">
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="4" controlId="validationCustom04">
      <Form.Label>Vaccancies</Form.Label>
      <Form.Control type="text" placeholder="" required />
      <Form.Control.Feedback type="invalid">
      </Form.Control.Feedback>
    </Form.Group>

    </Row>
  
   <Row className="mb-5">
    <Form.Group as={Col} md="6" controlId="validationCustom04">
      <Form.Label>Country</Form.Label>
      <Form.Control type="text" placeholder="Country" required />
      <Form.Control.Feedback type="invalid">
        Please provide a valid country.
      </Form.Control.Feedback>
    </Form.Group>

    <Form.Group as={Col} md="6" controlId="validationCustom03">
      <Form.Label>City</Form.Label>
      <Form.Control type="text" placeholder="City" required />
      <Form.Control.Feedback type="invalid">
        Please provide a valid city.
      </Form.Control.Feedback>
    </Form.Group>
   </Row>

   <Row className="mb-4">
    <Form.Group as={Col} md="12" controlId="validationCustom01">
      <Form.Label>Job Description</Form.Label>
      <Form.Control style={{height:'200px'}}
        required
        type="text"
        placeholder=""
        defaultValue=""
      />
    </Form.Group>
    </Row>

   <Button className='violetbtn mb-5' type="submit">Post Job</Button>
    </Form>
    </div>
    </>
  )
}

export default PostJob