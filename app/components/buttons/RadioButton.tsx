import React, {FC} from 'react';
import {StyleSheet, Pressable, Image} from 'react-native';
import colors from '../../config/colors';
import AppText from '../AppText';
import defaultStylse from '../../config/style';

interface Props {
  title?: string;
  imagePath?: string;
  [propName: string]: any;
}

const RadioButton: FC<Props> = ({style, title, imagePath, ...otherProps}) => {
  return (
    <Pressable
      style={[
        styles.container,
        defaultStylse.shadows,
        style,
        {paddingVertical: imagePath && title ? 5 : 15},
      ]}
      {...otherProps}>
      {imagePath && <Image source={imagePath} style={styles.image} />}
      {title && <AppText style={styles.text}>{title}</AppText>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: colors.background,
    padding: 15,
    marginHorizontal: 10,
    marginVertical: 10,
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'uppercase',
    fontSize: 20,
  },
  image: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
});

export default RadioButton;
