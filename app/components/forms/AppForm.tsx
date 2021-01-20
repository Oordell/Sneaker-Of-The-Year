import {Formik} from 'formik';
import React, {FC} from 'react';
import * as Yup from 'yup';

interface initValues {
  email: string;
  password: string;
  name?: string;
}

interface Props {
  initialValues: initValues;
  onSubmit: (input: initValues) => Promise<void>;
  validationSchema: Yup.AnySchema | (() => Yup.AnySchema);
}

const AppForm: FC<Props> = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}>
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
