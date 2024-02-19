import { Button, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';

const validationSchema = yup.object().shape({
	username: yup.string().required('Username is required'),
	password: yup.string().required('Password is required'),
});

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});

const SignIn = () => {
	const [signIn] = useSignIn();
	const navigate = useNavigate();
	// const mySubmit = (values) => console.log(values);

	const onSubmit2 = async (values) => {
		const { username, password } = values;

		try {
			const { data } = await signIn({ username, password });

			if (data.authenticate.accessToken) {
				navigate('/');
			}
			// console.log(data.authenticate.accessToken);
		} catch (e) {
			console.log(e);
		}
	};
	return (
		<Formik
			initialValues={{ password: '', username: '' }}
			onSubmit={onSubmit2}
			validationSchema={validationSchema}
		>
			{({ handleChange, handleBlur, handleSubmit, values }) => (
				<View style={styles.container}>
					<FormikTextInput name='username' placeholder='Username' />
					<FormikTextInput
						secureTextEntry
						name='password'
						placeholder='Password'
					/>

					<Button onPress={handleSubmit} title='Submit' />
				</View>
			)}
		</Formik>
	);
};

export default SignIn;
