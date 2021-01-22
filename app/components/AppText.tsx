import React, {FC} from 'react';
import {Text, StyleProp, TextStyle} from 'react-native';

import defaultStyles from '../config/style';

interface Props {
  style?: StyleProp<TextStyle>;
  [propName: string]: any;
}

const AppText: FC<Props> = ({children, style, numberOfLines}) => {
  return (
    <Text numberOfLines={numberOfLines} style={[defaultStyles.text, style]}>
      {children}
    </Text>
  );
};

export default AppText;
