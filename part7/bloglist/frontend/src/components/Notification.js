import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
	const { notification } = useContext(NotificationContext)

	if (notification === null) {
		return null
	} else if (notification.type === 'SUCCESS') {
		return <div className='success'>{notification.msg}</div>
	} else if (notification.type === 'ERROR') {
		return <div className='error'>{notification.msg}</div>
	}
}

export default Notification
