import { useQuery } from '@tanstack/react-query'
import blogService from '../services/blogs'

import { useParams } from 'react-router-dom'

const Comments = () => {
	const params = useParams()
	console.log(params)

	const id = params.id

	const { isSuccess, isLoading, data } = useQuery(
		['comments', id],
		async () => await blogService.getComments(id)
	)

	if (isLoading) {
		return <div>Loading Comments...</div>
	}
	if (isSuccess) {
		console.log(data)
		return (
			<>
				<h2>Comments</h2>
				<ul>
					{data.map((comment) => (
						<li key={comment.id}>{comment.text}</li>
					))}
				</ul>
			</>
		)
	}
}
export default Comments
