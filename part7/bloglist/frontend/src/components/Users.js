import userService from '../services/users'
import User from './User'
import { useQuery } from '@tanstack/react-query'
const Users = () => {
  const { isSuccess, isLoading, data } = useQuery(
    ['users'],
    userService.getAll
  )

  if (isLoading) {
    return <div>Loading Users...</div>
  }
  if (isSuccess) {
    return (
      <>
      <h2>Users</h2>
        {data.map((user) => (
          <User
            key={user.id}
            user={user}
          />
        ))}
      </>
    )
  }
}


export default Users