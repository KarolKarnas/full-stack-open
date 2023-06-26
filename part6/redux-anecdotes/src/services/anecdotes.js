import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
	const response = await axios.get(baseUrl)
	return response.data
}

const createNew = async (content) => {
	const anecdote = { content, votes: 0 }
  const response = await axios.post(baseUrl, anecdote)
  // console.log(response.data)
  return response.data
}

const update = async (id, updatedAnecdote) => {
  // const anecdotes = await getAll()
  // const anecdoteToUpdate = anecdotes.find(anecdote => anecdote.id === id)
  // const updatedAnecdote = {
  //   ...anecdoteToUpdate, votes: anecdoteToUpdate.votes + 1}
  const response = await axios.patch(`${baseUrl}/${id}`, updatedAnecdote)
  console.log(response.data)
  return response.data
}

export default { getAll, createNew, update}
