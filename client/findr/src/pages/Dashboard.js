import { useNavigate } from 'react-router';
import * as Icon from 'react-bootstrap-icons';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Posts from '../component/Posts';
import { useDispatch, useSelector } from 'react-redux';

const Dashboard = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const statePost = useSelector((state) => state.posts);
	const onClick = () => {
		localStorage.clear();
		navigate('/');
	};
	useEffect(() => {
		axios.get(`http://localhost:8000/api/v1/posts`).then((response) => {
			dispatch({
				type: 'POPULATE_POSTS',
				payload: { posts: response.data },
			});
		});
	}, []);

	return (
		<div>
			<div className='d-flex justify-content-between p-3'>
				<a href='/addpost'>
					<Icon.PlusCircle
						size={20}
						className='me-1'
					/>
					Add post
				</a>
				<button
					className='btn btn-danger'
					onClick={onClick}
				>
					Logout
				</button>
			</div>

			<h2 className='text-center fw-bold'><Icon.PinAngleFill className='me-2'/>MISSING</h2>
			<div className='justify-content-center d-flex flex-wrap'>
				{statePost.map((posts, index) => {
					return (
						<Posts
							key={index}
							props={posts}
						/>
					);
				}).reverse()}
			</div>
		</div>
	);
};

export default Dashboard;
