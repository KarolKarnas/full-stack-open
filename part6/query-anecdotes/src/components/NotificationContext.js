import { useReducer, createContext, useEffect } from 'react'

const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'NOTIFICATION':
			return action.payload
		case 'RESET':
			return ''
		default:
			return state
	}
}

export const NotificationContext = createContext('')

export const NotificationContextProvider = (props) => {
	const [notification, dispatchNotification] = useReducer(notificationReducer, '')

	useEffect(() => {
		if (notification) {
			const timeout = setTimeout(() => {
				dispatchNotification({ type: 'RESET' })
			}, 3000)
			return () => clearInterval(timeout)
		}
	}, [notification])

	return (
		<NotificationContext.Provider value={[notification, dispatchNotification]}>
			{props.children}
		</NotificationContext.Provider>
	)
}
