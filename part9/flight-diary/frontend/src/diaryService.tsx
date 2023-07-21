import axios from 'axios';
import { DiaryEntry } from './types';

const baseUrl = 'http://localhost:3001/api/diaries';

export const getAllDiaries = () => {
	return axios.get<DiaryEntry[]>(baseUrl).then((response) => response.data);
};

// export const createNote = (object: NewNote) => {
// 	return axios.post<Note>(baseUrl, object).then((response) => response.data);
// };
