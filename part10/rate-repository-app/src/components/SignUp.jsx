import { Button, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';
import useSignIn from '../hooks/useSignIn';
import { useNavigate } from 'react-router-native';
import useAddUser from '../hooks/useAddUser';

const validationSchema = yup.object().shape({
	username: yup
		.string()
		.min(1)
		.max(30)
		.required('Username is required'),
	password: yup.string().min(5).max(30).required('Password is required'),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref('password'), null], 'Passwords do not match')
		.required('Password confirm is required'),
});

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});

export const SignUpContainer = ({ handleOnSubmit }) => {
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
					<FormikTextInput
						secureTextEntry
						name='passwordConfirm'
						placeholder='Password confirmation'
					/>

					<Button onPress={handleSubmit} title='Submit' />
				</View>
			)}
		</Formik>
	);
};

const SignUp = () => {
	const [signUp] = useAddUser();
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const handleOnSubmit = async (values) => {
		const { username, password } = values;
		const user = { username, password };
		try {
			const { data } = await signUp(user);
			console.log(data);
			if (data.createUser) {
				try {
					const { data } = await signIn({ username, password });
					if (data.authenticate.accessToken) {
						navigate('/');
					}
				} catch (e) {
					console.log(e);
				}
			}
		} catch (e) {
			console.log(e);
		}
	};
	return <SignUpContainer handleOnSubmit={handleOnSubmit} />;
};

export default SignUp;
