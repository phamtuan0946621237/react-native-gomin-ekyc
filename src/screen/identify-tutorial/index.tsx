/*
 * Created by duydatpham@gmail.com on 19/07/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { useNavigation, useNavigationState } from '@react-navigation/native';
import React, { useEffect } from 'react';
import {Alert,BackHandler, Image,ImageSourcePropType, Platform} from 'react-native';
import { check, openSettings, PERMISSIONS, request, RESULTS } from 'react-native-permissions';
import { security_ic, success_ic, tutorial_take_CMND1, tutorial_take_CMND2, tutorial_take_CMND3 } from '../../../assets';
import { Button, Container } from '../../components/app';
import Header from '../../components/core/header';
import { colors, styleText } from '../../theme';
import { UILabel, UIScrollView, UIView } from '../../theme/element';
import { TabBarSize } from '../../util';
import Step from './step';
import { createStyles } from './style';

interface TutorialType {
  title: string;
  icon: ImageSourcePropType;
}
export default () => {
  const navigation = useNavigation();
  const style = createStyles();
  const routes = useNavigationState(state => state)
  const guide = [
    'Còn hạn sử dụng',
    'Hình gốc, không scan hay photocopy',
    'Chứng từ không bị mất góc, bấm lỗ',
  ];

  React.useEffect(() => {
    let backHandler: any = null
    if (Platform.OS == 'android' && routes?.routes?.length == 1 && routes?.routes[0]?.name == "IdentifyTutorial") {
      const handleBackButton = () => {
        Alert.alert(
          "Thông báo",
          "Bạn có muốn thoát ứng dụng",
          [
            { text: 'Huỷ', onPress: () => console.log('Ask me later pressed') },
            {
              text: 'Tiếp tục', onPress: async () => {
                BackHandler.exitApp()
              }

            },
          ]
        )
        return true;
      }

      backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackButton);
    }

    const unsubscribe = navigation.addListener('gestureEnd' as any, () => {
      // Do something
      // navigation.navigate("Main")
    });

    return () => {
      unsubscribe();
      !!backHandler && backHandler.remove()
    }
  }, [navigation, routes]);

  const tutorial: Array<TutorialType> = [
    {
      title: 'Không bị che khuất',
      icon: tutorial_take_CMND1,
    },
    {
      title: 'Không bị mờ lóa',
      icon: tutorial_take_CMND2,
    },
    {
      title: 'Không cắt góc',
      icon: tutorial_take_CMND3,
    },
  ];

  useEffect(() => {
    (async () => {
      await _permissionStorage()
      // await _checkPermission();
    })()
  }, [])

  const _openSuccess = () => {
    Alert.alert(
      'Thông báo',
      'Bạn có muốn bật quyền truy cập ?',
      [
        { text: 'Huỷ', onPress: () => console.log('Ask me later pressed') },
        {
          text: 'Tiếp tục', onPress: async () => {
            if (Platform.OS === 'ios') {
              openSettings()
              return
            }
            requestPermission()
          }

        },
      ]
    )
  }

  const _checkPermission = async () => {
    let permisstionCamera = Platform.OS == 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA
    check(permisstionCamera)
      .then((result) => {
        switch (result) {
          case RESULTS.UNAVAILABLE:
            _openSuccess()
            break;
          case RESULTS.DENIED:
            _openSuccess()
            break;
          case RESULTS.LIMITED:
            _openSuccess()
            break;
          case RESULTS.GRANTED:
            _openSuccess()
            break;
          case RESULTS.BLOCKED:
            requestPermission()
            break;
        }
      })
      .catch(() => {
        // …
      });
  }

  const _permissionStorage = async () => {
    const per =
      Platform.OS == 'android'
        ? PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE
        : PERMISSIONS.IOS.PHOTO_LIBRARY;
    let resCheck = await check(per);
    if (resCheck == RESULTS.DENIED) {
      resCheck = await request(per);
    }
  }

  const requestPermission = async () => {
    let permisstionCamera = Platform.OS == 'android' ? PERMISSIONS.ANDROID.CAMERA : PERMISSIONS.IOS.CAMERA
    request(permisstionCamera).then(res => {
      // showLoading(false)
      if (res === "granted") {
        _openSuccess()
      } else if (res === "denied") {
        _openSuccess()
      } else {
        _checkPermission()
      }
    })
  }

  return (
    <Container barStyle="dark-content">
      <UIView style={{ flex: 1, backgroundColor: colors.white }}>
        <Header
          title="Hướng dẫn"
          style={style.header}
        />
        <UIScrollView>
          <Step />
          <UIView style={style.note}>
            <UIView style={style.alignRow}>
              <Image
                resizeMode={'contain'}
                source={security_ic}
                style={[style.icon24, { marginTop: 2 }]}
              />
              <UILabel style={{ flex: 1, marginLeft: 14, lineHeight: 18 }}>
                Ginto CIS cam kết bảo mật thông tin cá nhân của mọi người dùng
              </UILabel>
            </UIView>
          </UIView>
          <UIView style={{ marginHorizontal: 16 }}>
            <UILabel
              style={[
                styleText.blackBlod16,
                { marginTop: 20, textAlign: 'center' },
              ]}>
              HƯỚNG DẪN CHỤP HÌNH{' '}
            </UILabel>
            <UILabel
              style={[styleText.blackBlod16, { marginTop: 26 }]}>
              Chứng từ cần đảm bảo
            </UILabel>
            {guide.map((item: string, index: number) => {
              return (
                <UIView
                  key={`huong-dan - ${index}`}
                  style={[style.alignRow, { marginTop: 12 }]}>
                  <Image source={success_ic} style={style.icon24} />
                  <UILabel style={[{ marginLeft: 16 }, styleText.black14]}>{item}</UILabel>
                </UIView>
              );
            })}

            <UIView style={[{ flexDirection: 'row', marginTop: 36 }]}>
              {tutorial.map((item: TutorialType, index: number) => {
                return (
                  <UIView
                    style={{ flex: 1, alignItems: 'center' }}
                    key={`tutorial - ${index}`}>
                    <Image
                      source={item?.icon}
                      style={{ width: 48, height: 48, borderRadius: 8 }}
                    />
                    <UILabel
                      style={[
                        styleText.black16,
                        { marginTop: 20, textAlign: 'center' },
                      ]}>
                      {item?.title}
                    </UILabel>
                  </UIView>
                );
              })}
            </UIView>
          </UIView>
        </UIScrollView>
        <UIView style={[{
          position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: colors.white,
        }, style.header]}>
          <Button
            title="Đã hiểu"
            onPress={() => navigation.navigate('IdentifyFront')}
            style={{ marginTop: 32, marginBottom: 16 + TabBarSize.paddingBottom }}
          />
        </UIView>
      </UIView>
    </Container>
  );
};
