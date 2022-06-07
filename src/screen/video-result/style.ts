
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
    fontImage: { resizeMode: "cover", width: '100%', height: '100%', borderRadius: width * 0.65 * 0.5 },
    container: {
      flex: 1,
    },
    imgContainer: {
      width: width * 0.65, height: width * 0.65,
      borderRadius: width * 0.65 * 0.5, marginBottom: width * 0.65 * 0.5, alignSelf: 'center',
      borderWidth: 2,
      borderColor: colors.white
    },
    image: {
      flex: 1,
    },
  });
  return styles;
}
