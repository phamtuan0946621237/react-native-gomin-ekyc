/*
 * Created by duydatpham@gmail.com on 19/07/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { StackActions, useNavigation } from '@react-navigation/native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Platform, StatusBar } from 'react-native';
import { ValidateCardView } from "react-native-ekyc-sdk";
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { back_black_ic, back_white_ic, camera_ic } from '../../../assets';
import { Button } from '../../components/app';
import Header from '../../components/core/header';
import { colors, styleText } from '../../theme';
import { UIAnimationView, UIBUtton, UILabel, UIView } from '../../theme/element';
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
  const [isShow, setIsShow] = useState(false)
  const [ekycReady, setEkycReady] = useState(false)
  const validateCardView = useRef();
  const [noticePermission, setNoticePermission] = useState<boolean>()
  // const [isEnabled, setIsEnabled] = useState(false);
  const _refValidateCard = useRef<any>({})
  const [takePhotoAuto, setTakePhotoAuto] = useState<boolean>(false)

  // life cycle
  useEffect(() => {
    _permissionStorage()
  }, [])

  useEffect(() => {
    (async () => {
      await requestPermission()
      setIsShow(true)
      setTimeout(() => {
        setEkycReady(true)
        if (!!validateCardView.current) (validateCardView.current as any).startCamera()
        if (!!validateCardView.current) (validateCardView.current as any).remapListener()
      }, 1000);
      // await _checkPermission()
    })()
  }, []);


  // action 
  const onLayout = useCallback((event: any) => {
    const { height, width } = event.nativeEvent.layout;
    let ratio = height > width ? 0.9 : 0.72
    const _style = {
      topHeight: height / 4,
      bottomHeight: (width * ratio * 2 / 3) + (width * ratio * 2 / 3) / 4 - TabBarSize.height,
    };
    setOverlayStyle(_style);
  }, [overlayStyle])

  const _onValidate = (res: any) => {
    if (!!_refValidateCard.current.img && !!_refValidateCard.current.type) {
      return
    }
    const { result, imageDataFile } = res;
    if (result == "IMAGE_FRONT") {
      _refValidateCard.current.type = result
      setTakePhotoAuto(true)
    }
    if (!!imageDataFile) {
      _refValidateCard.current.img = imageDataFile
    }
    if (!!_refValidateCard.current.img && !!_refValidateCard.current.type) {
      navigation.dispatch(StackActions.replace("IdentifyFrontResult", {
        image_front: _refValidateCard.current
      }))
    }
  };

  useMemo(() => {
    if (!validateCardView) return
    if (takePhotoAuto === false) return
  }, [takePhotoAuto])


  const _checkPermission = async () => {
    let permisstionCamera = Platform.OS == 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA
    let result = await check(permisstionCamera);
    switch (result) {
      case RESULTS.UNAVAILABLE:
        break;
      case RESULTS.DENIED:
        setNoticePermission(false)
        break;
      case RESULTS.LIMITED:
        setNoticePermission(false)
        break;
      case RESULTS.GRANTED:
        setNoticePermission(true)
        break;
      case RESULTS.BLOCKED:
        Platform.OS === 'ios' ? setNoticePermission(false) : openSettings()
        requestPermission()
        break;
    }
  }

  const _permissionStorage = async () => {
    const per =
      Platform.OS == 'android'
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY;
    let resCheck = await check(per);
    console.log("resCheck ::", resCheck)
    if (resCheck == RESULTS.DENIED) {
      resCheck = await request(per);
    }
  }

  const requestPermission = async () => {
    let permisstionCamera = Platform.OS == 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA
    let res = await request(permisstionCamera)
    if (res === "granted") {
      setNoticePermission(true)

    } else if (res === "denied") {
      setNoticePermission(false)
    } else {
      await _checkPermission()
    }
  }

  const _open = useCallback(() => {
    if (Platform.OS === "ios") {
      openSettings()
    } else {
      requestPermission()
    }
  }, [])

  const _onBack = useCallback(() => {
    navigation.goBack()
  }, [])


  const _captureButtonPress = useCallback((validate: any) => {
    validate.takePhoto();
  }, [])

  return (
    <UIView style={{ flex: 1 }}>
      <StatusBar
        animated={false}
        barStyle={"light-content"}
        translucent={true}
      />
      {noticePermission === true ?
        (isShow && <>
          <UIView style={style.header}>
            <UIBUtton style={style.iconBack} onPress={() => navigation.goBack()}>
              <Image source={back_white_ic} style={style.icon24} />
            </UIBUtton>
            <UILabel style={[{ marginTop: 16 + (HeaderSize.paddingTop as number) }, styleText.whiteBold18]}>Chụp mặt trước</UILabel>
            <UIView style={style.iconBack} />
          </UIView>
          <UIView onLayout={(event: any) => onLayout(event)} style={{ flex: 1 }}>
            <ValidateCardView
              ref={validateCardView}
              cameraTurnOn={true}
              cameraType={CameraType.FRONT}
              style={{ flex: 1 }}
              onValidate={_onValidate}
              enabledNativeView={false}
              enabledCapturedButton={false}
            />
            <UIView style={[style.topView, { height: overlayStyle.topHeight, justifyContent: 'flex-end' }]}>
              <UILabel style={[{ textAlign: 'center', marginHorizontal: 16, lineHeight: 20 }, styleText.white16]}>Hãy đặt chứng từ trên một mặt phẳng, đảm bảo hình ảnh không bị lóa, tối hoặc mờ</UILabel>
            </UIView>
          </UIView>

          <UIView style={{ height: overlayStyle.bottomHeight, position: 'absolute', bottom: 0, left: 0, right: 0, }}>
            <UIView style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', flex: 1 }}>
              {/* <Switch
                trackColor={{ false: "#767577", true: "#8E94F2" }}
                thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor={colors?.gray}
                onValueChange={toggleSwitch}
                value={isEnabled}
              />
              <Text style={[styleText.white16, { marginLeft: 16 }]}>{isEnabled === false ? "Bật" : "Tắt"} Chế độ chụp tự động</Text> */}
              {/* close button chua co chuc nang */}
            </UIView>
            <UIView style={[style.button]}>
              <Button title="Chụp" isTakePhoto={true} onPress={() => _captureButtonPress(validateCardView.current)} />
            </UIView>
          </UIView>

        </>
        )
        : noticePermission === false &&
        <>
          <Header
            renderLeft={() => {
              return (
                <UIBUtton style={{ padding: 16 }} onPress={_onBack}>
                  <Image source={back_black_ic} style={style.icon24} />
                </UIBUtton>
              )
            }}
            title=""
            style={style.headerPermis}
          />
          <UIView style={{ flexDirection: "column", flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.white }}>
            <Image source={camera_ic} style={{ width: 60, height: 60 }} />
            <UILabel style={[styleText.blackBlod16, { marginTop: 48 }]}>Hãy bật quyền truy cập Camera</UILabel>
            <UILabel style={[styleText.mainBold16, { padding: 16 }]} onPress={_open}>Tại đây</UILabel>
          </UIView>
        </>

      }

      {!ekycReady && <UIView style={{
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
        alignItems: 'center', justifyContent: 'center'
      }}>
        <UIAnimationView
          source={require('../../../../assets/lottie/loading.json')}
          autoPlay
          loop style={{ width: 250, height: 250, alignSelf: 'center' }} />
      </UIView>
      }

    </UIView>
  );
}
