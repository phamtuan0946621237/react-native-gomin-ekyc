/*
 * Created by duydatpham@gmail.com on 19/07/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useState } from 'react';
import { Animated, Image, StatusBar, useWindowDimensions } from 'react-native';
import {
  back_black_ic,
  cmnd_ic,
  deposit_to_invest_ic,
  line_ver_gray_ic,
  line_ver_main_ic,
  logo_payme_ic, note_main_ic
} from '../../../assets';
import { Button } from '../../components/app';
import Header from '../../components/core/header';
import { colors, styleText } from '../../theme';
import { UIBUtton, UILabel, UIScrollView, UIView } from '../../theme/element';
import { TabBarSize } from '../../util';
import { createStyles } from './style';

const note = [
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
];

const step = [
  {
    title: 'Định danh người dùng',
    icon: cmnd_ic,
    selected: true,
    item: ['Chuẩn bị CMND / CCCD ', 'Quay, chụp ảnh mặt thật'],
  },
  {
    title: 'Kích hoạt ví',
    icon: logo_payme_ic,
    selected: true,
    item: ['Nhập mã OTP', "Tạo mật khẩu ví"],
  },
  {
    title: 'Đầu tư ngay',
    icon: deposit_to_invest_ic,
    selected: false,
    item: 'Tham khảo và lựa chọn các gói đầu tư phù hợp , nhấn "Đầu tư ngay" để bắt đầu đầu tư',
  },
];

export default () => {
  const { height } = useWindowDimensions();
  const navigation = useNavigation();
  const style = createStyles();
  const [shadown] = useState(new Animated.Value(0))
  const Animation: any = Animated.View

  const _onBack = useCallback(() => {
    navigation.navigate("Main")
  }, []);

  const _onClickLinked = useCallback(async () => {

    navigation.navigate('IdentifyTutorial')
  }, [])

  const _handleScroll = useCallback((event: any) => {
    if (event.nativeEvent.contentOffset.y <= 0) {
      Animated.spring(shadown, {
        toValue: 0,
        delay: 10,
        useNativeDriver: true
      }).start();
      return
    }
    Animated.spring(shadown, {
      toValue: 1,
      delay: 10,
      useNativeDriver: true
    }).start();
  }, [shadown])

  return (
    <UIView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar
        animated={false}
        barStyle={'dark-content'}
        translucent={true}
        backgroundColor="transparent"
      />

      <Animation style={{
        backgroundColor: 'white',
        shadowColor: 'rgba(0, 0, 0, 0.08)',
        shadowOffset: {
          width: 0,
          height: 8,
        },
        shadowRadius: 8,
        shadowOpacity: shadown,
        elevation: 4,
        zIndex: 100
      }}>
        <Header
          renderLeft={() => {
            return (
              <UIBUtton style={{ padding: 16 }} onPress={_onBack}>
                <Image source={back_black_ic} style={style.icon24} />
              </UIBUtton>
            );
          }}

        />
      </Animation>

      <UIScrollView onScroll={_handleScroll} showsVerticalScrollIndicator={false}>
        <UIView style={{ paddingHorizontal: 16 }}>
          <UILabel style={[{ marginTop: 14 }, styleText.blackBold24]}>
            3 bước có thể đầu tư
          </UILabel>
          <UIView style={style.stepContainer}>
            <UIView style={style.step}>
              {step.map((item: any, index: number) => {
                return (
                  <UIView
                    key={`thumb - step - ${index}`}
                    style={{ alignItems: 'center' }}>
                    <UIView
                      style={[
                        style.thumbStep,
                        item?.selected === true
                          ? { backgroundColor: colors.main }
                          : { borderWidth: 1, borderColor: colors.border },
                      ]}
                    />
                    {index !== step.length - 1 && (
                      <Image
                        source={
                          index === 0 ? line_ver_main_ic : line_ver_gray_ic
                        }
                        style={{ height: (height - 450) / 3 }}
                      />
                    )}
                  </UIView>
                );
              })}
            </UIView>
            <UIView style={{ flex: 1 }}>
              {step.map((_step: any, index: number) => {
                return (
                  <UIView
                    key={`listStep - ${index}`}
                    style={{
                      flexDirection: 'row',
                      height: (height - 400) / 3,
                    }}>
                    {index === 1 ?
                      <UIView style={[style.icon64, { backgroundColor: "#F6F7FF", borderRadius: 32, justifyContent: 'center', alignItems: 'center' }]} >
                        <Image source={_step?.icon} style={{ width: 36, height: 36 }} />
                      </UIView>
                      :
                      <Image source={_step?.icon} style={style.icon64} />
                    }
                    <UIView style={{ marginLeft: 24, flex: 1 }}>
                      <UILabel style={[styleText.blackBlod16, { marginTop: 4 }]}>
                        {_step?.title}
                      </UILabel>
                      {typeof _step?.item === 'string' ? (
                        <UILabel style={[style.describle, styleText.black14]}>{_step?.item}</UILabel>
                      ) : (
                          _step?.item?.map((item: string, i: number) => {
                            return (
                              <UIView
                                key={`item - ${i}`}
                                style={[style.alignRow, { marginTop: 8 }]}>
                                <UIView style={style.thumbMain} />
                                <UILabel style={[styleText.black14]}>{item} </UILabel>
                              </UIView>
                            );
                          })
                        )}
                    </UIView>
                  </UIView>
                );
              })}
            </UIView>
          </UIView>
          {/* </UIView> */}
        </UIView>

        <UIView style={style.noteContainer}>
          <UIView style={style.alignRow}>
            <Image source={note_main_ic} style={style.icon24} />
            <UILabel style={[styleText.blackBold14, { marginLeft: 12 }]}>
              Lưu ý :{' '}
            </UILabel>
          </UIView>
          {note.map((item: string, index: number) => {
            return (
              <UIView key={`note - ${index}`} style={style.note}>
                <UIView style={style.thumbBlack} />
                <UILabel style={[{ flex: 1 }, styleText.black14]}>{item}</UILabel>
              </UIView>
            );
          })}
        </UIView>
      </UIScrollView>
      <UIView style={[{
        position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.white,
      }, style.header]}>
        <Button
          title={"Đầu tư ngay"}
          onPress={_onClickLinked}
          style={{ marginTop: 16, marginBottom: 16 + TabBarSize.paddingBottom }}
        />
      </UIView>
    </UIView>
  );
};
