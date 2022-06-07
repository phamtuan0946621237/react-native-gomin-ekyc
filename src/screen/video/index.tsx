/*
 * Created by duydatpham@gmail.com on 19/07/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { StackActions, useNavigation } from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Platform, StatusBar, useWindowDimensions } from 'react-native';
import { RecordFaceView } from "react-native-ekyc-sdk";
import { check, openSettings, PERMISSIONS, request, RESULTS } from "react-native-permissions";
import { CommonContext } from '../../CommonProvider';
import { face_left_ic, face_right_ic, face_straigth_ic } from '../../../assets';
import { UIView } from '../../theme/element';
import { StepVideoResponse } from '../../type/index';
import { calcFontSize } from '../../util';
import BottomView from './bottom-view';
import Header from './header';
import OpenPermission from './open-permission';
import { createStyles } from './style';
const UILottieView: any = LottieView


export default () => {
  // variable
  const { width } = useWindowDimensions()
  const navigation = useNavigation()
  const style = createStyles()
  const { saveInfoEkyc,data_info_ekyc } = useContext(CommonContext)
  const [noticePermission, setNoticePermission] = useState<boolean>()
  const validateView = useRef<any>();
  const [typeArr, setTypeArrow] = useState<string>("STRAIGHT")
  const [overlayStyle, setOverlayStyle] = useState({
    topHeight: 0,
    bottomHeight: 0,
  });
  const [isShow, setIsShow] = useState(false)
  const [startVideo, setStartVideo] = useState(false)
  const describle = useMemo(() => {
    if (typeArr === "STRAIGHT") return "Để mặt chính diện"
    if (typeArr === "RIGHT") return "Quay mặt sang phải"
    if (typeArr === "LEFT") return "Quay mặt sang trái"
    return ""
  }, [typeArr])

  const icon = useMemo(() => {
    if (typeArr === "STRAIGHT") return face_straigth_ic
    if (typeArr === "RIGHT") return face_right_ic
    if (typeArr === "LEFT") return face_left_ic
  }, [typeArr])

  const _refValidateVideo = useRef<any>()

  // life cycle
  useEffect(() => {
    requestPermission()
  }, [])

  useMemo(() => {
    if (!validateView.current) return
    if (!!validateView.current) {
      (validateView.current as any).startRecord()
    }
    setTimeout(() => {
      _setReady()
    }, 500)
  }, [validateView.current])


  // check permission
  const _checkPermission = async () => {
    let permisstionCamera = Platform.OS == 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA
    check(permisstionCamera)
      .then((result) => {
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
      })
      .catch(() => {
        // …
      });
  }

  const requestPermission = async () => {
    let permisstionCamera = Platform.OS == 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA
    request(permisstionCamera).then(res => {
      if (res === "granted") {
        setNoticePermission(true)
      } else if (res === "denied") {
        setNoticePermission(false)
      } else {
        _checkPermission()
      }
    })
  }

  //   validate 
  const _setReady = useCallback(() => {
    setIsShow(true) // show đếm lùi chạy để chuẩn bị quay
    setTimeout(() => {
      setIsShow(false)
      setStartVideo(true) // bắt đầu validate
      validateView?.current?.setCameraChecker()
    }, 5000)
  }, [validateView])

  const _onValidate = (r: any) => {
    if (Platform.OS === "ios")
      _validateIOS(r)

    if (Platform.OS === "android")
      _validateAndroid(r)
  }

  const _validateAndroid = (r: any) => {
    if (!!_refValidateVideo.current) {
      return
    }
    const { result, step, info } = r;
    if (step === StepVideoResponse.STEP_FACE_RIGHT) {
      setTypeArrow("RIGHT")
    }
    if (step === StepVideoResponse.STEP_FACE_LEFT) {
      setTypeArrow("LEFT")
    }
    // switch (result) {
    //   case ResultVideoResponse.FACE_READY:
    //     validateView.current.startRecord();
    //     break;
    //   case ResultVideoResponse.FACE_RIGHT:

    //     break;
    //   case ResultVideoResponse.FACE_LEFT:

    //     break;
    //   case result === ResultVideoResponse.DONE:
    //     break;
    //   default:
    //     break;
    // }
    if ((step === "DONE" || result === "DONE") && !!info) {
      _refValidateVideo.current = info
      const { current } = _refValidateVideo
      let data = {
        current
      }
      if (!!saveInfoEkyc) saveInfoEkyc({
        ...data_info_ekyc,
        imgVideo: data
      })
      try {
        validateView.current.stopRecord()
        validateView.current.stopCamera()
      } catch (error) {
      }
    }

    if (!!_refValidateVideo.current) {
      const { current } = _refValidateVideo
      setTimeout(() => {
        if (!!saveInfoEkyc) saveInfoEkyc({
          ...data_info_ekyc,
          imgVideo: current
        })
        navigation.dispatch(StackActions.replace("VideoResult", { img_video: _refValidateVideo.current }))
      }, 1000);
    }
  }

  const _validateIOS = useCallback((res: any) => {
    if (!!_refValidateVideo.current) {
      return
    }
    if (!validateView) return
    const { step, info } = res
    switch (step) {
      case StepVideoResponse.STEP_FACE_STRAIGHT:
        break;
      case StepVideoResponse.STEP_FACE_RIGHT:
        setTypeArrow("RIGHT")
        break;
      case StepVideoResponse.STEP_FACE_LEFT:
        setTypeArrow("LEFT")
        break;
      default:
        break;
    }
    if (Platform.OS === "ios" && !!info) {
      _refValidateVideo.current = info;
      try {
        validateView.current.stopRecord()
        validateView.current.stopCamera()
      } catch (error) {

      }
    }
    if (!!_refValidateVideo.current) {
      navigation.dispatch(StackActions.replace("VideoResult", { img_video: _refValidateVideo.current }))
    }
  }, [validateView])

  // action 
  const _open = () => {
    if (Platform.OS === "ios") {
      openSettings()
    } else {
      requestPermission()
    }
  }

  const onLayout = useCallback((event: any) => {
    const { height, width } = event.nativeEvent.layout;
    const _styleAndroid = {
      topHeight: (height - width) / 3,
      bottomHeight: ((height - width * 0.9) * 2) / 3,
    };
    const _styleIos = {
      topHeight: calcFontSize((height - width * 1.2) / 3),
      bottomHeight: ((height - width * 0.75) * 2) / 3,
    };
    setOverlayStyle(Platform.OS === "ios" ? _styleIos : _styleAndroid);
  }, [overlayStyle])


  // main layout]
  const _buildMainView = () => {
    if (noticePermission === true) {
      return (
        <>
          <Header />
          <UIView onLayout={(event: any) => onLayout(event)} style={{ flex: 1 }}>
            <RecordFaceView
              ref={validateView}
              style={{ flex: 1, }}
              overlay={"CIRCLE"}
              cameraTurnOn={true}
              enabledNativeView={true}
              onValidate={
                // startVideo == true && 
                _onValidate
              }
            />
          </UIView>
          <BottomView
            overlayStyle={overlayStyle}
            // takeOff={takeOff}
            describle={describle}
            typeArr={typeArr}
            icon={icon}
            startVideo={startVideo}
          />
        </>
      )
    }
    if (noticePermission === false) return <OpenPermission open={_open} />
    return (
      <UIView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <UILottieView
          source={require("../../../assets/lottie/loading.json")}
          autoPlay
          loop
          style={style.lottie}
        />
      </UIView>
    )
  }

  return (
    <UIView style={{ flex: 1 }}>
      <StatusBar
        animated={false}
        barStyle={"light-content"}
        translucent={true}
      />
      {_buildMainView()}

      {/* loading tự động chụp */}
      {isShow === true &&
        <UIView style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
          <UILottieView
            source={require("../../../assets/lottie/count4.json")}
            autoPlay
            loop
            style={{ width: width / 1.2 }}
          />
        </UIView>
      }
    </UIView>
  );
}
