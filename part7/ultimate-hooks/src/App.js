import axios from 'axios'
import { useEffect, useState } from 'react'

const useField = (type) => {
	const [value, setValue] = useState('')

	const onChange = (event) => {
		console.log(event.target.value)
		setValue(event.target.value)
	}

	return {
		type,
		value,
		onChange,
	}
}

const useResource = (url) => {
	const [data, setData] = useState([])
  const [render, setRender] = useState(false)

	useEffect(() => {
		const getAll = async () => {
			const response = await axios.get(url)
			setData(response.data)
		}
		getAll()
	}, [url, render])

	console.log(data)

	const service = {
		create: async (newObject) => {
			const response = await axios.post(url, newObject)
      setRender(!render)
			return response.data
		},
	}
	return [data, service]
}

const App = () => {
	const content = useField('text')
	const name = useField('text')
	const number = useField('text')

	const [notes, noteService] = useResource('http://localhost:3005/notes')
	const [persons, personService] = useResource('http://localhost:3005/persons')

	const handleNoteSubmit = (event) => {
		event.preventDefault()
		noteService.create({ content: content.value })
	}

	const handlePersonSubmit = (event) => {
		event.preventDefault()
		personService.create({ name: name.value, number: number.value })
	}

	return (
		<div>
			<h2>notes</h2>
			<form onSubmit={handleNoteSubmit}>
				<input {...content} />
				<button>create</button>
			</form>
			{notes.map((n) => (
				<p key={n.id}>{n.content}</p>
			))}

			<h2>persons</h2>
			<form onSubmit={handlePersonSubmit}>
				name <input {...name} /> <br />
				number <input {...number} />
				<button>create</button>
			</form>
			{persons.map((n) => (
				<p key={n.id}>
					{n.name} {n.number}
				</p>
			))}
		</div>
	)
}

export default App
