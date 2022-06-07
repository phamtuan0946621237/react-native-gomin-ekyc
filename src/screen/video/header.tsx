import { useNavigation } from '@react-navigation/native'
import React, { memo } from 'react'
import { Image } from 'react-native'
import { } from 'react-native-svg'
import { back_white_ic } from '../../../assets'
import { UIBUtton, UIView } from '../../theme/element'
import { createStyles } from './style'
const Header = () => {
  const style = createStyles()
  const navigation = useNavigation()

  return (
    <UIView style={style.header}>
      <UIBUtton style={style.iconBack} onPress={() => navigation.navigate("VideoTutorial")}>
        <Image source={back_white_ic} style={style.icon24} />
      </UIBUtton>
      <UIView style={style.iconBack} />
    </UIView>
  )
}

export default memo(Header)