import {Dimensions} from 'react-native';
import {Easing} from 'react-native-reanimated';

export interface Positions {
  [id: string]: number;
}

const {width} = Dimensions.get('window');
export const MARGIN = 10;
export const COL = 2;
export const WIDTH = width / COL - MARGIN;
export const HEIGHT = WIDTH * 0.8;

export const animationConfig = {
  easing: Easing.inOut(Easing.ease),
  duration: 350,
};

export const getPosition = (order: number) => {
  'worklet';
  return {
    x: (order % COL) * WIDTH,
    y: Math.floor(order / COL) * HEIGHT,
  };
};

export const getOrder = (x: number, y: number) => {
  'worklet';
  const col = Math.round(x / WIDTH);
  const row = Math.round(y / HEIGHT);
  return row * COL + col;
};
