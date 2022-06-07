
// import { RATIO_FONT_SIZE_APP } from '../../redux/actions/config';

import { StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { HeaderSize } from '../../util';

export function createStyles() {
  const styles = StyleSheet.create({
    alignRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    button: { position: 'absolute', bottom: 0, left: 0, right: 0, zIndex: 999 },
    icon24: { width: 24, height: 24 },
    header: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 999, height: HeaderSize.height, flexDirection: 'row', alignItems: 'center' },
    iconBack: { flex: 1, paddingTop: 16 + HeaderSize.paddingTop, paddingHorizontal: 16 },
    topView: {
      position: 'absolute', left: 0, right: 0,
      justifyContent: "center",
      paddingBottom: 16,
    },
    lottie: {
      width: 100, height: 70, alignSelf: 'center', marginLeft: 8, transform: [{
        rotate: '90deg'
      }]
    },
    icon: { width: 120, height: 120, backgroundColor: colors.white, borderRadius: 60, alignSelf: 'center', alignItems: 'center', justifyContent: 'center' }
  });
  return styles;
}
