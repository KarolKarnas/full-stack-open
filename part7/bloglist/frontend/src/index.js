import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { NotificationContextProvider } from './components/NotificationContext'
import { UserContextProvider } from './components/UserContext'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
	<QueryClientProvider client={queryClient}>
		<UserContextProvider>
			<NotificationContextProvider>
				<App />
			</NotificationContextProvider>
		</UserContextProvider>
		<ReactQueryDevtools initialIsOpen={false} />
	</QueryClientProvider>
)
