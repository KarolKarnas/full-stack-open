import { useParams } from 'react-router-dom'
import userService from '../services/users'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'

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
				<h2 className='text-3xl font-bold'>{user.username} </h2>
				<h2 className='text-2xl font-bold font-serif mt-2 mb-5'>Added blogs:</h2>
				<ul className='list-disc italic pl-5'>
					{user.blogs.map((blog) => (
						<Link key={blog.id} to={`/blogs/${blog.id}`}>
							<li className=' hover:bg-cyan-200 hover:text-cyan-700'>{blog.title}</li>
						</Link>
					))}
				</ul>
			</>
		)
	}
}
export default UserPage
