import React, {FC} from 'react';
import {Text} from 'react-native';

import defaultStyles from '../config/style';

interface Props {
  style?: any;
  [propName: string]: any;
}

const AppText: FC<Props> = ({children, style, ...otherProps}) => {
  return (
    <Text {...otherProps} style={[defaultStyles.text, style]}>
      {children}
    </Text>
  );
};

export default AppText;
