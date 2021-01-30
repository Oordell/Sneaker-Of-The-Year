import React, {ReactElement} from 'react';
import {View, StyleSheet} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {useSharedValue} from './Animation';
import {COL, Positions, WIDTH, HEIGHT} from './config';
import Item from './Item';

interface Props {
  children: ReactElement<{id: string | number}>[];
}

const SortableList = ({children}: Props) => {
  const positions = useSharedValue<Positions>(
    Object.assign(
      {},
      ...children.map((child, index) => ({[child.props.id]: index})),
    ),
  );

  return (
    <ScrollView
      contentContainerStyle={{
        height: Math.ceil(children.length / COL) * WIDTH,
      }}
      showsVerticalScrollIndicator={false}
      bounces={false}
      scrollEventThrottle={16}>
      {children.map((child) => {
        return (
          <Item key={child.props.id} id={child.props.id} positions={positions}>
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
