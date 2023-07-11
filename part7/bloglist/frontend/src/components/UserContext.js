import { createContext, useReducer } from 'react'

// const initialState = {
// 	token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ…5NjF9.WyUXfI3kIZ48xdYm5Fwct0-5PNOZROYx7_BXyIjXQLc",
// 	username: "admin admin",
// 	name: "admin"
// }


const userReducer = (state, action) => {
	switch (action.type) {
		case 'LOGIN':
			// console.log('payload ',action.payload)
			return {
				...state,
				token: action.payload.data.token,
				username: action.payload.data.username,
				name: action.payload.data.name
			}
		case 'LOGOUT':
			return null
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
			type: 'LOGOUT'
		})
	}

	return (
		<UserContext.Provider value={{ userState, loginUser, logoutUser }}>
			{children}
		</UserContext.Provider>
	)
}
export default UserContext
