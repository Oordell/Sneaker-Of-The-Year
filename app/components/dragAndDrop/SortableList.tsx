import React, {ReactElement} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {COL, Positions, WIDTH, HEIGHT} from './config';
import Item from './Item';

interface Props {
  children: ReactElement<{_id: string | number}>[];
}

const SortableList = ({children}: Props) => {
  const positions: Positions = Object.assign(
    {},
    ...children.map((child, index) => ({[child.props._id]: index})),
  );

  return (
    <ScrollView
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * HEIGHT,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}>
      {children.map((child) => {
        return (
          <Item
            key={child.props._id}
            _id={child.props._id}
            positions={positions}>
            {child}
          </Item>
        );
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default SortableList;
