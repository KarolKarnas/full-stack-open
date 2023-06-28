import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from '../requests'

import { useContext } from 'react'
import { NotificationContext } from './NotificationContext'

const AnecdoteList = () => {
	const dispatchNotification = useContext(NotificationContext)[1]

	const queryClient = useQueryClient()

	const updateNoteMutation = useMutation(updateAnecdote, {
		onSuccess: (updatedAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			const anecdoteToUpdateIndex = anecdotes.findIndex(
				(anecdote) => anecdote.id === updatedAnecdote.id
			)
			const updatedAnecdotes = [...anecdotes]
			updatedAnecdotes[anecdoteToUpdateIndex].votes =
				updatedAnecdotes[anecdoteToUpdateIndex].votes + 1
			queryClient.setQueryData('anecdotes', updatedAnecdotes)

			dispatchNotification({
				type: 'NOTIFICATION',
				payload: `Voted for ${updatedAnecdotes[anecdoteToUpdateIndex].content} it has now ${updatedAnecdotes[anecdoteToUpdateIndex].votes} votes!`,
			})
		},
	})

	const handleVote = (anecdote) => {
		updateNoteMutation.mutate({ ...anecdote, votes: anecdote.votes + 1 })
		console.log('vote')
	}

	const result = useQuery('anecdotes', getAnecdotes, {
		retry: 1,
		refetchOnWindowFocus: false,
	})
	console.log(result)

	if (result.isLoading) {
		return <div>loading data...</div>
	}

	if (result.isError) {
		return <span>anecdote service not available due to problems in server</span>
	}

	const anecdotes = result.data

	return (
		<>
			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</>
	)
}

export default AnecdoteList
