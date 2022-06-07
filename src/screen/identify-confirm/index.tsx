/*
 * Created by duydatpham@gmail.com on 19/07/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext } from 'react';
import { Image, StatusBar } from 'react-native';
import { back_black_ic, success_white_ic } from '../../../assets';
import { Button } from '../../components/app';
import Header from '../../components/core/header';
import { colors, styleText } from '../../theme';
import { UIBUtton, UILabel, UIScrollView, UIView } from '../../theme/element';
import Step from './step';
import { createStyles } from './style';
import { CommonContext } from 'src/CommonProvider';
export default () => {
  const navigation = useNavigation()
  const style = createStyles()
  const {ekyc} = useContext(CommonContext)
  // const { ekyc } = useSelector((state: any) => state.ekyc)
  const _onBack = useCallback(() => {
    navigation.goBack()
  }, [])

  console.log("ekyc_libbbbb :::",ekyc)

  return (
    <UIView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar
        animated={false}
        barStyle={"dark-content"}
        translucent={true}
      />
      <Header
        renderLeft={() => {
          return (
            <UIBUtton style={{ padding: 16 }} onPress={_onBack}>
              <Image source={back_black_ic} style={style.icon24} />
            </UIBUtton>
          )
        }}
        title="Xác thực tài khoản"
        style={style.header}
      />
      <UIScrollView>
        <Step />

        <UIView style={{ borderWidth: 1, alignSelf: 'center', padding: 2, borderColor: colors.border, borderRadius: 6, marginTop: 48, alignItems: 'center' }}>
          <Image source={{ uri: `file://${ekyc?.image_front?.img_request}?t=${Date.now()}` }} style={style.ic} />
          <UIView style={style.icSuccess}>
            <Image source={success_white_ic} />
          </UIView>
        </UIView>
        <UILabel style={[styleText.blackBlod16, { marginTop: 32, textAlign: 'center' }]}>Ảnh mặt trước thành công</UILabel>
        <UIView style={{ borderWidth: 1, alignSelf: 'center', padding: 2, borderColor: colors.border, borderRadius: 6, marginTop: 48, alignItems: 'center' }}>
          <Image source={{ uri: `file://${ekyc?.image_back?.img_request}?t=${Date.now()}` }} style={style.ic} />
          <UIView style={style.icSuccess}>
            <Image source={success_white_ic} />
          </UIView>
        </UIView>
        <UILabel style={[styleText.blackBlod16, { marginTop: 32, textAlign: 'center' }]}>Ảnh mặt sau thành công</UILabel>

        <Button title="Tiếp tục" onPress={() => navigation.navigate("VideoTutorial")} style={style.button} />
      </UIScrollView>
    </UIView>
  );
}
