
// import { RATIO_FONT_SIZE_APP } from '../../redux/actions/config';

import { StyleSheet } from 'react-native';
import { colors } from '../../../theme';

export function createStyles() {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: colors.mainLight,
      height: 52,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 8,
      marginHorizontal: 16,
      flexDirection: 'row',
    },
    title: {
      flex: 1,
      textAlign: 'center',
    },
    iconArr: {
      width: 16,
      height: 16,
      marginHorizontal: 16
    }
  });
  return styles;
}
