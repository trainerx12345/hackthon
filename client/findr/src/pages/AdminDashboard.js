import * as React from 'react';
import * as Icon from 'react-bootstrap-icons';
import axios from 'axios';
import Users from '../component/Users';
import AdminPost from '../component/AdminPost';
import { useNavigate } from 'react-router';
export default function Dashboard() {
	const navigate = useNavigate();
	const [users, setUsers] = React.useState({});
	const [posts, setPosts] = React.useState({});
	const [isVisible, setIsVisible] = React.useState(false);

	//TODO : fetch all the users
	React.useEffect(() => {
		axios
			.get('http://localhost:8000/api/v1/users')
			.then((result) => {
				setUsers(result.data);
			})
			.catch(console.log());
	}, []);

	//TODO : fetch all posts
	React.useEffect(() => {
		axios
			.get('http://localhost:8000/api/v1/posts')
			.then((result) => {
				setPosts(result.data);
			})
			.catch(console.log());
	}, []);

	//TODO : search for posts

	const seeUser = () => {
		setIsVisible(true);
	};
	const seePost = () => {
		setIsVisible(false);
	};
	const onClick = () => {
		localStorage.clear();
		navigate('/');
	};
	return (
		<>
		<div className='d-flex justify-content-between p-3'>
			<span className='fs-2 fw-bold'> Findr </span>
		
			<button
				className='text-danger border-0 bg-light fs-4 float-right'
				onClick={onClick}
			>
				<Icon.BoxArrowInLeft className='me-1'/>Logout
			</button>
		</div>
		<div className='mx-auto text-center'>
			<h1 className='p-2 text-info mx-auto m-3'>Admin Dashboard</h1>
			<div className='container-fluid d-flex flex-wrap justify-content-center align-items-center p-2'>
				<button
					type='button'
					className='btn btn-light border-0 mx-auto  w-25 shadow'
					onClick={seePost}
				>
					POSTS
				</button>
				<button
					type='button'
					className='btn btn-light border-0 mx-auto w-25 shadow'
					onClick={seeUser}
				>
					USERS
				</button>
			</div>

			<div className='d-flex justify-items-center align-content-center'>
				<div className='container-fluid d-flex justify-content-center align-items-center flex-wrap shadow'>
					{isVisible ? (
						<div className='container-fluid'>
							{users.length ? <Users users={users} /> : null}
						</div>
					) : posts.length ? (
						<AdminPost post={posts} />
					) : null}
				</div>
			</div>
		</div>
		</>
	);
}
