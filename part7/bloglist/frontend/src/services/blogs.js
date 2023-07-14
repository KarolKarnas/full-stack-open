import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = (newToken) => {
	token = `Bearer ${newToken}`
}

const getAll = () => {
	const request = axios.get(baseUrl)
	return request.then((response) => response.data)
}


// Alternative Solution
// const getComments =  (id) => {
// 	const url = `${baseUrl}/${id}/comments`

// 	const request = axios.get(url)
// 	return request.then((response) => response.data)
// }

const create = async (newObject) => {
	const config = {
		headers: { Authorization: token },
	}

	const response = await axios.post(baseUrl, newObject, config)
	return response
}


const comment = async (comment) => {

	const url = '/api/comments'
	const config = {
		headers: { Authorization: token },
	}
	const response = await axios.post(url, comment, config)
	return response
}

const update = async ([blogToUpdate, id]) => {
	const url = `${baseUrl}/${id}`

	const response = await axios.put(url, blogToUpdate)
	return response
}

const remove = async ([id]) => {
	const config = {
		headers: { Authorization: token },
	}
	const url = `${baseUrl}/${id}`

	const response = await axios.delete(url, config)
	return response
}


export default { getAll, create, setToken, update, remove, comment }
