import KitchenSinkStory from 'react-data-table-component';
import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import emailjs from '@emailjs/browser';
const AdminPost = (props) => {
	const [reporter, setReporter] = useState(props);
	const navigate = useNavigate();

	const columns = [
		{
			name: 'Title',
			selector: (row) => row.title,
			wrap: true,
			sortable: true,
		},
		{
			name: 'Full Name',
			selector: (row) => row.fullName,
			wrap: true,
			sortable: true,
		},
		{
			name: 'Description',
			selector: (row) => row.description,
			wrap: true,
			sortable: true,
		},
		{
			name: 'Type',
			selector: (row) => row.type,
			wrap: true,
			sortable: true,
		},
		{
			name: 'Status',
			selector: (row) => row.status,
			wrap: true,
			visible: false,
		},
		{
			name: 'Request',
			selector: (row) => row.rfullName,
			wrap: true,
			sortable: true,
		},
		{
			name: 'Email',
			selector: (row) => row.email,
			wrap: true,
			sortable: true,
		},
		{
			name: 'Contact',
			selector: (row) => row.contactNumber,
			wrap: true,
			sortable: true,
		},
		{
			name: 'Action',
			cell: (row) => (
				<button
					onClick={(e) => {
						handleApproveClick(e);
					}}
					className=' btn btn-info'
					id={row.id}
				>
					Approve
				</button>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
		{
			name: 'Action',
			cell: (row) => (
				<button
					onClick={(e) => {
						handleDeleteClick(e);
					}}
					className='btn btn-danger'
					id={row.id}
				>
					Delete
				</button>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
		{
			name: 'Action',
			cell: (row) => (
				<button
					onClick={(e) => {
						handleFoundClick(e);
					}}
					className='btn btn-success'
					id={row.id}
				>
					Found
				</button>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
		{
			name: 'Action',
			cell: (row) => (
				<button
					onClick={(e) => {
						handleDismissClick(e);
					}}
					className='btn btn-warning'
					id={row.id}
				>
					Dismiss
				</button>
			),
			ignoreRowClick: true,
			allowOverflow: true,
			button: true,
		},
	];

	let [details, setDetails] = useState({
		firstname: '',
		lastname: '',
		email: '',
		subject: '',
		message: '',
	});
	const sendEmail = async (e, postId) => {
		e.preventDefault();
		axios
			.get(`http://localhost:8000/api/v1/posts/${postId}`)
			.then((result) => {
				setDetails({
					firstname: result.data.userId.firstName,
					lastname: result.data.userId.lastName,
					email: result.data.userId.email,
					subject: `Missing ${result.data.fullName}`,
					message: `As of today, ${result.data.fullName} Please confirm the identity of the person found`,
				});
			})
			.catch(console.log());
		emailjs
			.send(
				'service_91g4ubs', //service
				'template_spetplr', //template
				details,
				'jS8ciN8R_g2z43kAw', //public key
			)
			.then(
				(result) => {
					console.log(result.text, 'error 1');
				},
				(error) => {
					console.log(error.text, 'error 2');
				},
			);

		window.location.reload();
	};

	const handleApproveClick = (state) => {
		axios
			.patch(`http://localhost:8000/api/v1/posts/${state.target.id}`, {
				type: 'Approved',
			})
			.then((response) => {
				if (response.data.status === 'success') {
					alert(response.data.status);
				} else {
					alert(response.data.status);
				}
			});
		window.location.reload();
	};
	const handleDeleteClick = (state) => {
		state.preventDefault();
		axios
			.patch(`http://localhost:8000/api/v1/posts/${state.target.id}`, {
				type: 'Pending',
			})
			.then((response) => {
				if (response.data.status === 'success') {
					alert(response.data.status);
				} else {
					alert(response.data.status);
				}
			});
		window.location.reload();
	};
	const handleFoundClick = (state) => {
		axios
			.patch(`http://localhost:8000/api/v1/posts/${state.target.id}`, {
				status: 'Found',
			})
			.then((response) => {
				if (response.data.status === 'success') {
					alert(
						' We have successfully found the Missing person sending email...',
					);
					sendEmail(state, state.target.id);
				} else {
					alert(response.data.status);
				}
			});
		// window.location.reload();
	};
	const handleDismissClick = (state) => {
		state.preventDefault();
		axios
			.patch(`http://localhost:8000/api/v1/posts/${state.target.id}`, {
				status: 'Dismiss',
				type: 'Deleted',
			})
			.then((response) => {
				if (response.data.status === 'success') {
					alert(response.data.status);
				} else {
					alert(response.data.status);
				}
			});
		window.location.reload();
	};
	return (
		<div className='p-5'>
			<KitchenSinkStory
				striped
				direction='auto'
				fixedHeaderScrollHeight='300px'
				pagination
				responsive
				subHeaderAlign='right'
				subHeaderWrap
				columns={columns}
				data={
					reporter.post.length &&
					reporter.post.map((item, index) => {
						let dataset = [
							{
								id: item._id,
								title: item.title,
								fullName: item.fullName,
								description: item.description,
								contactNumber: item.userId.contactNumber,
								address: item.userId.address,
								email: item.userId.email,
								rfullName: `${item.userId.firstName} ${item.userId.lastName}`,

								type: item.type,
								status: item.status,
							},
						];
						return dataset[0];
					})
				}
			/>
		</div>
	);
};

export default AdminPost;
