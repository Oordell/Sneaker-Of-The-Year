import React, {FC} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import colors from '../../config/colors';
import RadioButton from './RadioButton';

interface ButtonElement {
  _id: number;
  title?: string;
  imagePath?: string;
}

interface Props {
  buttons: ButtonElement[];
  selectedButton: number;
  onPress: (btn: number) => void;
}

const RadioButtonGroup: FC<Props> = ({buttons, selectedButton, onPress}) => {
  return (
    <View style={styles.container}>
      <FlatList
        style={styles.list}
        data={buttons}
        keyExtractor={(btn) => btn._id.toString()}
        renderItem={({item}) => (
          <RadioButton
            title={item?.title}
            imagePath={item?.imagePath}
            style={{
              backgroundColor:
                item._id === selectedButton
                  ? colors.primary
                  : colors.background,
            }}
            onPress={() => onPress(item._id)}
          />
        )}
        horizontal={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  list: {
    flex: 1,
  },
});

export default RadioButtonGroup;
