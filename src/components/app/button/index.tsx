import React, { memo, useCallback } from 'react'
import { Image, Keyboard, StyleProp, View, ViewStyle } from "react-native"
import { arr_right_white_ic, camera_white_ic } from '../../../../assets'
import { colors, styleText } from '../../../theme'
import { UIBUtton, UILabel, UIView } from '../../../theme/element'
import { createStyles } from './style'
interface ButtonPropsType {
    title: string,
    isArrowRight?: boolean,
    style?: StyleProp<ViewStyle>;
    isDisable?: boolean,
    onPress?: () => void,
    isBorder?: boolean,
    isTakePhoto?: boolean
    isLoanList?: boolean,
}

const Button = (props?: ButtonPropsType) => {
    const style = createStyles()

    const setBackgroundButton = () => {
        if (props?.isDisable === true) {
            return {
                backgroundColor: colors.gray100
            }
        }
        if (props?.isBorder === true) {
            return {
                backgroundColor: colors.main,
                borderWidth: 2,
                borderColor: colors.mainLight
            }
        }
        return { backgroundColor: colors.mainLight }
    }

    const _onClick = useCallback(() => {
        Keyboard.dismiss();
        if (props?.onPress) props?.onPress()
    }, [props?.onPress])


    return (
        <UIBUtton activeOpacity={0.7} onPress={_onClick} disabled={props?.isDisable} style={[style.container, props?.style, setBackgroundButton()]}>
            {props?.isArrowRight && <View style={style.iconArr} />}
            {props?.isTakePhoto === true ?
                <UIView style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={camera_white_ic} style={{ marginRight: 14 }} />
                    <UILabel numberOfLines={1} style={[styleText.whiteBold18, { textAlign: 'center' }]}>{props?.title}</UILabel>
                </UIView>
                :
                <UILabel numberOfLines={1} style={[styleText.whiteBold18, style.title]}>{props?.title}</UILabel>
            }
            {props?.isArrowRight && <Image style={style.iconArr} source={arr_right_white_ic} />}
        </UIBUtton>
    )
}

Button.defaultProps = {
    isArrowRight: false,
    isDisable: false,
    isBorder: false,
    isTakePhoto: false
};

export default memo(Button)