import {FormikErrors, FormikTouched} from 'formik';
import React, {FC} from 'react';
import {View, StyleSheet} from 'react-native';
import colors from '../../config/colors';
import AppText from '../AppText';

interface Props {
  error?: FormikErrors<unknown> | string;
  visible: FormikTouched<unknown> | boolean;
}

const ErrorMessage: FC<Props> = ({error, visible}) => {
  if (!visible || !error) return null;

  return <AppText style={styles.error}>{error}</AppText>;
};

const styles = StyleSheet.create({
  error: {color: colors.notification},
});

export default ErrorMessage;
