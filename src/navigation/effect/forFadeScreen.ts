/*
 * Created by duydatpham@gmail.com on 03/10/2020
 * Copyright (c) 2020 duydatpham@gmail.com
 */
export const forFadeScreen = ({ current }: { current: any }) => ({
  cardStyle: {
    opacity: current.progress.interpolate({
      inputRange: [0, 0.5, 0.9, 1],
      outputRange: [0, 0.25, 0.7, 1],
    }),
  },
  overlayStyle: {
    opacity: current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.5],
      extrapolate: 'clamp',
    }),
  },
  shadowStyle: {
    shadowOpacity: current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 0.3],
      extrapolate: "clamp"
    })
  }
});
