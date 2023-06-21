import { Routes, Route } from 'react-router';
import './App.css';
import AdminDashboard from './pages/AdminDashboard';
import Registration from './pages/Registration';
import Dashboard from './pages/Dashboard';
import Error from './component/Error';
import LoginPage from './pages/LoginPage';
import AddPost from './component/AddPost';
const App = () => {
	return (
		<>
			<Routes>
				<Route
					path='/admin'
					element={<AdminDashboard />}
				/>
				<Route
					path='/dashboard'
					element={<Dashboard />}
				/>
				<Route
					path='/addpost'
					element={<AddPost />}
				/>
				<Route
					path='/register'
					element={<Registration />}
				/>
				{/* <Route
					path='/register'
					element={<AdminRegistration />}
				/> */}
				<Route
					path='/Login'
					element={<LoginPage />}
				/>
				<Route
					path='/'
					element={<LoginPage />}
				/>
				<Route
					path='*'
					element={<Error />}
				/>
			</Routes>
		</>
	);
};
export default App;
