
// import { RATIO_FONT_SIZE_APP } from '../../redux/actions/config';

import { StyleSheet } from 'react-native';
import { colors } from '../../theme';

export function createStyles() {
  const styles = StyleSheet.create({
    alignRowTop: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
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
    info: {
      marginTop: 20,
      marginHorizontal: 16,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.mainBorder,
      padding: 16
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
    sp: {
      height: 52,
      marginRight: 8,
      flex: 1,
      borderColor: colors.main,
      borderWidth: 1, borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 16,
    }
  });
  return styles;
}
