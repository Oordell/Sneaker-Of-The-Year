import React, {FC} from 'react';
import {StyleSheet} from 'react-native';
import buttons from '../components/buttons/RadioButtonPresets';
import SneakerTile from '../components/dragAndDrop/SneakerTile';
import {MARGIN} from '../components/dragAndDrop/config';
import SortableList from '../components/dragAndDrop/SortableList';
import {SafeAreaView} from 'react-native-safe-area-context';

interface Props {}

const DragAndDropScreen: FC<Props> = () => {
  const logos = buttons.btnsBrands;

  return (
    <SafeAreaView style={styles.container}>
      <SortableList>
        {logos.map((logo) => (
          <SneakerTile
            onLongPress={() => true}
            key={logo._id}
            id={logo._id}
            imagePath={logo.imagePath}
          />
        ))}
      </SortableList>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: MARGIN,
  },
});

export default DragAndDropScreen;
