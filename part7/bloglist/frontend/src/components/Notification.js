import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
	const { notification } = useContext(NotificationContext)

	if (notification === null) {
		return null
	} else if (notification.type === 'SUCCESS') {
		return (
			<div className='text-center'>
				<div role='alert'>
					<div className='bg-green-500 text-white font-bold rounded-t px-4 py-2'>
						Success
					</div>
					<div className='border border-t-0 border-green-400 rounded-b bg-green-100 px-4 py-3 text-green-700'>
						<p>{notification.msg}</p>
					</div>
				</div>
			</div>
		)

		// <div className='success fixed toast  end-80 top-30'>{notification.msg}</div>
	} else if (notification.type === 'ERROR') {
		return (
			<div className='text-center'>
				<div role='alert'>
					<div className='bg-red-500 text-white font-bold rounded-t px-4 py-2'>
						Error
					</div>
					<div className='border border-t-0 border-red-400 rounded-b bg-red-100 px-4 py-3 text-red-700'>
						<p>{notification.msg}</p>
					</div>
				</div>
			</div>
		)

		// <div className='error'>{notification.msg}</div>
	}
}

export default Notification
