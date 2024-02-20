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

export const SignInContainer = ({ handleOnSubmit }) => {
	return (
		<Formik
			testID='form'
			initialValues={{ password: '', username: '' }}
			onSubmit={handleOnSubmit}
			validationSchema={validationSchema}
		>
			{({ handleSubmit }) => (
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

const SignIn = () => {
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const handleOnSubmit = async (values) => {
		const { username, password } = values;
		try {
			const { data } = await signIn({ username, password });
			if (data.authenticate.accessToken) {
				navigate('/');
			}
		} catch (e) {
			console.log(e);
		}
	};
	return <SignInContainer handleOnSubmit={handleOnSubmit} />;
};

export default SignIn;
