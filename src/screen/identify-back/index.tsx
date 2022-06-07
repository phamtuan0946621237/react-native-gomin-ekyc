/*
 * Created by duydatpham@gmail.com on 19/07/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { StackActions, useFocusEffect, useNavigation } from '@react-navigation/native';
import React, { useCallback, useRef, useState } from 'react';
import { Image, StatusBar } from 'react-native';
import { ValidateCardView } from "react-native-ekyc-sdk";
import { back_white_ic } from '../../../assets';
import { Button } from '../../components/app';
import { styleText } from '../../theme';
import { UIBUtton, UILabel, UIView } from '../../theme/element';
import { CameraType } from '../../type/index';
import { HeaderSize, TabBarSize } from '../../util';
import { createStyles } from './style';
interface StateOverlayType {
  topHeight: number,
  bottomHeight: number,
}
export default () => {
  const navigation = useNavigation()
  const style = createStyles()
  const [overlayStyle, setOverlayStyle] = useState<StateOverlayType>({
    topHeight: 0,
    bottomHeight: 0,
  });
  const validateCardView = useRef();
  const _refValidateCard = useRef<any>({})


  useFocusEffect(
    React.useCallback(() => {
      if (!!validateCardView.current) (validateCardView.current as any).startCamera()
    }, [])
  );

  // action 
  const _onValidate = useCallback((res: any) => {
    const { result, imageDataFile } = res;
    if (!!_refValidateCard?.current.type && !!_refValidateCard?.current.img)
      return
    if (result === "IMAGE_BACK") {
      _refValidateCard.current.type = result
    }
    if (imageDataFile !== undefined) {
      _refValidateCard.current.img = imageDataFile
    }
    if (!!_refValidateCard?.current.type && !!_refValidateCard?.current.img) {
      navigation.dispatch(StackActions.replace("IdentifyBackResult", {
        image_back: _refValidateCard?.current
      }))
    }
  }, [])

  const _captureButtonPress = useCallback((validate: any) => {
    validate.takePhoto();
  }, [])

  const onLayout = useCallback((event: any) => {
    const { height, width } = event.nativeEvent.layout;
    let ratio = height > width ? 0.9 : 0.72

    const _style = {
      topHeight: height / 4,
      bottomHeight: (width * ratio * 2 / 3) + (width * ratio * 2 / 3) / 4 - TabBarSize.height,
    };

    setOverlayStyle(_style);
  }, [overlayStyle])

  return (
    <UIView style={{ flex: 1 }}>
      <StatusBar
        animated={false}
        barStyle={"light-content"}
        translucent={true}
      />
      <UIView style={style.header}>
        <UIBUtton style={style.iconBack} onPress={() => navigation.goBack()}>
          <Image source={back_white_ic} style={style.icon24} />
        </UIBUtton>
        <UILabel style={[{ marginTop: 16 + HeaderSize.paddingTop }, styleText.whiteBold18]}>Chụp mặt sau</UILabel>
        <UIView style={style.iconBack} />
      </UIView>
      <UIView onLayout={(event: any) => onLayout(event)} style={{ flex: 1 }}>
        <ValidateCardView
          cameraTurnOn={true}
          cameraType={CameraType.BACK}
          style={{ flex: 1 }}
          onValidate={_onValidate}
          enabledNativeView={false}
          enabledCapturedButton={false}
          ref={validateCardView}
        />
        <UIView style={[style.topView, { height: overlayStyle.topHeight, justifyContent: 'flex-end' }]}>
          <UILabel style={[{ textAlign: 'center', marginHorizontal: 16, lineHeight: 20 }, styleText.white16]}>Hãy đặt chúng từ trên một mặt phẳng, đảm bảo hình ảnh không bị lóa, tối hoặc mờ</UILabel>
        </UIView>
      </UIView>

      <UIView style={{ height: overlayStyle.bottomHeight, position: 'absolute', bottom: 0, left: 0, right: 0, }}>
        <UIView style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1 }}>
        </UIView>
        <UIView style={[style.button]}>
          <Button title="Chụp" isTakePhoto={true} onPress={() => _captureButtonPress(validateCardView.current)} />
        </UIView>
      </UIView>
    </UIView>
  );
}
