
// import { RATIO_FONT_SIZE_APP } from '../../redux/actions/config';

import { StyleSheet, useWindowDimensions } from 'react-native';
import { colors } from '../../theme';
import { TabBarSize } from '../../util';

export function createStyles() {
  const { width } = useWindowDimensions()
  const styles = StyleSheet.create({
    alignRow: {
      flexDirection: 'row',
      alignItems: 'center'
    },
    icon24: { width: 24, height: 24 },
    button: {
      marginBottom: 16 + TabBarSize.paddingBottom
    },
    fontImage: { resizeMode: "cover", width: width - 32, height: width * 0.6, marginLeft: 16, borderRadius: 16, marginBottom: 16 },
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
    },
    inforCard: {
      zIndex: 1,
      flex: 1,
      backgroundColor: colors.white, padding: 16,
      borderRadius: 12,
      marginHorizontal: 16,
      marginBottom: 16,
      overflow: 'hidden'
    },
  });
  return styles;
}
