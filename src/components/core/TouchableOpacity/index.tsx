/**
* Created by duydatpham@gmail.com on Tue Oct 23 2018
* Copyright (c) 2018 duydatpham@gmail.com
*/
import _ from 'lodash';
import React, { PureComponent } from 'react';
import { Keyboard, TouchableOpacityProps,TouchableOpacity } from 'react-native';

interface TouchableProps extends TouchableOpacityProps {
    refThis?: (item: any) => {}
}
const UIButton : any = TouchableOpacity

export default class extends PureComponent<TouchableProps> {
    __onPress = () => {
        if (this.props.onPress) {
            this.props.onPress(this as any)
        }
    }
    throttlePress = _.throttle(this.__onPress, 500, { 'trailing': false });
    render() {
        const {
            onPress, children,
            refThis,
            ...rest
        } = this.props
        return (
            <UIButton
                activeOpacity={0.8}
                {...rest}
                ref={!!refThis ? (_btn : any) => refThis(_btn) : undefined}
                onPress={() => {
                    Keyboard.dismiss()
                    this.throttlePress()
                }}
            >
                {children}
            </UIButton>
        )
    }
}