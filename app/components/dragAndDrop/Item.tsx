import React, {ReactNode} from 'react';
import {Dimensions, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COL, Positions, WIDTH} from './config';

interface Props {
  children: ReactNode;
  _id: string | number;
  positions: Positions;
}

const Item = ({children, positions}: Props) => {
  const inset = useSafeAreaInsets();
  const contentHeight = (Object.keys(positions.value).length / COL) * WIDTH;
  const containerHeight =
    Dimensions.get('window').height - inset.top - inset.bottom;

  return <View>{children}</View>;
};

export default Item;
