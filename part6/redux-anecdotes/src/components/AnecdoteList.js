import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'
// import { addVoteBackend } from '../reducers/anecdoteReducer'
import { createNotification, removeNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
	return (
		<>
			<div>{anecdote.content}</div>
			<div>
				has {anecdote.votes}
				<button onClick={handleClick}>vote</button>
			</div>
		</>
	)
}

const AnecdoteList = () => {
	const dispatch = useDispatch()
	const anecdotes = useSelector(({filter, anecdotes}) => {
		if (filter === '') {
return anecdotes
		} else {
			const filteredAnecdotes = anecdotes.filter(anecdote =>  anecdote.content.includes(filter))
			return filteredAnecdotes
		}
	})

	const vote = (id, content) => {
		console.log('vote', id)
		dispatch(addVote(id))
		dispatch(createNotification(`you voted '${content}'`))
		setTimeout(() => {
			dispatch(removeNotification())
		}, 5000)
	}

	return (
		<>
			{
			[...anecdotes]
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<Anecdote
						key={anecdote.id}
						anecdote={anecdote}
						handleClick={() => vote(anecdote.id, anecdote.content)}
					/>
				))}
		</>
	)
}

export default AnecdoteList
