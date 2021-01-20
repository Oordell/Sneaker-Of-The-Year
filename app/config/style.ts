import {Platform} from 'react-native';

import colors from './colors';

export default Object.freeze({
  text: {
    color: colors.text,
    fontSize: 18,
    fontFamily: Platform.OS === 'android' ? 'Roboto' : 'Avenir',
  },
  shadows: {
    elevation: 15,
    shadowColor: colors.shadow,
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
});
