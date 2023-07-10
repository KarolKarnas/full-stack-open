const notificationReducer = (state, action) => {
	switch (action.type) {
		case 'SET_MESSAGE':
			return action.payload
		case 'REMOVE_MESSAGE':
			return null

		default:
			return state
	}
}

export default notificationReducer