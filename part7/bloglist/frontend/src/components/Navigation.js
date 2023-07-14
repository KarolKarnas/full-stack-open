import { Link } from 'react-router-dom'

const Navigation = () => {
	return (
		<nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
			<div className='container mx-auto'>
				<div className='flex-none px-2 mx-2'>
					<Link to='/'>
						<h1 className='text-3xl font-bold'>BlogList</h1>
					</Link>
				</div>
				<div className='flex-1 px-2 mx-2'>
					<div className='flex justify-end'>
						<Link className='btn btn-ghost btn-sm rounded-btn' to='/'>
							home
						</Link>
						<Link className='btn btn-ghost btn-sm rounded-btn' to='/blogs'>
							blogs
						</Link>
						<Link className='btn btn-ghost btn-sm rounded-btn' to='/users'>
							users
						</Link>
					</div>
				</div>
			</div>
		</nav>
	)
}
export default Navigation
