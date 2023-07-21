import { getAllDiaries } from './diaryService';
import { useEffect, useState } from 'react';
import { DiaryEntry } from './types';

const App = () => {
	const [diaries, setDiaries] = useState<DiaryEntry[]>([]);

	useEffect(() => {
		getAllDiaries().then((data) => {
			setDiaries(data);
		});
	}, []);

	return (
		<div>
			<h1>Diaries:</h1>
			<ul>
				{diaries.map((diary) => {
					console.log(diary)
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
