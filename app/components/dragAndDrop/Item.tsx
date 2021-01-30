import React, {ReactNode} from 'react';
import {Dimensions, StyleSheet, View} from 'react-native';
import {
  PanGestureHandler,
  PanGestureHandlerGestureEvent,
} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedReaction,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {useSharedValue} from './Animation';
import {
  animationConfig,
  COL,
  getOrder,
  getPosition,
  HEIGHT,
  Positions,
  WIDTH,
} from './config';

interface Props {
  children: ReactNode;
  id: string | number;
  positions: Animated.SharedValue<Positions>;
}

const Item = ({children, positions, id}: Props) => {
  const inset = useSafeAreaInsets();

  const contentHeight = (Object.keys(positions.value).length / COL) * WIDTH;
  const containerHeight =
    Dimensions.get('window').height - inset.top - inset.bottom;

  const position = getPosition(positions.value[id]);
  const translateX = useSharedValue(position.x);
  const translateY = useSharedValue(position.y);

  const isGesureActive = useSharedValue(false);

  useAnimatedReaction(
    () => positions.value[id],
    (newOrder) => {
      const newPosition = getPosition(newOrder);
      translateX.value = withTiming(newPosition.x, animationConfig);
      translateY.value = withTiming(newPosition.y, animationConfig);
    },
  );

  const handleGestureEvent = useAnimatedGestureHandler<
    PanGestureHandlerGestureEvent,
    {x: number; y: number}
  >({
    onStart: (_, ctx) => {
      isGesureActive.value = true;
      ctx.x = translateX.value;
      ctx.y = translateY.value;
    },

    onActive: ({translationX, translationY}, ctx) => {
      translateX.value = ctx.x + translationX;
      translateY.value = ctx.y + translationY;

      const oldOrder = positions.value[id];
      const newOrder = getOrder(translateX.value, translateY.value);

      if (oldOrder !== newOrder) {
        const idToSwap = Object.keys(positions.value).find(
          (key) => positions.value[key] === newOrder,
        );
        if (idToSwap) {
          const newPositions = JSON.parse(JSON.stringify(positions.value));
          newPositions[id] = newOrder;
          newPositions[idToSwap] = oldOrder;
          positions.value = newPositions;
        }
      }
    },

    onEnd: () => {
      const destination = getPosition(positions.value[id]);
      translateX.value = withTiming(destination.x, animationConfig, () => {
        isGesureActive.value = false;
      });
      translateY.value = withTiming(destination.y, animationConfig);
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    const zIndex = isGesureActive.value ? 10 : 0;
    const scale = isGesureActive.value ? 1.1 : 1.0;
    return {
      zIndex,
      transform: [
        {translateX: translateX.value},
        {translateY: translateY.value},
        {scale},
      ],
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <PanGestureHandler
        activeOffsetX={[0, 0]}
        onGestureEvent={handleGestureEvent}>
        <Animated.View style={StyleSheet.absoluteFill}>
          {children}
        </Animated.View>
      </PanGestureHandler>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: WIDTH,
    height: HEIGHT,
  },
});

export default Item;
