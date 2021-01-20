import React, {FC} from 'react';
import {View, StyleSheet, TextInput, Platform} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../config/colors';
import defaultStyles from '../config/style';

interface Props {
  iconName?: string;
  [propName: string]: any;
}

const AppTextInput: FC<Props> = ({iconName, ...otherProps}) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        {iconName && (
          <Icon
            name={iconName}
            color={colors.text_light}
            size={30}
            type="material-community"
          />
        )}
      </View>
      <TextInput
        placeholderTextColor={colors.text_light}
        style={defaultStyles.text}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.text_veryLight,
    borderRadius: 50,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    paddingVertical: Platform.OS === 'android' ? 9 : 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
