import { Button, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
// import useSignIn from '../hooks/useSignIn';
import useAddReview from '../hooks/useAddReview';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
	repository_owner_name: yup
		.string()
		.required('repository_owner_name is required'),
	repository_name: yup.string().required('repository_name is required'),
	rating: yup
		.number()
		.required('Rating is required')
		.min(0, 'Rating must be greater than or equal to 0')
		.max(100, 'Rating must be less than or equal to 100'),
	review: yup.string().required('review is required'),
});

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});

export const AddReviewContainer = ({ handleOnSubmit }) => {
	return (
		<Formik
			testID='form'
			initialValues={{
				repository_owner_name: '',
				repository_name: '',
				rating: null,
				review: '',
			}}
			onSubmit={handleOnSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => (
				<View style={styles.container}>
					<FormikTextInput
						name='repository_owner_name'
						placeholder='Repository owner name'
					/>
					<FormikTextInput
						name='repository_name'
						placeholder='Repository name'
					/>
					<FormikTextInput
						keyboardType='numeric'
						name='rating'
						placeholder='Rating between 0 and 100'
					/>
					<FormikTextInput name='review' placeholder='Review' multiline />

					<Button onPress={handleSubmit} title='Create a review' />
				</View>
			)}
		</Formik>
	);
};

const AddReview = () => {
	const [addReview] = useAddReview();
	const navigate = useNavigate();

	const handleOnSubmit = async (values) => {
		const { repository_owner_name, repository_name, rating, review } = values;

		const myReview = {
			ownerName: repository_owner_name,
			repositoryName: repository_name,
			text: review,
			rating: Number(rating),
		};

		console.log(myReview);
		try {
			const { data } = await addReview(myReview);
			// console.log(data);
			if (data.createReview.repositoryId) {
				// console.log(`/repository/${data.createReview.repositoryId}`);
				navigate(`/repository/${data.createReview.repositoryId}`);
			}
		} catch (e) {
			console.log(e);
		}
	};
	return <AddReviewContainer handleOnSubmit={handleOnSubmit} />;
};

export default AddReview;
