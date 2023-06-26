import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
	name: 'notification',
	initialState: '',
	reducers: {
		setNotification(state, action) {
			const notification = action.payload
			return notification
		},
		removeNotification(state, action) {
			const notification = ''
			return notification
		},
	},
})

export const { setNotification, removeNotification } = notificationSlice.actions

export const createNotification = (text, displayTime) => {
	return (dispatch) => {
		dispatch(setNotification(text))

		setTimeout(() => {
			dispatch(removeNotification())
		}, displayTime * 1000)
	}
}

export default notificationSlice.reducer
