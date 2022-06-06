import React, { memo } from 'react'
import { StatusBar, StyleProp, ViewStyle } from "react-native"
import { UIBUtton, UIView } from '../../../theme/element'
import { dismissKeyBoard } from '../../../util'
import { createStyles } from './style'
interface PropsType {
    children?: any,
    barStyle?: "dark-content" | "light-content",
    isList: boolean,
    style?: StyleProp<ViewStyle>;
}

const Container = (props: PropsType) => {
    const style = createStyles()

    return (
        <UIView style={[{ flex: 1 }, props?.style]} >
            <StatusBar
                animated={false}
                barStyle={props?.barStyle}
                translucent={true}
                backgroundColor="transparent"
            />


            {props.isList === true ? props?.children :
                <UIBUtton style={style.layout} activeOpacity={1} onPress={dismissKeyBoard}>
                    {props?.children}
                </UIBUtton>
            }
        </UIView>
    )
}

Container.defaultProps = {
    isList: false
};

export default memo(Container)