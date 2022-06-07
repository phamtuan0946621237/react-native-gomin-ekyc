
// import { RATIO_FONT_SIZE_APP } from '../../redux/actions/config';

import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export function createStyles() {
  const styles = StyleSheet.create({
    alignRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    icon24: { width: 24, height: 24 },
    note: {
      margin: 16,
      padding: 16,
      borderWidth: 1,
      borderColor: colors.main,
      backgroundColor: colors.main200,
      borderRadius: 8

    },
    header: {
      backgroundColor: colors.white,
      shadowColor: "rgba(0, 0, 0, 0.08)",
      shadowOffset: {
        width: 0,
        height: 4
      },

      shadowRadius: 8,
      shadowOpacity: 1,
      elevation: 8
    },
    alignRowTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
  });
  return styles;
}
