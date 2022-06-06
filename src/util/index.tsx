/**
* Created by duydatpham@gmail.com on Mon Jul 30 2018
* Copyright (c) 2018 duydatpham@gmail.com
*/

import { Dimensions, Keyboard, Platform } from 'react-native';
import { UIStatusBar } from '../theme/element';
const dimen = Dimensions.get('window');

export function isIphoneX() {
  return (
    Platform.OS === 'ios' &&
    !Platform.isPad &&
    !Platform.isTVOS &&
    (dimen.height === 780 ||
      dimen.width === 780 ||
      dimen.height === 812 ||
      dimen.width === 812 ||
      dimen.height === 844 ||
      dimen.width === 844 ||
      dimen.height === 896 ||
      dimen.width === 896 ||
      dimen.height === 926 ||
      dimen.width === 926)
  );
}

//   const AAA : any = StatusBar
export function dismissKeyBoard() {
  Keyboard.dismiss();
}

export function calcFontSize(fontSize : number, standardScreenWidth = 375) {
  return Math.round((fontSize * dimen.width) / standardScreenWidth);
}

export const HeaderSize = {
  height: Platform.OS === 'ios' ? (isIphoneX() ? 94 : 74) : (54 + UIStatusBar?.currentHeight),
  paddingTop: (isIphoneX() ? 40 : (Platform.OS === 'ios' ? 20 : (UIStatusBar?.currentHeight || 0))),
}

export function showLoading(isShow: any) {
  (global as any).showLoading(isShow)
}

export const TabBarSize = {
  height: 60,
  paddingBottom: isIphoneX() ? 24 : 0,
}
