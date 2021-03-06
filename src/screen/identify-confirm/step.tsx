// import { default as AnimatedLottieView, default as LottieView } from 'lottie-react-native'
import React, { memo } from 'react'
import { useWindowDimensions } from 'react-native'
import HorizontalDashedLine from '../../components/core/DashedLine/HorizontalDashedLine'
import { colors, styleText } from '../../theme'
import { UILabel, UIView } from '../../theme/element'
import { createStyles } from './style'

const Step = () => {
  const style = createStyles()
  const { width } = useWindowDimensions()
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
                  backgroundColor: colors.main,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}
              >
                {/* <Image source={success_white_ic} style={{width : 8,height : 8,resizeMode : 'cover'}}/> */}
              </UIView>
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
                // flex: 1,
                textAlign: 'center',
                marginTop: 9,

              }, styleText.main12
            ]}>
            Ch???p ???nh gi???y t???
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
                  // backgroundColor : colors.main
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
                // flex: 1,
                textAlign: 'center',
                marginTop: 9,
                // color: colors.gray,
              }, styleText.black12
            ]}>
            Ch???p ???nh ch??n dung
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
                textAlign: 'center',
                marginTop: 9,
              }, styleText.black12
            ]}>
            X??c nh???n
          </UILabel>
        </UIView>
      </UIView>
    </UIView>
  )
}

export default memo(Step)