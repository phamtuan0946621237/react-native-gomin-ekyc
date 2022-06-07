/*
 * Created by duydatpham@gmail.com on 19/07/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useMutation } from 'react-fetching-library';
import { Image, Platform, StatusBar } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { background_identify_result, back_white_ic } from '../../../assets';
import { checkIdentify } from '../../api/actions/ekyc';
import { CommonContext } from '../../CommonProvider';
import { Button } from '../../components/app';
import Header from '../../components/core/header';
import { colors, styleText } from '../../theme';
import { UIBUtton, UIImageBackground, UILabel, UIScrollView, UIView } from '../../theme/element';
import { showLoading } from '../../util';
import { createStyles } from './style';
interface IInfoFrontImg {
  title: string,
  plh: string,
  data: string
};

export default () => {
  //variable
  const navigation = useNavigation()
  const style = createStyles()
  const { setEkyc, saveInfoEkyc, access_token, ekyc,data_info_ekyc } = useContext(CommonContext)
  const route = useRoute().params as {
    image_front: {
      type?: string,
      img?: string
    }
  }
  const { loading, mutate, payload } = useMutation(checkIdentify)
  const [nextStep, setNextStep] = useState<boolean>();

  // life cycle
  useEffect(() => {
    _onClickUseImage()
  }, [])

  useEffect(() => {
    showLoading(loading)
  }, [loading]);

  // action
  const dataInfoFrontImg: IInfoFrontImg[] = useMemo(
    () => {
      const { ho_ten, ngay_sinh, id_card, que_quan, ho_khau_thuong_tru, ngay_het_han, gioi_tinh, quoc_tich } = payload?.data || {};

      return [
        {
          title: 'Số CMND/ CCCD: ',
          plh: 'Số CMND/ CCCD: ',
          data: id_card || ""
        },
        {
          title: 'Họ và tên: ',
          plh: 'Họ và tên: ',
          data: ho_ten || ""
        },
        {
          title: 'Ngày sinh: ',
          plh: 'Ngày sinh: ',
          data: ngay_sinh || ""
        },
        {
          title: 'Giới tính',
          plh: 'Giới tính',
          data: gioi_tinh || ""
        },
        {
          title: 'Quốc tịch',
          plh: 'Quốc tịch',
          data: quoc_tich
        },
        {
          title: 'Quê quán: ',
          plh: 'Quê quán: ',
          data: que_quan || ""
        },
        {
          title: 'Nơi thường trú: ',
          plh: 'Nơi thường trú: ',
          data: ho_khau_thuong_tru || ""
        },
        {
          title: 'Ngày hết hạn',
          plh: 'Ngày hết hạn',
          data: ngay_het_han || ""
        },
      ];
    }, [payload]
  );

  const _onClickUseImage = useCallback(async () => {
    const { img: image } = route?.image_front
    if (!image) return
    var request = new FormData();
    request.append("type", "front_card");
    request.append("image", {
      uri: Platform.select({
        ios: image,
        android: `file://${image}`,
      }),
      name: `image.png`,
      type: 'multipart/form-data'
    });
    request.append("token", access_token);
    let { payload } = await mutate(request)
    switch (payload?.success) {
      case true:
        const { ho_ten, ngay_sinh, id_card, que_quan, ho_khau_thuong_tru, gioi_tinh, ngay_het_han, quoc_tich } = payload?.data
        let data = {
          ho_ten,
          ngay_sinh,
          id_card,
          que_quan,
          ho_khau_thuong_tru,
          gioi_tinh,
          ngay_het_han,
          quoc_tich
        }
       
        if (!!saveInfoEkyc) saveInfoEkyc({
          ...data_info_ekyc,
          imgFront: data
        })
       
        if (!!setEkyc) setEkyc({
          ...ekyc,
          image_front: {
            type: "front_card",
            img: payload?.data?.image_name,
            img_request: route?.image_front.img
          },
        })
        setNextStep(false)
        break;
      case false:
        showMessage({
          type: 'danger',
          message: payload?.message
        })
        setNextStep(true)
        break;
      default:
        break
    }
  }, [route, ekyc, access_token,data_info_ekyc])

  // layout
  const _buildItem = useCallback((label: string, title: string) => {
    if (!title) return null
    return (
      <UIView style={{ backgroundColor: colors.white, flexDirection: 'row' }}>
        <UIView style={[{ flex: 1, marginBottom: 8 }]}>
          <UILabel style={[styleText.gray200_16, { lineHeight: 24 }]}>{label}</UILabel>
        </UIView>
        <UIView style={[{ flex: 1, marginBottom: 8 }]}>
          <UILabel style={[styleText.black16, { lineHeight: 24 }]}>{title}</UILabel>
        </UIView>
      </UIView>
    )
  }, [])

  return (
    <UIView style={style.container}>
      <UIImageBackground source={background_identify_result} resizeMode="cover" style={style.image}>
        <StatusBar
          animated={false}
          translucent={true}
          backgroundColor="transparent"
        />
        <Header
          renderLeft={() => {
            return (
              <UIBUtton style={{ padding: 16 }} onPress={() => navigation.dispatch(StackActions.replace("IdentifyFront"))}>
                <Image source={back_white_ic} style={style.icon24} />
              </UIBUtton>
            )
          }}
          title="Chụp mặt trước"
          titleStyle={{ color: colors.white }}
        />
        <UIView style={{ zIndex: 10, flex: 1 }}>
          <Image source={{ uri: `file://${route?.image_front?.img}?time=${Date.now()}` }} style={style.fontImage} />
          <UIView style={[style.inforCard]}>
            <UILabel style={[styleText.blackBold18, { marginBottom: 16 }]}>Thông tin cá nhân</UILabel>
            <UIScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {
                !!payload && !!payload.data && dataInfoFrontImg.map(
                  (_item: IInfoFrontImg, index: number) => (
                    <UIView key={`info-front-img-${index}`} >
                      {_buildItem(
                        _item.title,
                        _item.data
                      )}
                    </UIView>
                  )
                )
              }
            </UIScrollView>
          </UIView>
        </UIView>
        <UIView style={[style.alignRow, style.button]}>
          <Button title="Chụp lại" onPress={() => {
            navigation.dispatch(StackActions.replace("IdentifyFront"))
          }} style={{ flex: 1, marginRight: 0 }} isBorder={true} />
          <Button isDisable={nextStep} title="Dùng ảnh" onPress={() => {
            // filumAnalytics.track('OCR Front Confirmed');
            navigation.dispatch(StackActions.replace("IdentifyBack"))
          }} style={{ flex: 1 }} />
        </UIView>
      </UIImageBackground>
    </UIView>
  );
}

