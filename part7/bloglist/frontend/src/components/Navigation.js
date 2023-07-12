import { Link } from "react-router-dom"


const Navigation = () => {
  return (
    <nav style={{ marginBottom: '2rem' }}>
    <Link style={{ padding: '10px' }} to='/'>
      home
    </Link>
    <Link style={{ padding: '10px' }} to='/blogs'>
      blogs
    </Link>
    <Link style={{ padding: '10px' }} to='/users'>
      users
    </Link>
  </nav>
  )
}
export default Navigation