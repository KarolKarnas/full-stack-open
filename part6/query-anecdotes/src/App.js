import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import AnecdoteList from './components/AnecdoteList'


import { NotificationContextProvider } from './components/NotificationContext'


const App = () => {



	return (
		<NotificationContextProvider>
		<div>
			<h3>Anecdote app</h3>

			<Notification />
			<AnecdoteForm />
			<AnecdoteList />


		</div>
			</NotificationContextProvider>
	)
}

export default App
