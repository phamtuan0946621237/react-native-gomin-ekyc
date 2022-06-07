/*
 * Created by duydatpham@gmail.com on 19/07/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, ImageSourcePropType, StatusBar, useWindowDimensions } from 'react-native';
import { back_black_ic, video_tutorial_1_ic, video_tutorial_2_ic, video_tutorial_3_ic, video_tutorial_4_ic } from '../../../assets';
import { Button } from '../../components/app';
import Header from '../../components/core/header';
import { colors, styleText } from '../../theme';
import { UIBUtton, UILabel, UIView } from '../../theme/element';
import { TabBarSize } from '../../util';
import Step from './step';
import { createStyles } from './style';

interface TutorialType {
  title: string,
  icon: ImageSourcePropType
}

const tutorial: Array<TutorialType> = [
  { title: 'Chụp đủ ánh sáng', icon: video_tutorial_1_ic },
  { title: 'Đặt khuôn mặt vừa khung hình', icon: video_tutorial_2_ic },
  { title: 'Đảm bảo khuôn mặt rõ nét, không bị mờ lóa', icon: video_tutorial_3_ic },
  { title: 'Vui lòng không đeo kinh, đội mũ', icon: video_tutorial_4_ic }
]
export default () => {
  const { width } = useWindowDimensions()
  const navigation = useNavigation()
  const style = createStyles()



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
            <UIBUtton style={{ padding: 16 }} onPress={navigation.goBack}>
              <Image source={back_black_ic} style={style.icon24} />
            </UIBUtton>
          )
        }}
        title="Hướng dẫn"
        style={style.header}
      />
      <UIView style={{ flex: 1 }}>
        <Step />

        <UILabel style={[styleText.blackBlod16, { marginTop: 48, textAlign: 'center' }]}>Hướng dẫn chụp hình chân dung</UILabel>
        <UIView style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', marginTop: 16 }}>
          {tutorial.map((item: TutorialType, index: number) => {
            return (
              <UIView style={{ alignItems: 'center', width: width / 2, marginTop: 32 }} key={`tutorial - ${index}`}>
                <Image source={item?.icon} style={{ width: 56, height: 56, borderRadius: 8 }} />
                <UILabel style={[styleText.black16, { marginTop: 20, textAlign: 'center', marginHorizontal: 32 }]}>{item?.title}</UILabel>
              </UIView>
            )
          })}
        </UIView>

        <Button title="Đã hiểu" onPress={() => navigation.navigate("Video")} style={{ marginTop: 32, marginBottom: 16 + TabBarSize.paddingBottom }} />
      </UIView>
    </UIView>
  );
}
