import axios from 'axios';
import {useEffect, useState} from 'react';
import * as Icon from 'react-bootstrap-icons'
import moment from 'moment';
const Posts = (props) => {
	return (
		<>
		{props.props.type === 'Approved' &&
			(<div className=' w-75 p-1 '>
				<div className='mx-auto p-3 card w-75 my-3 shadow-lg'>
					{props.props.status === 'Missing' && <h6 className='card-subtitle mb-2  bg-danger p-1 text-light'><i>Status:</i> {props.props.status}</h6>}
					{props.props.status === 'Found' && <h6 className='card-subtitle mb-2    bg-success p-1 text-light'><i>Status:</i> {props.props.status}</h6>}
					<span>
					 	<Icon.PersonCircle size={30} className='me-2'/>{props.props.userId.firstName}
					</span>
					<br/>
					<span>
						Contact Us: <strong> {props.props.userId.contactNumber}
						</strong> 
					</span>
					<div className='p-3 d-flex justify-content-center align-items-center'>
					{
						props.props.image.map((item) => {
							{console.log(item)}
							return <div className='d-flex flex-wrap'><img
								src={item}
								className=' w-100 p-1 '
								alt='...'
								width='500'
							/>
							</div>
						})
					}
					</div>
					<hr />
					<span className='text-center'><i>Missing person's full name</i></span>
					{props.props.status === 'Found' && <h3 className='card-title text-center text-success'>{props.props.fullName}</h3>}
					{props.props.status === 'Missing' && <h3 className='card-title text-center text-danger'>{props.props.fullName}</h3>}
					<div className='card-body'>
						<small><i>
							{moment(props.props.dateCreated).format("DD/MM/YYYY hh:mm:ss")}
							</i></small>
						
						<h5 className='card-title py-3'>{props.props.title}</h5>
						
						<p className='card-text '>
							{props.props.description}
						</p>
					</div>
						</div>
						</div>
				)
				}
		</>
	);
};

export default Posts;
