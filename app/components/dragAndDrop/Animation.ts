import {useRef} from 'react';
import {useSharedValue as REuseSharedValue} from 'react-native-reanimated';

export const useSharedValue = <T>(value: T) => {
  const ref = useRef<T | null>(null);
  if (ref.current === null) ref.current = value;

  return REuseSharedValue<T>(ref.current);
};
