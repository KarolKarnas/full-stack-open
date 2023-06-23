import { useSelector, useDispatch } from 'react-redux'
import { addVote } from '../reducers/anecdoteReducer'

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

	const vote = (id) => {
		console.log('vote', id)
		dispatch(addVote(id))
	}

	return (
		<>
			{anecdotes
				.sort((a, b) => b.votes - a.votes)
				.map((anecdote) => (
					<Anecdote
						key={anecdote.id}
						anecdote={anecdote}
						handleClick={() => vote(anecdote.id)}
					/>
				))}
		</>
	)
}

export default AnecdoteList
