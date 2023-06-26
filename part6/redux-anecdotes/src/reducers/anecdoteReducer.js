import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../services/anecdotes'

const anecdoteSlice = createSlice({
	name: 'anecdotes',
	initialState: [],
	reducers: {
		createAnecdote(state, action) {
state.push(action.payload)
		},
		addVote(state, action) {
			const id = action.payload
			const anecdoteToVote = state.find((anecdote) => anecdote.id === id)
			const changedAnecdote = {
				...anecdoteToVote,
				votes: anecdoteToVote.votes + 1,
			}
			// console.log(JSON.parse(JSON.stringify(state)))
			return state.map((anecdote) =>
				anecdote.id === id ? changedAnecdote : anecdote
			)
		},
		setAnecdotes(state, action) {
			return action.payload
		}
	},
})

export const {createAnecdote , addVote, setAnecdotes} = anecdoteSlice.actions

export const initializeAnecdotes = () => {
	return async dispatch => {
		const anecdotes = await anecdotesService.getAll()
		dispatch(setAnecdotes(anecdotes))
	}
}

export default anecdoteSlice.reducer
