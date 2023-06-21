import { useState, useEffect } from 'react';

//*Route
import { useNavigate } from 'react-router';

//*Axios
import axios from 'axios';

function LoginPage() {
	//* two way binding
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [message, setMessage] = useState('');
	const [type, setType] = useState('');
	const navigate = useNavigate();
	useEffect(() => {
		//TODO: Get user by id

		setType([]);
		// TODO get all user username for comparing
		axios.get('http://localhost:8000/api/v1/users/').then((result) => {
			setType(
				result.data.map((user) => {
					return user.type;
				}),
			);
		});
		// eslint-disable-next-line
	}, []);

	//* Function on submit
	const onSubmitForm = (e) => {
		e.preventDefault();
		//TODO : check if the user is in the database
		axios
			.post('http://localhost:8000/api/v1/auth/login', {
				email: email,
				password: password,
			})
			.then((result) => {
				if (result.data.id) {
					localStorage.clear();
					localStorage.setItem('findr', result.data.id);
					localStorage.setItem('type', result.data.type);
					if (localStorage.getItem('type') === 'admin') {
						navigate('/admin');
					}
				} else {
					setMessage('Invalid Password!');
				}
				window.location.reload();
			});
	};
	useEffect(() => {
		if ('findr' in localStorage) {
			return navigate('/dashboard');
		}

		return;
	}, []);
	return (
		<div className='d-flex border-dark justify-content-evenly px-5 vh-100'>
			<div className=' w-50 align-self-center me-5 p-5  hero'>
				<div className=''>
					<span className='display-2 fw-bold'>Welcome to Findr</span>
					<p className='fs-3'>
						Findr is an application for posting a missing person. This
						application aims to help those families, friends, and relatives of
						the people who are missing.
					</p>
				</div>
			</div>
			<div className='vh-100 w-50 mx-auto p-5 d-flex justify-content-center align-items-center login '>
				<div className='container-fluid  rounded  shadow p-5'>
					<div className='p-3 rounded-3 d-flex flex-column align-items-center'>
						<a
							href='http://localhost:3000/'
							className='text-center'
						>
							<h2 className='text-secondary display-5'>Findr</h2>
						</a>
						<small className='mb-3'>Login to continue</small>
						<form
							className='w-100'
							onSubmit={(e) => {
								onSubmitForm(e);
							}}
						>
							<div className='mb-3'>
								<label
									htmlFor='username'
									className='form-label'
								>
									Email:
								</label>
								<input
									type='email'
									className='form-control '
									id='username'
									placeholder='Enter Email'
									required
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
									}}
								/>
							</div>
							<div className='mb-2'>
								<label
									htmlFor='User Password'
									className='form-label'
								>
									Password:
								</label>
								<input
									type='password'
									className='form-control'
									id='password'
									placeholder='Enter password'
									required
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
									}}
								/>
							</div>
							<small
								className={`text-danger ${message ? 'visible' : 'invisible'}`}
							>
								{message}
							</small>
							<div className='mb-3 d-flex justify-content-end mb-5'>
								<a
									href=''
									className='link-primary'
								>
									Forgot Password?
								</a>
							</div>

							<div className='mb-3 d-flex justify-content-center'>
								<input
									type='submit'
									className='btn btn-success  w-75'
									value='Login'
								/>
							</div>
						</form>
						<p>
							Don't have an account?&nbsp;
							<span>
								<a
									href='/register'
									className='link-primary'
								>
									Sign Up
								</a>
							</span>
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default LoginPage;
