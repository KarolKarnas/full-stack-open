import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ALL_GENRES } from '../queries';
import { useState } from 'react';

const Books = (props) => {
	const [genreToSearch, setGenreToSearch] = useState('');

	const { loading, data, refetch } = useQuery(ALL_BOOKS, {
		variables: { genre: genreToSearch },
	});
	const {
		loading: loadingGen,
		data: dataGen,
	} = useQuery(ALL_GENRES);

	if (!props.show) {
		return null;
	}

	if (loading && loadingGen) {
		return <div>loading...</div>;
	}
	const books = data.allBooks;
	const allGenres = dataGen.allBooks.reduce(
					(acc, curr) => acc.concat(curr.genres),
					[]
				);
				const uniqueGenres = [...new Set(allGenres)];
	return (
		<div>
			<h2>books</h2>

			{genreToSearch === '' ? (
				<p>pattern for all genres</p>
			) : (
				<p>pattern for {genreToSearch}</p>
			)}

			<table>
				<tbody>
					<tr>
						<th></th>
						<th>author</th>
						<th>published</th>
					</tr>
					{books.map((a) => (
						<tr key={a.title}>
							<td>{a.title}</td>
							<td>{a.author.name}</td>
							<td>{a.published}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div>
				{uniqueGenres.map((genre, index) => (
					<button
						key={index}
						onClick={() => {
							setGenreToSearch(genre);
							refetch();
						}}
					>
						{genre}
					</button>
				))}
			</div>
		</div>
	);
};

export default Books;



	// const allGenresRef = useRef([]);

	// useEffect(() => {
	// 	if (!allGenresRef.current.length && data && !loading) {
	// 		const allGenres = data.allBooks.reduce(
	// 			(acc, curr) => acc.concat(curr.genres),
	// 			[]
	// 		);
	// 		allGenresRef.current = [...new Set(allGenres)];
	// 	}
	// }, [loading, data]);