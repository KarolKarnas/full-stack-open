const User = ({ user }) => {
	return (
		<>
			<div>
				<span>{user.username}</span>
				<span>{user.blogs.length}</span>
			</div>
		</>
	)
}
export default User

