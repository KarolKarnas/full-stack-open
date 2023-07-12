import { useParams } from 'react-router-dom'
import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'

const UserPage = () => {
	const params = useParams()

	const { isSuccess, isLoading, data } = useQuery(['users'], userService.getAll)

	if (isLoading) {
		return <div>Loading User...</div>
	}
	if (isSuccess) {
		const user = data.find((user) => user.id === params.id)
		return (
			<>
				<h2>{user.username} </h2>
				<h4>added blogs</h4>
				<ul>
					{user.blogs.map((blog) => (
						<li key={blog.id}>{blog.title}</li>
					))}
				</ul>
			</>
		)
	}
}
export default UserPage
