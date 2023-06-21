import { useNavigate } from 'react-router';

export default function Error() {
	let navigate = useNavigate();
	function handleClick() {
		navigate(-1);
	}
	return (
		<div>
			<h1>Nothing to see here!</h1>
			<p>
				<button
					className='btn btn-danger'
					onClick={() => handleClick()}
				>
					Click here to reload the app
				</button>
			</p>
		</div>
	);
}
