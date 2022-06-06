import React, { memo } from 'react'
import { useWindowDimensions } from 'react-native'
import { } from 'react-native-svg'
import HorizontalDashedLine from '../../components/core/DashedLine/HorizontalDashedLine'
import { colors, styleText } from '../../theme'
import { UILabel, UIView } from '../../theme/element'
import {createStyles} from './style'
const Step = () => {
  const { width } = useWindowDimensions()
  const style= createStyles()
  return (
    <UIView
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
      }}>
      <UIView style={{ flexDirection: 'column' }}>
        <UIView
          style={{
            alignItems: 'center',
            marginTop: 16,
          }}>
          <UIView
            style={[
              style.alignRowTop,
              { width: width / 3, overflow: 'hidden', height: 17 },
            ]}>
            <UIView style={[style.alignRow, { alignItems: 'center' }]}>
              <UIView style={{ flex: 1 }}>
                <HorizontalDashedLine color={colors.white} />
              </UIView>
              <UIView
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: colors.main,
                  backgroundColor: colors.main
                }}
              />
              <UIView style={{ flex: 1 }}>
                <HorizontalDashedLine color={colors.gray} />
              </UIView>
            </UIView>
          </UIView>
        </UIView>
        <UIView>
          <UILabel
            style={[
              {
                flex: 1,
                textAlign: 'center',
                marginTop: 9,
                // color: colors.main,
              },
              styleText.main12
            ]}>
            Chụp ảnh giấy tờ
          </UILabel>
        </UIView>
      </UIView>

      <UIView style={{ flexDirection: 'column' }}>
        <UIView
          style={{
            alignItems: 'center',
            marginTop: 16,
          }}>
          <UIView
            style={[
              style.alignRowTop,
              { width: width / 3 + 5, overflow: 'hidden', height: 17 },
            ]}>
            <UIView style={[style.alignRow, { alignItems: 'center' }]}>
              <UIView style={{ flex: 1 }}>
                <HorizontalDashedLine color={colors.gray} />
              </UIView>
              <UIView
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: colors.gray,
                }}
              />
              <UIView style={{ flex: 1 }}>
                <HorizontalDashedLine color={colors.gray} />
              </UIView>
            </UIView>
          </UIView>
        </UIView>
        <UIView>
          <UILabel
            style={[
              {
                flex: 1,
                textAlign: 'center',
                marginTop: 9,
                // color: colors.gray,
              }, styleText.black12
            ]}>
            Chụp ảnh chân dung
          </UILabel>
        </UIView>
      </UIView>

      <UIView style={{ flexDirection: 'column' }}>
        <UIView
          style={{
            alignItems: 'center',
            marginTop: 16,
          }}>
          <UIView
            style={[
              style.alignRowTop,
              {
                width: width / 3,
                overflow: 'hidden',
                height: 17,
              },
            ]}>
            <UIView style={[style.alignRow, { alignItems: 'center' }]}>
              <UIView style={{ flex: 1 }}>
                <HorizontalDashedLine color={colors.gray} />
              </UIView>
              <UIView
                style={{
                  width: 16,
                  height: 16,
                  borderRadius: 8,
                  borderWidth: 2,
                  borderColor: colors.gray,
                }}
              />
              <UIView style={{ flex: 1 }}>
                <HorizontalDashedLine color={colors.white} />
              </UIView>
            </UIView>
          </UIView>
        </UIView>
        <UIView>
          <UILabel
            style={[
              {
                flex: 1,
                textAlign: 'center',
                marginTop: 9,
                // color: colors.gray,
              }, styleText.black12
            ]}>
            Xác nhận
          </UILabel>
        </UIView>
      </UIView>
    </UIView>
  )
}

export default memo(Step)