
// import { RATIO_FONT_SIZE_APP } from '../../redux/actions/config';

import { StyleSheet } from 'react-native';
import { colors } from '../../../theme';

export function createStyles() {
  const styles = StyleSheet.create({
    layout: {
      flex: 1,
      backgroundColor: colors.white
    },
  });
  return styles;
}
