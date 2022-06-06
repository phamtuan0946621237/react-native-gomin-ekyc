import React from 'react';
import Svg, { Line } from 'react-native-svg';
import { UIView } from '../../../theme/element';
const UISvg: any = Svg
const UILine: any = Line
class HorizontalDashedLine extends React.PureComponent<HorizontalDashedLineProps> {

    static defaultProps = {
        color: "black",
        width: 4,
        space: 3,
        style: {},
        height: 5
    }

    state = {
        widthContainer: 0
    }
    onLayout = (event: any) => {
        const { width } = event.nativeEvent.layout;

        this.setState({ widthContainer: width });
    }
    render() {
        const { widthContainer } = this.state
        const { color, width, space, style, height } = this.props
        return (
            <UIView style={style} onLayout={this.onLayout} >
                <UISvg width={widthContainer} height={height} style={{ alignSelf: 'center' }}>
                    <UILine
                        stroke={color}
                        strokeDasharray={`${height}, ${space}`}
                        strokeWidth={width}
                        x1="0"
                        y1="0"
                        x2={widthContainer}
                        y2="0"
                    />
                </UISvg>
            </UIView>
        );
    }
}

interface HorizontalDashedLineProps {
    /**
     * Color of line
     */
    color: string,
    /**
     * width of line
     */
    width: number,
    /**
     * space of dash
     */
    space: number,
    style: any,
    /**
     * height of line
     */
    height: number
}

export default HorizontalDashedLine