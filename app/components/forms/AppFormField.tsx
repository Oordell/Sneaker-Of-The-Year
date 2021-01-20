import {useFormikContext} from 'formik';
import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import AppTextInput from '../AppTextInput';
import ErrorMessage from './ErrorMessage';

interface Props {
  name: string;
  [propName: string]: any;
}

const AppFormField: FC<Props> = ({name, ...otherProps}) => {
  const {
    setFieldTouched,
    setFieldValue,
    errors,
    touched,
    values,
  } = useFormikContext();

  return (
    <>
      <AppTextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text: string) => setFieldValue(name, text)}
        value={values[name]}
        {...otherProps}
      />
      {<ErrorMessage error={errors[name]} visible={touched[name]} />}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default AppFormField;
