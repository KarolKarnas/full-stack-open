import userService from '../services/users'
import User from './User'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

const Users = () => {
	const { isSuccess, isLoading, data: users } = useQuery(['users'], userService.getAll)

	if (isLoading) {
		return <div>Loading Users...</div>
	}
	if (isSuccess) {
		return (
			<>
				<h2>Users</h2>
				{users.map((user) => (
					<Link key={user.id} to={`/users/${user.id}`}>
						<User  user={user} />
					</Link>
				))}
			</>
		)
	}
}

export default Users
