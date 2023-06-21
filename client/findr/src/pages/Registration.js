import { useState, useEffect } from 'react';
//* Logo
import * as Icon from 'react-bootstrap-icons';
//*CSS
/* import './css/registration.css'; */
//*Route
import { useNavigate } from 'react-router';
//*Axios
import axios from 'axios';
import cities from 'philippines/cities';
import regions from 'philippines/regions';
import provinces from 'philippines/provinces';
function Registration() {
	//* Philippines

	const [firstname, setFirstname] = useState('');
	const [lastname, setLastname] = useState('');
	const [email, setEmail] = useState('');
	const [contact, setContact] = useState('');
	const [password, setPassword] = useState('');
	const [cpassword, setCpassword] = useState('');
	const [showPassword, setShowPassword] = useState('password');

	const [pRegion, setPRegion] = useState('');
	const [pProvince, setPProvince] = useState('');
	const [pCity, setPCity] = useState('');
	const [street, setStreet] = useState('');
	const [houseNumber, setHouseNumber] = useState('');

	const onRegionChangeHandler = (e) => {
		setPRegion(e.target.value);
	};
	const onProvinceChangeHandler = (e) => {
		setPProvince(e.target.value);
	};
	const onCityChangeHandler = (e) => {
		setPCity(e.target.value);
	};
	const onStreetChangeHandler = (e) => {
		setStreet(e.target.value);
	};
	const onHouseNumberChangeHandler = (e) => {
		setHouseNumber(e.target.value);
	};

	const navigate = useNavigate();

	const [message, setMessage] = useState('');

	const onSubmitRegistration = (e) => {
		e.preventDefault();
		if (password !== cpassword) {
			return setMessage('Password not match!');
		}
		if (password.length < 7) {
			return setMessage('Use atleast 8 character');
		}

		axios
			.post('http://localhost:8000/api/v1/auth/register', {
				firstName: firstname,
				lastName: lastname,
				contactNumber: contact,
				email: email,
				password: password,
				address: `${pRegion}, ${pProvince},  ${pCity},  ${street},  ${houseNumber}`,
			})
			.then((result) => {
				localStorage.clear();
				localStorage.setItem('findr', result.data.result._id);
				navigate('/dashboard');
			});
	};
	return (
		<div className='vh-100 d-flex reg-con justify-content-center align-items-center'>
			<div className='d-flex justify-content-center align-items-center rounded py-3 px-4 shadow '>
				<div className='reg-col-1'>
					<a href='http://localhost:3000/'>
						<Icon.ArrowBarLeft
							size={25}
							className='mb-2 me-2'
							color='black'
						/>
					</a>
					<h6 className='mb-3'>Create Findr Account</h6>
					<form
						onSubmit={(e) => {
							onSubmitRegistration(e);
						}}
					>
						<div className='mb-3'>
							<div className='row'>
								<div className='col'>
									<label
										htmlFor='firstname'
										className='form-label'
									>
										First name:
									</label>
									<input
										type='text'
										className='form-control'
										id='firsname'
										placeholder='First name'
										required
										value={firstname}
										onChange={(e) => {
											setFirstname(e.target.value);
										}}
									/>
								</div>
								<div className='col'>
									<label
										htmlFor='lastname'
										className='form-label'
									>
										Last name:
									</label>
									<input
										type='text'
										className='form-control'
										id='lastname'
										placeholder='Last name'
										required
										value={lastname}
										onChange={(e) => {
											setLastname(e.target.value);
										}}
									/>
								</div>
							</div>
						</div>
						<div className='mb-3'>
							<label
								htmlFor='email'
								className='form-label'
							>
								Email:
							</label>
							<input
								type='email'
								className='form-control'
								id='email'
								placeholder='Email'
								required
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div className='mb-3'>
							<label
								htmlFor='username'
								className='form-label'
							>
								Contact:
							</label>
							<input
								type='number'
								className='form-control'
								id='contact'
								placeholder='Contact'
								required
								value={contact}
								onChange={(e) => {
									setContact(e.target.value);
								}}
							/>
							<label
								htmlFor='username'
								className='form-label'
							>
								Address:
							</label>
							<div className='d-flex'>
								<select
									className='form-select'
									id='region'
									value={pRegion}
									onChange={onRegionChangeHandler}
								>
									<option
										disabled={true}
										value=''
									>
										Region
									</option>
									{regions.map((region, index) => (
										<option
											key={region.name + index}
											value={region.key}
										>
											{region.name}
										</option>
									))}
								</select>

								<select
									className='form-select'
									id='province'
									value={pProvince}
									onChange={onProvinceChangeHandler}
								>
									<option
										disabled={true}
										value=''
									>
										Province
									</option>
									{provinces
										.filter((province, index) => province.region === pRegion)
										.map((item, index) => {
											return (
												<option
													key={item.name + index}
													value={item.key}
												>
													{item.name}
												</option>
											);
										})}
								</select>

								<select
									className='form-select'
									id='city'
									value={pCity}
									onChange={onCityChangeHandler}
								>
									<option
										disabled={true}
										value=''
									>
										Municipality
									</option>
									{cities
										.filter((city, index) => city.province === pProvince)
										.map((item, index) => {
											return (
												<option
													key={item.name + index}
													value={item.name}
												>
													{item.name}
												</option>
											);
										})}
								</select>
							</div>
							<br />
							<div className='d-flex justify-content-around'>
								<input
									type={'text'}
									className='form-control'
									id={'stBarangray'}
									placeholder={'Enter street / barangray'}
									value={street}
									onChange={(e) => onStreetChangeHandler(e)}
								/>

								<input
									type={'text'}
									className='form-control'
									id={'houseNumber'}
									placeholder={'Enter house number'}
									value={houseNumber}
									onChange={(e) => onHouseNumberChangeHandler(e)}
								/>
							</div>
						</div>
						<div className='mb-3'>
							<div className='row'>
								<label
									htmlFor='password'
									className='form-label'
								>
									Password:
								</label>
								<div className='col'>
									<input
										type={showPassword}
										className='form-control'
										id='password'
										placeholder='Password'
										required
										value={password}
										onChange={(e) => {
											setPassword(e.target.value);
											if (password.length < 7) {
												setMessage('Use atleast 8 character');
											} else {
												setMessage('');
											}
										}}
									/>
								</div>
								<div className='col'>
									<input
										type={showPassword}
										className='form-control'
										id='cpassword'
										placeholder='Confirm'
										required
										value={cpassword}
										onChange={(e) => {
											setCpassword(e.target.value);
										}}
									/>
								</div>
								{message ? (
									<small className='text-danger'>{message}</small>
								) : null}
							</div>
						</div>
						<div className='form-check'>
							<input
								className='form-check-input'
								type='checkbox'
								value=''
								id='flexCheckDefault'
								onChange={(e) => {
									e.target.checked === true
										? setShowPassword('text')
										: setShowPassword('password');
								}}
							/>
							<label
								className='form-check-label'
								htmlFor='flexCheckDefault'
							>
								Show password
							</label>
						</div>
						<div className='mb-3 mt-2 d-flex justify-content-center align-items-center mx-auto '>
							<input
								type='submit'
								className='btn btn-success me-3 px-4 '
								value='Register'
							/>
							<br />
						</div>
					</form>
				</div>
			</div>
		</div>
	);
}

export default Registration;
