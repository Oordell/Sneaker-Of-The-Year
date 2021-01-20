import {useFormikContext} from 'formik';
import React, {FC} from 'react';
import AppButton from '../buttons/AppButton';

interface Props {
  title: string;
  iconName?: string;
}

const SubmitButton: FC<Props> = ({title, iconName}) => {
  const {handleSubmit} = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} iconName={iconName} />;
};

export default SubmitButton;
