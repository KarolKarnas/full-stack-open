import { getAllDiaries, createDiary } from './diaryService';
import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';

// interface VisibilityOption {
// 	value: Visibility;
// 	label: string;
// }

// const visibilityOptions: VisibilityOption[] = Object.values(Visibility).map(v => ({
//   value: v, label: v.toString()
// }));

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
	const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
		date: '',
		weather: 'sunny',
		visibility: 'ok',
		comment: '',
	});
	const [error, setError] = useState<string>('');

	useEffect(() => {
		getAllDiaries().then((data) => {
			if (data) {
				setDiaries(data);
			}
		});
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewDiary({ ...newDiary, [name]: value });
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createDiary(newDiary)
			.then((data) => {
				setDiaries([...diaries, data]);
			})
			.catch((error) => {
				setError(error.response.data);
			});
	};

	return (
		<div>
			<h1>Add new entry</h1>
			<h2 style={{ color: 'red' }}>{error}</h2>

			<form onSubmit={handleSubmit}>
				<label htmlFor='date'>
					Date:{' '}
					<input
						type='date'
						id='date'
						name='date'
						value={newDiary?.date}
						onChange={handleChange}
					/>
				</label>
				<br />
				{/* <label htmlFor='visibility'>
					Visibility:{' '}
					<input
						type='text'
						id='visibility'
						name='visibility'
						value={newDiary?.visibility}
						onChange={handleChange}
					/>
				</label> */}
				visibility:
				<label htmlFor='visibility'>
					<input
						type='radio'
						name='visibility'
						value={'great'}
						onChange={handleChange}
					/>
					great
					<input
						type='radio'
						name='visibility'
						value={'good'}
						onChange={handleChange}
					/>
					good
					<input
						type='radio'
						name='visibility'
						value={'ok'}
						onChange={handleChange}
					/>
					ok
					<input
						type='radio'
						name='visibility'
						value={'poor'}
						onChange={handleChange}
					/>
					poor
				</label>
				<br />
				{/* <label htmlFor='weather'>
					Weather:{' '}
					<input
						type='text'
						id='weather'
						name='weather'
						value={newDiary?.weather}
						onChange={handleChange}
					/>
				</label> */}
				weather:
				<label htmlFor='weather'>
					<input
						type='radio'
						name='weather'
						value={'sunny'}
						onChange={handleChange}
					/>
					sunny
					<input
						type='radio'
						name='weather'
						value={'rainy'}
						onChange={handleChange}
					/>
					rainy
					<input
						type='radio'
						name='weather'
						value={'cloudy'}
						onChange={handleChange}
					/>
					cloudy
					<input
						type='radio'
						name='weather'
						value={'windy'}
						onChange={handleChange}
					/>
					windy
					<input
						type='radio'
						name='weather'
						value={'stormy'}
						onChange={handleChange}
					/>
					stormy
				</label>
				<br />
				<label htmlFor='comment'>
					Comment:{' '}
					<input
						type='text'
						id='comment'
						name='comment'
						value={newDiary?.comment}
						onChange={handleChange}
					/>
				</label>
				<br />
				<button type='submit'>add</button>
			</form>

			<h1>Diaries:</h1>
			<ul>
				{diaries.map((diary) => {
					return (
						<li key={diary.id}>
							<h3>{diary.date}</h3>
							<p>
								<strong>weather</strong>: {diary.weather} <br />
								<strong>visibility</strong>: {diary.visibility} <br />
								<strong>comment</strong>: <em>{diary.comment}</em>
							</p>
						</li>
					);
				})}
			</ul>
		</div>
	);
};
export default App;
