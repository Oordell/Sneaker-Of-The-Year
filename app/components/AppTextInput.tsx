import React, {FC, useRef} from 'react';
import {View, StyleSheet, TextInput, Platform, Pressable} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../config/colors';
import defaultStyles from '../config/style';

interface Props {
  iconName?: string;
  [propName: string]: any;
}

const AppTextInput: FC<Props> = ({iconName, ...otherProps}) => {
  const inputTextRef = useRef(null);

  return (
    <Pressable
      style={[styles.container, defaultStyles.shadows]}
      onPress={() => inputTextRef.current.focus()}>
      <View style={styles.icon}>
        {iconName && (
          <Icon
            name={iconName}
            color={colors.text_light}
            size={28}
            type="material-community"
          />
        )}
      </View>
      <TextInput
        ref={inputTextRef}
        placeholderTextColor={colors.text_light}
        style={defaultStyles.text}
        {...otherProps}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.text_veryLight,
    borderRadius: 50,
    flexDirection: 'row',
    width: '100%',
    padding: 15,
    paddingVertical: Platform.OS === 'android' ? 4 : 15,
    marginVertical: 10,
    alignItems: 'center',
  },
  icon: {
    marginRight: 10,
  },
});

export default AppTextInput;
