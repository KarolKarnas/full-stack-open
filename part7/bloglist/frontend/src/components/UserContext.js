import { createContext, useReducer } from 'react'
// import blogService from '../services/blogs'

// const getInitialState = () => {
// 	const loggedUserJSON = localStorage.getItem('loggedBlogAppUser')
// 	if (loggedUserJSON) {
// 		const userState = JSON.parse(loggedUserJSON)
// 		blogService.setToken(userState.token)
// console.log(userState)
// 		return (userState)

// 	}
// }

// const initialState = getInitialState()

const userReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			return {
				...state,
				isAuth: true,
				token: action.payload.data.token,
				username: action.payload.data.username,
				name: action.payload.data.name,
			}
		case 'LOGOUT':
			return {
				...state,
				isAuth: false,
				token: '',
				username: '',
				name: '',
			}
		default:
			return state
	}
}

const UserContext = createContext(null)

export const UserContextProvider = ({ children }) => {
	const [userState, userDispatch] = useReducer(userReducer, null)

	const loginUser = (data, type) => {
		userDispatch({
			type: 'LOGIN',
			payload: { data, type },
		})
	}

	const logoutUser = () => {
		userDispatch({
			type: 'LOGOUT',
		})
	}

	return (
		<UserContext.Provider value={{ userState, loginUser, logoutUser }}>
			{children}
		</UserContext.Provider>
	)
}
export default UserContext
