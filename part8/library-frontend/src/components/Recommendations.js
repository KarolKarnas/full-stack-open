import { useQuery } from '@apollo/client';
import { ALL_BOOKS, ME } from '../queries';
import { useEffect,  useState } from 'react';

const Recommendations = (props) => {
	const [genreToSearch, setGenreToSearch] = useState('');

	const { loading, data, refetch } = useQuery(ALL_BOOKS, {
		variables: { genre: genreToSearch },
		skip: !genreToSearch,
	});
	const { loading: loadingMe, data: dataMe } = useQuery(ME);

	useEffect(() => {
		if (!loadingMe && dataMe) {
			// console.log(dataMe.me.favoriteGenre);
			setGenreToSearch(dataMe.me.favoriteGenre);
			refetch();
		}
	}, [loadingMe, dataMe, refetch]);

	if (!props.show) {
		return null;
	}

	if (loading && loadingMe) {
		return <div>loading...</div>;
	}
	const books = data.allBooks;
	// console.log(dataMe.me);
	return (
		<div>
			<h2>Hello {dataMe.me.username}</h2>

			{genreToSearch === '' ? (
			null
			) : (
				<>
				<p>Your favorite genre is {genreToSearch}</p>
				<p>I recommend to you this books:</p>
				
				</>
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
		</div>
	);
};

export default Recommendations;
