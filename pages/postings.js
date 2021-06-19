import React, { useEffect, useState } from "react";
import Link from "next/link";
import {Container, Row, Table, Button, Form, FormControl} from "react-bootstrap";

const Postings = ({posts}) => {
	var [pts,usePosts] =useState(posts)


	var onSearchChangeHandler=async(event)=>{
		let val = event.target.value.trim();
		if(val.length>0){
			const res = await fetch(`${process.env.BACKEND_URL}/search/`+val);
			const resJson = await res.json();
			if (resJson.success) {
				console.log(resJson.data)
				usePosts(resJson.data);
			}
		}
		else{
			usePosts(posts);
		}

	  }
	return (
	<Container>
		<Link href='/'>
			<Button size='lg' className='mt-5'>
				&larr; Back
			</Button>
		</Link>
		<Row className='h-100 justify-content-center'>
			<h1 className='display-1 text-center w-100'>Job Postings</h1>
			<div style={{width:"100%"}}>
			<Form style={{marginLeft:"20px",width:"200px"}}>
              <FormControl
                type="text"
                placeholder="Search"
                className="mr-sm-2"
                onChange={onSearchChangeHandler.bind(this)}
              />			
            </Form>
			</div>
			<Table responsive className='mt-5' striped bordered hover>
				<thead>
					<tr>
						<th>Job Title</th>
						<th>Company</th>
						<th>Job Summary</th>
						<th>Required Skills</th>
						<th>Recruiter Email</th>
					</tr>
				</thead>
				<tbody>
				{
					pts.map(({ title, company, summary, skills, email }, id) => (
						<tr key={company + id}>
							<td>{title}</td>
							<td>{company}</td>
							<td>{summary}</td>
							<td>{skills}</td>
							<td>{email}</td>
						</tr>
					))
				}
				</tbody>
			</Table>
		</Row>
	</Container>
)};

export default Postings;

Postings.getInitialProps = async params => {
	let posts = [];
	const res = await fetch(`${process.env.BACKEND_URL}/postings`);
	const resJson = await res.json();
	if (resJson.success) {
		posts = resJson.data.postings;
	}
	return {posts};
};
