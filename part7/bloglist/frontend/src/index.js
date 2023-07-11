import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { NotificationContextProvider } from './components/NotificationContext'
// import { AuthProvider } from './components/AuthContext/AuthContext'
import { UserContextProvider } from './components/UserContext'
import { QueryClient, QueryClientProvider } from 'react-query'
// import { ReactQueryDevtools } from 'react-query/devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		{/* <AuthProvider> */}
		<UserContextProvider>
			<NotificationContextProvider>
				<App />
			</NotificationContextProvider>
		</UserContextProvider>
		{/* </AuthProvider> */}
		{/* <ReactQueryDevtools initialIsOpen={true} /> */}
	</QueryClientProvider>
)
