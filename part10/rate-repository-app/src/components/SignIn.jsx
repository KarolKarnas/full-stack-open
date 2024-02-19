import CustomText from './CustomText';
import { Button, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';
import * as yup from 'yup';

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
	return (
		<Formik
			initialValues={{ password: '', username: '' }}
			onSubmit={(values) => console.log(values)}
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
