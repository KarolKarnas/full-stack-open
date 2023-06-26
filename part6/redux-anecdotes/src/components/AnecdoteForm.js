import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { createNotification, removeNotification } from '../reducers/notificationReducer'
// import anecdoteService from '../services/anecdotes'

const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const addAnecdote = (e) => {
		e.preventDefault()
    const content = e.target.anecdote.value
    e.target.anecdote.value = ''
  //  const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(content))
    dispatch(createNotification(`you created '${content}'`, 5))
    // setTimeout(() => {
		// 	dispatch(removeNotification())
		// }, 5000)
	}

return (
  <>
  <h2>create new</h2>
  <form onSubmit={addAnecdote}>
  <div>
    <input name='anecdote' />
  </div>
  <button>create</button>
</form>
</>
)

}

export default AnecdoteForm