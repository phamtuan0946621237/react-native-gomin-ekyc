import React, { memo, useCallback } from 'react'
import { Image } from 'react-native'
import { } from 'react-native-svg'
import { camera_ic } from '../../../assets'
import { styleText } from '../../theme'
import { UILabel, UIView } from '../../theme/element'

interface PropsType {
    open: () => void
}
const OpenPermission = (props?: PropsType) => {

    const _open = useCallback(() => {
        if (!!props?.open) props?.open()
    }, [props?.open])

    return (
        <UIView style={{ flexDirection: "column", flex: 1, alignItems: 'center', justifyContent: 'center', }}>
            <Image source={camera_ic} style={{ width: 100, height: 100 }} />
            <UILabel style={[styleText.blackBlod16, { marginTop: 48 }]}>Hãy bật quyền truy cập Camera</UILabel>
            <UILabel style={[styleText.mainBold16, { padding: 16 }]} onPress={_open}>Tại đây</UILabel>
        </UIView>
    )
}

export default memo(OpenPermission)