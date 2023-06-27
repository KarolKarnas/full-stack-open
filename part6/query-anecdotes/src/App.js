import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { getAnecdotes, updateAnecdote } from './requests'

const App = () => {
	const queryClient = useQueryClient()

	const updateNoteMutation = useMutation(updateAnecdote, {
    onSuccess: (updatedAnecdote) => {
      const anecdotes = queryClient.getQueryData('anecdotes')
      const anecdoteToUpdateIndex = anecdotes.findIndex(anecdote => anecdote.id === updatedAnecdote.id)
      const updatedAnecdotes = [...anecdotes]
      updatedAnecdotes[anecdoteToUpdateIndex].votes = updatedAnecdotes[anecdoteToUpdateIndex].votes + 1
      queryClient.setQueryData('anecdotes', updatedAnecdotes)
    }
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
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />

			{anecdotes.map((anecdote) => (
				<div key={anecdote.id}>
					<div>{anecdote.content}</div>
					<div>
						has {anecdote.votes}
						<button onClick={() => handleVote(anecdote)}>vote</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default App
