/*
 * Created by duydatpham@gmail.com on 19/07/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useContext, useMemo } from 'react';
import { Image, StatusBar } from 'react-native';
import { background_identify_result, back_white_ic, success_white_ic } from '../../../assets';
import { CommonContext } from '../../CommonProvider';
import { Button } from '../../components/app';
import Header from '../../components/core/header';
import { colors } from '../../theme';
import { UIBUtton, UIImageBackground, UIView } from '../../theme/element';
import { createStyles } from './style';
interface RouteType {
  imageLeftFile?: string,
  imageRightFile?: string,
  imageStraightFile?: string
}

export default () => {
  const navigation = useNavigation()
  const style = createStyles()
  const route = useRoute().params as { img_video: RouteType }
  const { saveInfoEkyc,data_info_ekyc } = useContext(CommonContext)
  console.log("VIDEO_RESULT_SCREEN")

  useMemo(() => {
    const data = route?.img_video?.imageStraightFile
    if (!!saveInfoEkyc) saveInfoEkyc({
      ...data_info_ekyc,
      imgVideo: data
    })
  }, [route,data_info_ekyc])
  // action 
  const _goBack = () => {
    navigation.dispatch(StackActions.replace('Video'))
  }

  // layout
  return (
    <UIView style={style.container}>
      <StatusBar
        animated={false}
        barStyle={"light-content"}
        translucent={true}
      />
      <UIImageBackground source={background_identify_result} resizeMode="cover" style={style.image}>
        <Header
          renderLeft={() => {
            return (
              <UIBUtton style={{ padding: 16 }} onPress={_goBack}>
                <Image source={back_white_ic} style={style.icon24} />
              </UIBUtton>
            )
          }}
          title="Chụp ảnh chân dung"
          titleStyle={{ color: colors.white }}
        />
        <UIView style={{ flex: 1, justifyContent: 'center' }}>
          <UIView style={[style.imgContainer, { alignItems: 'center' }]}>
            <Image source={{
              uri: `file://${route?.img_video?.imageStraightFile}?time=${Date.now()}`
            }}
              style={style.fontImage} />
            <UIView style={{ height: 44, width: 44, borderRadius: 22, backgroundColor: colors.main, justifyContent: 'center', alignItems: 'center', borderWidth: 2, borderColor: colors.white, position: 'absolute', bottom: -22 }}>
              <Image source={success_white_ic} />
            </UIView>
          </UIView>
        </UIView>

        <UIView style={[style.alignRow, style.button]}>
          <Button title="Chụp lại" onPress={_goBack} style={{ flex: 1, marginRight: 0 }} isBorder={true} />
          <Button title="Dùng ảnh" onPress={() => {navigation.navigate("InfoConfirm")}} style={{ flex: 1 }} />
        </UIView>
      </UIImageBackground>
    </UIView>
  );
}

