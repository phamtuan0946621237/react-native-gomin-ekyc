import React from 'react';
import Svg, { Line } from 'react-native-svg';
import { UIView } from '../../../theme/element';
const UISvg: any = Svg
const UILine: any = Line
class VerticalDashedLine extends React.PureComponent<VerticalDashedLineProps> {
    static defaultProps = {
        color: "black",
        width: 4,
        space: 3,
        style: {},
        height: 5
    }
    state = {
        heightContainer: 0
    }
    onLayout = (event: any) => {
        const { height } = event.nativeEvent.layout;

        this.setState({ heightContainer: height });
    }
    render() {
        const { heightContainer } = this.state
        const { color, width, space, style, height } = this.props
        return (
            <UIView style={style} onLayout={this.onLayout} >
                <UISvg height={heightContainer} width={width} style={{ alignSelf: 'center' }}>
                    <UILine
                        stroke={color}
                        strokeDasharray={`${height}, ${space}`}
                        strokeWidth={width}
                        x1="0"
                        y1="0"
                        x2="0"
                        y2={heightContainer}
                    />
                </UISvg>
            </UIView>
        );
    }
}

interface VerticalDashedLineProps {
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

export default VerticalDashedLine