import { useState, useEffect, useCallback } from 'react';
import KitchenSinkStory from 'react-data-table-component';

const Users = (props) => {

	const columns = [
		{
			name: 'Full Name',
			selector: (row) => row.fullName,
			sortable: true,
		},
		{
			name: 'Contact Number',
			selector: (row) => row.contactNumber,
			sortable: true,
		},
		{
			name: 'Address',
			selector: (row) => row.address,
			sortable: true,
		},
		{
			name: 'Email Address',
			selector: (row) => row.email,
			sortable: true,
		},
		{
			name: 'User Type',
			selector: (row) => row.type,
			sortable: true,
		},
	];

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
					props.users.length
						? props.users.map((item, index) => {
								let data = [
									{
										fullName: `${item.firstName} ${item.lastName}`,
										contactNumber: item.contactNumber,
										address: item.address,
										email: item.email,
										type: item.type,
									},
								];
								return data[0];
						  })
						: null
				}
			/>
		</div>
	);
};

export default Users;
