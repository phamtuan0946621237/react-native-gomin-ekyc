/*
 * Created by duydatpham@gmail.com on 19/07/2021
 * Copyright (c) 2021 duydatpham@gmail.com
 */

import { useNavigation } from '@react-navigation/native';
import React, { useCallback, useContext, useEffect, useMemo } from 'react';
import { useMutation } from 'react-fetching-library';
import { Image, Linking, Platform, StatusBar } from 'react-native';
import { showMessage } from 'react-native-flash-message';
import { back_black_ic, support_main_ic } from '../../../assets';
import { checkVideoEkyc } from '../../api/actions/ekyc';
import { CommonContext } from '../../CommonProvider';
import { Button } from '../../components/app';
import Header from '../../components/core/header';
import { colors, styleText } from '../../theme';
import { UIBUtton, UILabel, UIScrollView, UIView } from '../../theme/element';
import { calcFontSize, showLoading, TabBarSize } from '../../util';
import Step from './step';
import { createStyles } from './style';

interface InfoType {
  title: string;
  value: string;
}
const MESSENGER = 'https://www.messenger.com/t/100352479230029/?messaging_source=source%3Apages%3Amessage_shortlink&source_id=1441792'
export default () => {
  //variable
  const navigation = useNavigation();
  const style = createStyles();
  const { ekyc, data_info_ekyc, access_token, setEkyc } = useContext(CommonContext)
  const { loading, mutate } = useMutation(checkVideoEkyc)
  const infoFirst: Array<InfoType> = useMemo(() => {
    let { id_card, ho_ten, ngay_sinh, gioi_tinh, front_ngay_het_han, que_quan, ho_khau_thuong_tru } = data_info_ekyc?.imgFront || {};
    let { dan_toc, ton_giao, ngay_cap, noi_cap, back_ngay_het_han, dac_diem_nhan_dang } = data_info_ekyc?.imgBack || {};
    let dataInfo = [
      { title: 'Số CMND / CCCD', value: id_card },
      { title: 'Họ và tên', value: ho_ten },
      { title: 'Ngày sinh', value: ngay_sinh },
      { title: 'Giới tính', value: gioi_tinh },
      { title: 'Dân tộc', value: dan_toc },
      { title: 'Tôn giáo', value: ton_giao },
      { title: 'Ngày cấp', value: ngay_cap },
      { title: 'Nơi cấp', value: noi_cap },
      { title: 'Ngày hết hạn', value: front_ngay_het_han || back_ngay_het_han },
      { title: 'Quê quán', value: que_quan },
      { title: 'Nơi thường trú', value: ho_khau_thuong_tru },
      { title: 'Đặc điểm nhận dạng', value: dac_diem_nhan_dang },
    ].filter(
      (_info: any) => !!_info.value
    )

    return dataInfo
  }, [data_info_ekyc]);

  // life cycle
  useEffect(() => {
    showLoading(loading)
  }, [loading])

  // action
  const _onClickUseImage = useCallback(async () => {
    var request = new FormData();
    request.append('front_image', ekyc?.image_front?.img);
    request.append('back_image', ekyc?.image_back?.img);
    request.append("type_media", "photo");
    request.append("token", access_token);
    request.append("image_general", {
      uri: Platform.select({
        ios: data_info_ekyc?.imgVideo,
        android: `file://${data_info_ekyc?.imgVideo}`,
      }),
      name: `image.png`,
      type: 'multipart/form-data'
    });
    let { payload } = await mutate(request)
    if (payload?.success) {
      if (!!setEkyc) setEkyc({
        ...ekyc,
        image_video: {
          type: "IMAGE_VIDEO",
          img: data_info_ekyc?.imgVideo?.current?.imageStraightFile
        },
      });
      console.log(
        "DONE_LIB"
      )
      // setTimeout(() => {
      //   navigation.reset({
      //     index: 0,
      //     routes: [{
      //       name: 'ListProduct'
      //     }]
      //   })
      // }, 100)

    } else {
      showMessage({
        type: 'danger',
        message: payload?.message
      })
    }
  }, [data_info_ekyc, ekyc, access_token])

  // layout
  return (
    <UIView style={{ flex: 1, backgroundColor: colors.white }}>
      <StatusBar
        animated={false}
        barStyle={'dark-content'}
        translucent={true}
      />
      <Header
        renderLeft={() => {
          return (
            <UIBUtton style={{ padding: 16 }} onPress={navigation.goBack}>
              <Image source={back_black_ic} style={style.icon24} />
            </UIBUtton>
          );
        }}
        title="Identify"
        style={style.header}
      />
      <UIScrollView>
        <Step />
        <Image
          source={{
            uri: `file://${data_info_ekyc?.imgVideo}?time=${Date.now()}`,
          }}
          style={{
            width: 110,
            height: 110,
            borderRadius: 55,
            alignSelf: 'center',
            marginTop: 32,
          }}
        />
        <UIView style={style.info}>
          <UILabel style={styleText.blackBlod16}>Thông tin cá nhân</UILabel>
          {infoFirst.map((item: InfoType, index: number) => {
            return (
              <UIView
                style={{ marginTop: 24, flexDirection: 'row' }}
                key={`info-item-${index}`}>
                <UILabel style={[styleText.gray200_16, { flex: 1 }]}>
                  {item.title}
                </UILabel>
                <UILabel
                  style={[
                    styleText.black16,
                    { flex: 1, textAlign: 'right', lineHeight: calcFontSize(22) },
                  ]}>
                  {item.value}
                </UILabel>
              </UIView>
            );
          })}
        </UIView>

        <UIView style={{ marginTop: 16, marginBottom: 16 + TabBarSize.paddingBottom, flexDirection: 'row', alignItems: 'center' }}>
          <UIBUtton style={style.sp} onPress={() => Linking.openURL(MESSENGER)}>
            <Image source={support_main_ic} style={{ width: 24, height: 24, marginRight: 16 }} />
            <UILabel style={[styleText.mainLightBold18, { marginTop: 4 }]}>Hỗ trợ</UILabel>
          </UIBUtton>
          <Button
            title="Xác nhận"
            onPress={_onClickUseImage}
            style={{ flex: 1, marginRight: 16, marginLeft: 0 }}
          />
        </UIView>
      </UIScrollView>
    </UIView>
  );
};
