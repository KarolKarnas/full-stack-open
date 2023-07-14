import userService from '../services/users'
// import User from './User'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const Users = () => {
	const {
		isSuccess,
		isLoading,
		data: users,
	} = useQuery(['users'], userService.getAll)

	if (isLoading) {
		return <div>Loading Users...</div>
	}
	if (isSuccess) {
		return (
			<div className='container mx-auto'>
				<h2 className='text-2xl font-bold'>Users</h2>

				<p className='flex justify-between italic text-cyan-200'>
					<strong className=''>User</strong>
					<span>Blogs number</span>
				</p>
				{users.map((user) => (
					<Link key={user.id} to={`/users/${user.id}`}>
						<div className='hover:bg-cyan-200 hover:text-cyan-700 rounded-sm p-2'>
							<p className='flex justify-between p-3 hover:bg-cyan-200 hover:text-cyan-700'>
								<strong>{user.username}</strong>
								<span>{user.blogs.length}</span>
							</p>
							{/* <User user={user} /> */}
						</div>
					</Link>
				))}
			</div>
		)
	}
}

export default Users
