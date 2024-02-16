import CustomText from './CustomText';
import { Button, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import FormikTextInput from './FormikTextInput';

const styles = StyleSheet.create({
	container: {
		padding: 20,
	},
});

const SignIn = () => {
	return (
		<Formik
			initialValues={{ email: '' }}
			onSubmit={(values) => console.log(values)}
		>
			{({ handleChange, handleBlur, handleSubmit, values }) => (
				<View style={styles.container}>
					<FormikTextInput name='username' placeholder='Username' />
					<FormikTextInput secureTextEntry name='password' placeholder='Password' />

					<Button onPress={handleSubmit} title='Submit' />
				</View>
			)}
		</Formik>
	);
};

export default SignIn;
