import { useState, useEffect } from 'react';
//* Logo
import * as Icon from 'react-bootstrap-icons';
//*CSS
/* import './css/registration.css'; */
//*Route
import { useNavigate } from 'react-router';
//*Axios
import axios from 'axios';
function AddPost() {
	const [title, setTitle] = useState('');
	const [fullName, setFullName] = useState('');
	const [image, setImage] = useState('');
	const [description, setDescription] = useState('');
	const [userId, setUserId] = useState('');

	//* Philippines
	const onSubmit = (e) => {
		axios
			.post('http://localhost:8000/api/v1/posts', {
				title: title,
				fullName: fullName,
				image: image,
				description: description,
				userId: localStorage.getItem('findr'),
			})
			.then((result) => {
				console.log(result.data.status);
			});
	};
	return (
		<div className='add-post-container'>
			<a href='/dashboard'>
				<Icon.ArrowReturnLeft
					size={25}
					className='mb-2 me-2'
					color='black'
				/>
			</a>
			<h2 className='mb-3'>Add Post</h2>
			<form
				className='f'
				onSubmit={(e) => {
					onSubmit(e);
				}}
			>
				<div className='mb-3'>
					<div className='row'>
						<div className='col'>
							<label
								htmlFor='firstname'
								className='form-label'
							>
								Title:
							</label>
							<input
								type='text'
								className='form-control'
								id='title'
								placeholder='Put title here...'
								required
								value={title}
								onChange={(e) => {
									setTitle(e.target.value);
								}}
							/>
						</div>
					</div>
					<div className='col'>
						<label
							htmlFor='lastname'
							className='form-label'
						>
							Full Name:
						</label>
						<input
							type='text'
							className='form-control'
							id='fullname'
							placeholder='Put the missing person full name here...'
							required
							value={fullName}
							onChange={(e) => {
								setFullName(e.target.value);
							}}
						/>
					</div>
				</div>
				<div className='mb-3'>
					<label
						htmlFor='email'
						className='form-label'
					>
						Image:
					</label>
					<input
						type='url'
						name='url'
						id='url'
						placeholder='Image Link'
						value={image}
						required
						onChange={(e) => {
							setImage(e.target.value);
						}}
					/>
					<div className='photo-container'>
						{image && (
							<img
								src={image}
								alt='Preview'
							/>
						)}
					</div>
				</div>
				<div className='mb-3'>
					<label
						htmlFor='username'
						className='form-label'
					>
						description:
					</label>
					<textarea
						type='number'
						className='form-control'
						id='description'
						placeholder='Put description here...'
						required
						value={description}
						onChange={(e) => {
							setDescription(e.target.value);
						}}
					/>

					<input
						type='submit'
						className='btn color m-5 px-4'
						value='Add Post'
					/>
					<br />
				</div>
			</form>
		</div>
	);
}

export default AddPost;
