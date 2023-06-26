import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'

import store from './store'


// Subscribe to store changes
// store.subscribe(() => {
//   const state = store.getState();
//   console.log('Updated state:', state);
// });

ReactDOM.createRoot(document.getElementById('root')).render(
	<Provider store={store}>
		<App />
	</Provider>
)
