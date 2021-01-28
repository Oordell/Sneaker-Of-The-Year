import React, {FC} from 'react';
import {
  StyleSheet,
  Pressable,
  GestureResponderEvent,
  ViewStyle,
} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../../config/colors';
import defaultStyles from '../../config/style';

interface Props {
  onPress?: (event: GestureResponderEvent) => void;
  iconName?: string;
  color?: string;
  style?: ViewStyle;
}

const AppButtonSmall: FC<Props> = ({
  onPress,
  iconName,
  color = 'primary',
  style,
}) => {
  return (
    <Pressable
      style={({pressed}) => [
        {opacity: pressed ? 0.75 : 1.0, backgroundColor: colors[color]},
        styles.container,
        defaultStyles.shadows,
        style,
      ]}
      onPress={onPress}>
      {iconName && (
        <Icon
          name={iconName}
          color={colors.white}
          size={35}
          type="material-community"
        />
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 40,
  },
});

export default AppButtonSmall;
