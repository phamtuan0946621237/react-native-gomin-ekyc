import { default as LottieView } from 'lottie-react-native'
import React, { memo } from 'react'
import { Image, ImageSourcePropType, Platform } from 'react-native'
import { } from 'react-native-svg'
import { styleText } from '../../theme'
import { UILabel, UIView } from '../../theme/element'
import { createStyles } from './style'
const UIAnimatedLottieView: any = LottieView
interface PropsType {
    captureButtonPress?: () => void,
    // takeOff?: boolean,
    describle?: string,
    typeArr?: string,
    icon: ImageSourcePropType,
    overlayStyle?: any,
    startVideo?: boolean
}
const BottomView = (props?: PropsType) => {
    const style = createStyles()

    return (
        <UIView >
            {/* {props?.takeOff === true ? */}
            <UIView style={[style.button, { height: props?.overlayStyle.bottomHeight, justifyContent: 'space-around' }]}>
                {props?.startVideo === true &&
                    <>
                        <UILabel style={[styleText.white16, { textAlign: 'center', marginTop: -36 }]}>{props?.describle}</UILabel>
                        <UIView style={style.alignRow}>
                            <UIView style={{ width: 100, height: 70 }}>
                                {props?.typeArr === "LEFT" &&
                                    <UIAnimatedLottieView
                                        source={require("../../../assets/lottie/arr.json")}
                                        autoPlay
                                        loop
                                        style={{
                                            width: 100, height: 70, alignSelf: 'center', marginLeft: 8
                                        }}
                                    />
                                }
                            </UIView>
                            <UIView style={{ flex: 1 }}>
                                {Platform?.OS === "android" &&
                                    <UIView style={style.icon}>
                                        <Image source={props.icon} />
                                    </UIView>
                                }
                            </UIView>
                            <UIView style={{ width: 100, height: 70 }}>
                                {props?.typeArr === "RIGHT" &&
                                    <UIAnimatedLottieView
                                        source={require("../../../assets/lottie/arr.json")}
                                        autoPlay
                                        loop
                                        style={style.lottie}
                                    />
                                }
                            </UIView>
                        </UIView>
                    </>
                }
            </UIView>
            {/* :
                <View style={[style.button, { height: props?.overlayStyle.bottomHeight, justifyContent: 'flex-end', }]}>
                    <Button title="Bắt đầu chụp" style={{ marginBottom: 16 + TabBarSize.paddingBottom }} onPress={_captureButtonPress} />
                </View> */}
            {/* } */}
        </UIView>
    )
}

export default memo(BottomView)