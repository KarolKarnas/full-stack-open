import { getAllDiaries, createDiary } from './diaryService';
import { useEffect, useState } from 'react';
import { DiaryEntry, NewDiaryEntry } from './types';

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);
	const [newDiary, setNewDiary] = useState<NewDiaryEntry>({
		date: '',
		weather: 'sunny',
		visibility: 'ok',
		comment: '',
	});

	useEffect(() => {
		getAllDiaries().then((data) => {
			setDiaries(data);
		});
	}, []);

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setNewDiary({ ...newDiary, [name]: value });
		// console.log(newDiary);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		createDiary(newDiary).then(data=> {
			setDiaries([...diaries, data])
		})
	};

	return (
		<div>
			<h1>Add new entry</h1>

			<form onSubmit={handleSubmit}>
				<label htmlFor='date'>
					Date:{' '}
					<input
						type='text'
						id='date'
						name='date'
						value={newDiary?.date}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label htmlFor='visibility'>
					Visibility:{' '}
					<input
						type='text'
						id='visibility'
						name='visibility'
						value={newDiary?.visibility}
						onChange={handleChange}
					/>
				</label>
				<br />
				<label htmlFor='weather'>
					Weather:{' '}
					<input
						type='text'
						id='weather'
						name='weather'
						value={newDiary?.weather}
						onChange={handleChange}
					/>
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
