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
interface IInfoBackImg {
  title: string,
  plh: string,
  data: string
};

export default () => {
  const navigation = useNavigation();
  const style = createStyles();
  const { access_token, ekyc } = useContext(CommonContext)
  const route = useRoute().params as {
    image_back: {
      type?: string,
      img?: string
    }
  };
  const { loading, mutate, payload } = useMutation(checkIdentify);
  const [nextStep, setNextStep] = useState<boolean>();
  const { setEkyc, saveInfoEkyc, data_info_ekyc } = useContext(CommonContext)
  useEffect(() => {
    _onClickUseImage()
  }, [])

  const dataInfoBackImg: IInfoBackImg[] = useMemo(
    () => {
      const { dac_diem_nhan_dang, ngay_cap, dan_toc, ngay_het_han, noi_cap, ton_giao } = payload?.data || {};

      return [
        {
          title: 'Dân tộc: ',
          plh: 'Dân tộc: ',
          data: dan_toc
        },
        {
          title: 'Tôn giáo: ',
          plh: 'Tôn giáo',
          data: ton_giao,
        },
        {
          title: 'Dị hình: ',
          plh: 'Dị hình: ',
          data: dac_diem_nhan_dang
        },
        {
          title: 'Ngày cấp: ',
          plh: 'Ngày cấp: ',
          data: ngay_cap
        },
        {
          title: 'Nơi cấp: ',
          plh: 'Nơi cấp',
          data: noi_cap
        },
        {
          title: 'Ngày hết hạn: ',
          plh: 'Ngày hết hạn: ',
          data: ngay_het_han
        },
      ];
    }, [payload]
  );

  const _buildItem = useCallback((label: string, title: string) => {
    if (!title) return null
    return (
      <UIView style={{ backgroundColor: colors.white, flexDirection: 'row' }}>
        <UIView style={[{ flex: 1, marginBottom: 8 }]}>
          <UILabel style={[styleText.gray200_16, { lineHeight: 24 }]}>{label}</UILabel>
        </UIView>
        <UIView style={[{ flex: 1, marginBottom: 8, }]}>
          <UILabel style={[styleText.black16, { lineHeight: 24 }]}>{title}</UILabel>
        </UIView>
      </UIView>
    )
  }, [])

  useEffect(() => {
    showLoading(loading);
  }, [loading]);
  const _onClickUseImage = useCallback(async () => {
    const { img: image } = route?.image_back;
    if (!image) return;
    var request = new FormData();
    request.append('type', 'back_card');
    request.append('token', access_token);
    request.append('image', {
      uri: Platform.select({
        ios: image,
        android: `file://${image}`,
      }),
      name: `image.png`,
      type: 'multipart/form-data'
    });



    let { payload } = await mutate(request);
    switch (payload?.success) {
      case true:
        // filumAnalytics.track('OCR Back Succeeded');
        if (!!setEkyc) setEkyc({
          ...ekyc,
          image_back: {
            type: 'back_card',
            img: payload?.data?.image_name,
            img_request: route?.image_back.img,
          },
        })
        const { dac_diem_nhan_dang, ngay_cap, dan_toc, ngay_het_han, gioi_tinh, noi_cap, ton_giao } = payload?.data || {};
        let data = {
          dac_diem_nhan_dang,
          ngay_cap,
          dan_toc,
          ngay_het_han,
          gioi_tinh,
          noi_cap,
          ton_giao
        }
        if (!!saveInfoEkyc) saveInfoEkyc({
          ...data_info_ekyc,
          imgBack: data
        })
        setNextStep(false)
        break;
      case false:
        showMessage({
          type: 'danger',
          message: payload?.message,
        });
        setNextStep(true)
        break;
      default:
        break;
    }
  }, [route, ekyc, access_token, data_info_ekyc]);

  return (
    <UIView style={style.container}>
      <StatusBar
        animated={false}
        translucent={true}
        backgroundColor="transparent"
      />
      <UIImageBackground
        source={background_identify_result}
        resizeMode="cover"
        style={style.image}>
        <Header
          renderLeft={() => {
            return (
              <UIBUtton
                style={{ padding: 16 }}
                onPress={navigation.goBack}>
                <Image source={back_white_ic} style={style.icon24} />
              </UIBUtton>
            );
          }}
          title="Chụp mặt sau"
          titleStyle={{ color: colors.white }}
        />
        <UIView style={{ flex: 1, justifyContent: 'center' }}>
          <Image
            source={{ uri: `file://${route?.image_back?.img}?time=${Date.now()}` }}
            style={style.fontImage}
          />
          <UIView style={[style.inforCard]}>
            <UILabel style={[styleText.blackBold18, { marginBottom: 16 }]}>Thông tin cá nhân</UILabel>
            <UIScrollView
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
            >
              {
                !!payload && !!payload.data && dataInfoBackImg.map(
                  (_item: IInfoBackImg, index: number) => (
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
          <Button
            title="Chụp lại"
            onPress={() => {
              navigation.navigate('IdentifyBack')
            }}
            style={{ flex: 1, marginRight: 0 }}
            isBorder={true}
          />
          <Button
            title="Dùng ảnh"
            isDisable={nextStep}
            // onPress={_onClickUseImage}
            onPress={() => {
              navigation.dispatch(StackActions.replace("IdentifyConfirm"))
            }}
            style={{ flex: 1 }}
          />
        </UIView>
      </UIImageBackground>
    </UIView>
  );
};
