
// import { RATIO_FONT_SIZE_APP } from '../../redux/actions/config';

import { StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { calcFontSize, TabBarSize } from '../../util';

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
    button: { marginTop: 32, marginBottom: 16 + TabBarSize.paddingBottom },
    iconArr: { height: 44, width: 44, borderRadius: 22, backgroundColor: colors.red, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.white, position: 'absolute', bottom: -22 },
    icSuccess: { height: 44, width: 44, borderRadius: 22, backgroundColor: colors.main, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.white, position: 'absolute', bottom: -22 },
    ic: { width: calcFontSize(214), height: calcFontSize(118), borderRadius: 6 },
    note: { flex: 1, textAlign: 'center', marginTop: 9 },
    thumb: { width: 16, height: 16, borderRadius: 8, },
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
    horizontalDots: {
      color: colors.red
    }
  });
  return styles;
}
