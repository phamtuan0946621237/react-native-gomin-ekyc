
// import { RATIO_FONT_SIZE_APP } from '../../redux/actions/config';

import { StyleSheet } from 'react-native';
import { HeaderSize, TabBarSize } from '../../util';

export function createStyles() {
  const styles = StyleSheet.create({
    alignRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    button: { zIndex: 999, marginBottom: 26 + TabBarSize.paddingBottom },
    icon24: { width: 24, height: 24 },
    header: { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 999, height: HeaderSize.height, flexDirection: 'row', alignItems: 'center' },
    iconBack: { flex: 1, paddingTop: 16 + HeaderSize.paddingTop, paddingHorizontal: 16 },
    topView: {
      position: 'absolute', left: 0, right: 0, top: 0,
      justifyContent: "center",
      paddingBottom: 16,
    },
  });
  return styles;
}
