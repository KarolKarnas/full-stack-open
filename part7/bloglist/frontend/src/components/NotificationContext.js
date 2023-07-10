import { createContext, useReducer } from 'react'
import notificationReducer from './NotificationReducer'

// const notificationReducer = (state, action) => {
// 	switch (action.type) {
// 		case 'SET_MESSAGE':
// 			return action.payload
// 		case 'REMOVE_MESSAGE':
// 			return null

// 		default:
// 			return state
// 	}
// }

const NotificationContext = createContext()

export const NotificationContextProvider = ({ children }) => {
	const [state, notificationDispatch] = useReducer(notificationReducer, null)

	const setNotification = (msg, type) => {
		notificationDispatch({
			type: 'SET_MESSAGE',
			payload: { msg, type },
		})

		setTimeout(() => {
			notificationDispatch({ type: 'REMOVE_MESSAGE' })
		}, 3000)
	}

	return (
		<NotificationContext.Provider
			value={{ notification: state, setNotification }}
		>
			{children}
		</NotificationContext.Provider>
	)
}

export default NotificationContext
