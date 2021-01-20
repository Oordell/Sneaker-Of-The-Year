import React, {FC} from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';

import defaultStyles from '../config/style';

interface Props {
  style?: StyleProp<TextStyle>;
}

const AppText: FC<Props> = ({children, style, ...otherProps}) => {
  return <Text style={[defaultStyles.text, style]}>{children}</Text>;
};

export default AppText;
