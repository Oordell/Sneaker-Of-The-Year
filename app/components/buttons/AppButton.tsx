import React, {FC} from 'react';
import {StyleSheet, Pressable, View, GestureResponderEvent} from 'react-native';
import {Icon} from 'react-native-elements';
import colors from '../../config/colors';

import defaultStyles from '../../config/style';
import AppText from '../AppText';

interface Props {
  color?: string;
  iconName?: string;
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  width?: string | number;
}

const AppButton: FC<Props> = ({
  color = 'primary',
  width = '100%',
  title,
  iconName,
  onPress,
}) => {
  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        {
          opacity: pressed ? 0.8 : 1,
          backgroundColor: colors[color],
        },
        styles.container,
        defaultStyles.shadows,
        {width},
      ]}>
      {iconName && (
        <View style={styles.icon}>
          <Icon
            name={iconName}
            color={colors.white}
            size={35}
            type="material-community"
          />
        </View>
      )}
      <AppText style={styles.title}>{title}</AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 100,
    marginVertical: 10,
    width: '100%',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 15,
  },
  icon: {
    left: 15,
    position: 'absolute',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
});

export default AppButton;
