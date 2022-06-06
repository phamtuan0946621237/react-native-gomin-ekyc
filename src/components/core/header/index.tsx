/**
* Created by duydatpham@gmail.com on Tue Oct 23 2018
* Copyright (c) 2018 duydatpham@gmail.com
*/
import React from 'react'
import { UIBUtton, UILabel, UIView } from '../../../theme/element'
import Icon from 'react-native-vector-icons/MaterialIcons'
import { HeaderSize } from '../../../util'

interface ActionProps {
    title?: string;
    onPress?: () => void;
    titleStyle?: any;
    iconName?: string;
    style?: any;
    render?: () => {}
}

interface HeaderProps {
    hasShadow?: boolean;
    style?: any;
    titleStyle?: any;
    renderLeft?: () => {};
    renderTitle?: () => {};
    renderRight?: () => {};
    left?: ActionProps;
    right?: ActionProps;
    title?: string;
}


export default (props: HeaderProps) => {
    const { hasShadow, style, left, right, titleStyle, title, renderTitle } = props
    let header = (<UIView style={[{
        backgroundColor: 'transparent',
        borderBottomColor: 'transparent',
        alignItems: 'center',
        paddingTop: HeaderSize.paddingTop,
        height: HeaderSize.height,
        flexDirection: 'row',
        width: '100%'
    }, style, hasShadow ? {
        position: 'absolute', top: 0, left: 0, right: 0, zIndex: 9999,
        backgroundColor: 'white',
        shadowColor: "rgba(0, 0, 0, 0.08)",
        shadowOffset: {
            width: 0,
            height: 4
        },
        shadowRadius: 8,
        shadowOpacity: 1,
        elevation: 4
    } : {}]}>
        <UIView style={{ flex: 1 }} >
            {
                props.renderLeft ? props.renderLeft() : (
                    !!left ? (
                        <UIBUtton onPress={left.onPress} style={{
                            height: '100%', paddingHorizontal: 16,
                            justifyContent: 'center',
                        }}  >
                            {
                                !!left.title ? <UILabel style={left.titleStyle} >{left.title || ''}</UILabel> : (
                                    left.iconName && <Icon style={[{ color: 'black', fontSize: 32 }, left.style]} name={left.iconName} />
                                )
                            }
                        </UIBUtton>
                    ) : undefined
                )
            }
        </UIView>
        {
            !!renderTitle && !!!title && <UIView style={{ flex: 2, alignItems: 'center' }} >
                {renderTitle()}
            </UIView>
        }
        {
            !!title && !!!renderTitle && <UIView style={{ flex: 2, alignItems: 'center' }} >
                <UILabel style={[{
                    fontSize: 16,
                    fontWeight: "600",
                    fontStyle: "normal",
                    letterSpacing: 0,
                    textAlign: "center",
                    color: "#34324c"
                }, titleStyle]}
                    numberOfLines={1}
                >
                    {title}
                </UILabel>
            </UIView>
        }
        <UIView style={{ flex: 1 }} >
            {
                props.renderRight ? props.renderRight() : (
                    !!right ? (
                        <UIBUtton onPress={right.onPress} style={{
                            height: '100%', paddingHorizontal: 16,
                            justifyContent: 'center',
                        }}  >
                            {
                                !!right.render ? right.render() : (
                                    !!right.title ? <UILabel style={right.titleStyle || {
                                        fontSize: 18,
                                        fontWeight: "500",
                                        fontStyle: "normal",
                                        letterSpacing: 0,
                                        textAlign: "center",
                                        color: "black"
                                    }} >{right.title || ''}</UILabel> : (
                                            right.iconName && <Icon style={[{ color: 'black', fontSize: 32 }, right.titleStyle]} name={right.iconName} />
                                        )
                                )
                            }
                        </UIBUtton>
                    ) : undefined
                )
            }
        </UIView>
    </UIView>)
    return header
}