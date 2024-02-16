import { StyleSheet } from 'react-native';
import { useField } from 'formik';
import theme from '../theme';

import TextInput from './TextInput';
import CustomText from './CustomText';

const styles = StyleSheet.create({
  errorText: {
    marginTop: 5,
    color: theme.colors.error
  },
  input: {
    borderWidth: 1,
    borderColor: theme.colors.primary,
    padding: 10,
    borderRadius: 4,
    marginBottom: 10
  },
  errorInput: {
    borderColor: theme.colors.error
  },
});

const FormikTextInput = ({ name, ...props }) => {
  const [field, meta, helpers] = useField(name);
  const showError = meta.touched && meta.error;

  return (
    <>
      <TextInput
       style={[
        styles.input,
        showError ? styles.errorInput : null
      ]}
        onChangeText={value => helpers.setValue(value)}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
      {showError && <CustomText style={styles.errorText}>{meta.error}</CustomText>}
    </>
  );
};

export default FormikTextInput;