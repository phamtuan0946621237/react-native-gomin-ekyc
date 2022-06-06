import React, { PureComponent } from 'react';
import {
  Dimensions,
  Platform, StyleSheet,
  TextStyle, View
} from 'react-native';
import Modal from 'react-native-modal';
import { UIBUtton, UILabel, UIScrollView, UIView } from '../../../theme/element';

const SCREEN = Dimensions.get('window');
const width = SCREEN.width;
const HeightActionSheet = 52;
const isAndroid = Platform.OS == 'android';

const styles = StyleSheet.create({
  modal: {
    width: Math.min(400, width - 40),
    borderRadius: 12,
    justifyContent: 'flex-end',
    backgroundColor: 'transparent',
    overflow: 'hidden',
    position: undefined,
    right: undefined,
    bottom: undefined,
  },
  viewTop: {
    borderRadius: 12,
    //backgroundColor: Platform.OS === "ios" ? "transparent" : "#585C7C",
    overflow: 'hidden'
  },
  containerTitle: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(225, 255, 255, 0.1)',
    paddingBottom: 12
  },
  txtTitle: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500',
    marginTop: 12,
  },
  txtMessage: {
    color: 'black',
    marginBottom: 10,
    marginTop: 4,
    fontSize: 13
  },
  containerMiddle: {

  },
  viewOption: {
    height: HeightActionSheet,
    // marginTop: StyleSheet.hairlineWidth,
  },
  btnOptions: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: "white"
  },
  txtOptions: {
    color: "#0b1525",
    fontSize: 16,
  },
  viewSeparator: {
    height: 1,
    backgroundColor: "#ebeef3"
  },
  btnBottom: {
    height: HeightActionSheet,
    borderRadius: 12,
    overflow: 'hidden',
    backgroundColor: "white",
    marginTop: 12,
    marginBottom: 0
  },
  txtBottom: {
    color: 'red',
    fontSize: 16,
    fontWeight: 'bold'
  },
  viewContentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    alignSelf: 'flex-start'
  },
  iconLeft: {
    marginHorizontal: 16
  },
  iconCheck: {
    position: 'absolute',
    right: 12,
    alignSelf: 'center'
  },
  absolute: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  viewButtonBottom: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: "white",
  }
})

interface ActionSheetState {
  showModal?: boolean;
}

class ActionSheet extends PureComponent<Props, ActionSheetState> {

  static defaultProps = {
    options: [
      { title: 'title1' },
      { title: 'title2' },
      { title: 'title3' },
    ],
    renderOption: undefined,
    renderCheckSelect: false,
    checkSelect: 0,
    defaultWidth: false,
    widthActionSheet: Math.min(400, width - 40)
  }

  private heightModal?: number;
  private timoutPressButton?: any;

  constructor(props: Props) {
    super(props)
    this.heightModal = undefined,
      this.state = {
        showModal: false
      }
  }

  componentWillReceiveProps(nextProps: Props) {
    if (nextProps.isOpen !== this.props.isOpen) {
      this.setState({
        showModal: nextProps.isOpen
      })
    }
  }

  componentWillUnmount() {
    if (this.timoutPressButton) {
      clearTimeout(this.timoutPressButton)
    }
  }

  handlePressBottomButton() {
    this.hide()
  }

  _dismissModal() {
    this.hide()
  }

  show = () => {
    this.setState({
      showModal: true
    })
  }

  hide = () => {
    this.setState({
      showModal: false
    }, () => {
      this.props.onHide && this.props.onHide()
    })
  }

  renderItem = ({ item, index }: { item?: any, index?: number }) => {
    const { renderOption, options } = this.props;

    return (
      <UIView key={`index_${index}`} style={styles.viewOption}>
        <UIBUtton
          style={renderOption ? { flex: 1 } : styles.btnOptions}
          activeOpacity={0.8}
          onPress={() => {
            this._dismissModal();

            if (this.timoutPressButton) {
              clearTimeout(this.timoutPressButton)
            }

            this.timoutPressButton = setTimeout(() => {
              requestAnimationFrame(() => {
                item.onPress(item)
              })
            }, 350)
          }}
        >
          {!!renderOption && renderOption(item)}
          {
            !renderOption && (
              <UILabel numberOfLines={1} style={[styles.txtOptions, item.style]}>
                {(typeof item.title == 'string') ? item.title : item.title()}
              </UILabel>)
          }

        </UIBUtton>
        {
          (options || []).length > 1 && (
            <View style={styles.viewSeparator} />
          )
        }
      </UIView>
    )
  }

  render() {
    let {
      title,
      message,
      options,
      titleStyle,
      messageStyle,
      bottomTitle,
      bottomStyle,
      renderTitle,
      renderBottomButton,
      renderOption,
      isOpen,
      renderCheckSelect,
      checkSelect,
      colorCheckSelect,
      widthActionSheet,
      defaultWidth,
      ...otherProps
    } = this.props
    const renderTitleTop = (
      <UIView style={styles.containerTitle}>
        <UILabel numberOfLines={1} style={[styles.txtTitle, titleStyle ? titleStyle : undefined]}>
          {!!title ? ((typeof title == 'string') ? title : title()) : ''}
        </UILabel>
        {
          message ? (
            <UILabel numberOfLines={1} style={[styles.txtMessage, messageStyle ? messageStyle : undefined]}>
              {message}
            </UILabel>
          ) : null
        }
      </UIView>
    )

    const renderMiddle = (
      <UIScrollView style={{ maxHeight: Math.min(500, SCREEN.height - 100) }}>
        {
          (options || []).map((item, index) => {
            return this.renderItem({ item, index })
          })
        }
      </UIScrollView>
    )

    const renderBottomTitle = (
      <UIBUtton
        style={styles.btnBottom}
        activeOpacity={0.8}
        onPress={this.handlePressBottomButton.bind(this)}
      >
        {
          isAndroid && <UIView style={[styles.absolute, { backgroundColor: 'rgba(0, 0, 0, 0.4)' }]} />
        }
        <UIView style={styles.viewButtonBottom}>
          <UILabel numberOfLines={1} style={[styles.txtBottom, bottomStyle ? bottomStyle : undefined]}>
            {(typeof bottomTitle == 'string') ? bottomTitle : bottomTitle()}
          </UILabel>
        </UIView>
      </UIBUtton>
    )

    return (
      <Modal
        style={[styles.modal, { height: this.heightModal }, defaultWidth ? { width: widthActionSheet } : undefined]}
        isVisible={this.state.showModal}
        hideModalContentWhileAnimating
        useNativeDriver
        onBackdropPress={this.hide}
        animationOutTiming={200}
        {...otherProps}
      >
        <UIView
          onLayout={(evt: any) => {
            this.heightModal = evt.nativeEvent.layout.height
          }}
        >
          <UIView style={styles.viewTop}>
            {
              isAndroid && <View style={[styles.absolute, { backgroundColor: 'rgba(0, 0, 0, 0.4)' }]} />
            }
            {
              renderTitle ? renderTitle : title ? renderTitleTop : null
            }

            {
              this.props.renderMiddle ? this.props.renderMiddle() : options ? renderMiddle : null
            }
          </UIView>
          {
            renderBottomButton ? renderBottomButton : bottomTitle ? renderBottomTitle : null
          }
        </UIView>
      </Modal>
    )
  }
}


type OptionStatic = Array<{
  // title?: string;
  onPress?: () => void;
  style?: TextStyle;
}>

interface Props {
  title?: any;
  message?: string;
  options?: OptionStatic;
  titleStyle?: TextStyle;
  messageStyle?: TextStyle;
  bottomTitle?: any;
  bottomStyle?: TextStyle;
  renderTitle?: any;
  renderBottomButton?: any;
  renderOption?: (item: any) => void;
  isOpen?: boolean;
  renderCheckSelect?: boolean;
  checkSelect?: number;
  colorCheckSelect?: string;
  onHide?: () => void;
  renderMiddle?: () => void;
  widthActionSheet?: number,
  defaultWidth?: boolean;
}

export default ActionSheet