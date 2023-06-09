import { useMutation, useQueryClient } from 'react-query'
import { createAnecdote } from '../requests'
import { useContext } from 'react'
import { NotificationContext } from './NotificationContext'

const AnecdoteForm = () => {

	const dispatchNotification = useContext(NotificationContext)[1]

	const queryClient = useQueryClient()

	const newAnecdoteMutation = useMutation(createAnecdote, {
		onSuccess: (newAnecdote) => {
			const anecdotes = queryClient.getQueryData('anecdotes')
			queryClient.setQueryData('anecdotes', anecdotes.concat(newAnecdote))
			dispatchNotification({type:'NOTIFICATION', payload: `New anecdote '${newAnecdote.content}' added`})
		},
		onError: (error) => {
			dispatchNotification({type:'NOTIFICATION', payload: error.response.data.error})
		}
	})

	const onCreate = (event) => {
		event.preventDefault()
		const content = event.target.anecdote.value
		event.target.anecdote.value = ''
		console.log('new anecdote')
		newAnecdoteMutation.mutate({ content, votes: 0 })
	}

	return (
		<div>
			<h3>create new</h3>
			<form onSubmit={onCreate}>
				<input name='anecdote' />
				<button type='submit'>create</button>
			</form>
		</div>
	)
}

export default AnecdoteForm
