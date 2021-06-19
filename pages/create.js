import React from "react";
import Link from "next/link";
import {Button, Container, Row, Form} from "react-bootstrap";
import { useState } from 'react';


const Create = () => {

const [company, setCompany] = useState("");
const [email, setEmail] = useState("");
const [skills, setSkills] = useState("");
const [summary, setSummary] = useState("");
const [title, setTitle] = useState("");
const [msg,setMsg]=useState("");
const [err,setErr]=useState("");


const handleSubmit= (e) => {
  var data={company:company,email:email,skills:skills,summary:summary,title:title}
  setMsg("")
  setErr("")
  if(company=="" || email=="" || skills=="" ||  summary==""|| title==""){
    setErr("All fields are mandatory..")
    return
  }
  fetch(`${process.env.BACKEND_URL}/create`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
      }).then(response => response.json()).then(res=>{
        console.log(res)
        if(res.success){
          setMsg("Record Added Successfully")
          setCompany("")
          setTitle("")
          setSummary("")
          setEmail("")
          setSkills("")
        }      
      })
}

  return (
    <Container>
      <Link href='/'>
        <Button size='lg' className='mt-5'>
          &larr; Back
        </Button>
      </Link>
      <Row className='h-100 justify-content-center'>
			  <h1 className='display-1 text-center w-100'>Create Posting</h1>
        <Form className='w-100 ml-1 mr-1' onSubmit={e => { handleSubmit(e) }}>
          <Form.Group>
            <Form.Label>Job Title</Form.Label>
            <Form.Control value={title} onChange={e=>{
              setMsg("")
              setErr("")
              setTitle(e.target.value)}} type="text" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Company</Form.Label>
            <Form.Control value={company}  onChange={e=>{
              setMsg("")
              setErr("")
              setCompany(e.target.value)}} type="text" />
          </Form.Group>
          <Form.Group>
            <Form.Label>Job Summary</Form.Label>
            <Form.Control  value={summary}  onChange={e=>{
              setMsg("")
              setErr("")
              setSummary(e.target.value)}} as="textarea" rows={3} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Required Skills</Form.Label>
            <Form.Control  value={skills}  onChange={e=>{
              setMsg("")
              setErr("")
              setSkills(e.target.value)}} as="textarea" rows={1} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Recruiter Email Address</Form.Label>
            <Form.Control  value={email}  onChange={e=>{
              setMsg("")
              setErr("")
              setEmail(e.target.value)}} type="email" placeholder="name@company.com" />
          </Form.Group>
        </Form>
        <p className='text-center w-100' style={{color:"green",fontSize:"14pt"}}>{msg}</p>
        <p className='text-center w-100' style={{color:"red",fontSize:"14pt"}}>{err}</p>
        <br></br>
        <Button size='lg' className='mt-5' onClick={handleSubmit}>
          Submit
        </Button>
      </Row>
    </Container>
  )
};

export default Create;
