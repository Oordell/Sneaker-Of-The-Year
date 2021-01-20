import {DefaultTheme} from '@react-navigation/native';
import colors from '../config/colors';

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.primary,
    background: colors.background,
    border: colors.border,
    card: colors.card,
    notification: colors.notification,
    text: colors.text,
  },
};
