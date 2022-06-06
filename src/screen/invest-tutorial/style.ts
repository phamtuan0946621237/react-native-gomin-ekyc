// import { RATIO_FONT_SIZE_APP } from '../../redux/actions/config';

import { StyleSheet } from 'react-native';
import { colors } from '../../theme';
import { TabBarSize } from '../../util';

export function createStyles() {
  const styles = StyleSheet.create({
    alignRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    note: { flexDirection: 'row', marginLeft: 36, marginTop: 8 },
    thumbBlack: {
      width: 5,
      height: 5,
      borderRadius: 5,
      backgroundColor: colors.black,
      marginTop: 3,
      marginRight: 12,
    },
    noteContainer: {
      marginHorizontal: 16,
      backgroundColor: colors.main100,
      padding: 16,
      borderRadius: 12,
      marginBottom: TabBarSize.paddingBottom + 100,
      marginTop: 16
    },
    icon24: { width: 24, height: 24 },
    icon64: { height: 64, width: 64 },
    describle: { marginTop: 8 },
    thumbMain: {
      width: 5,
      height: 5,
      borderRadius: 8,
      backgroundColor: colors.main,
      marginRight: 8,
    },
    thumbStep: { width: 16, height: 16, borderRadius: 8 },
    step: { height: '100%', paddingTop: 6, marginTop: 20, marginRight: 16 },
    stepContainer: {
      marginTop: 18,
      backgroundColor: 'white',
      flexDirection: 'row',
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
  });
  return styles;
}
