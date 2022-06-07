
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ClientContextProvider } from 'react-fetching-library';
import { ActivityIndicator } from 'react-native';
import ModalApp from 'react-native-modal';
import { Client } from './api/Client';
import { CommonProvider } from './CommonProvider';
import Navigation from './navigation';
import { UIView } from './theme/element';

export declare const global: {
  showLoading: (isShow: boolean) => void | null;
};


const AppLoading = () => {
  const [isShowLoading, setIsShowLoading] = useState<boolean>(false);

  useEffect(() => {
    global.showLoading = (isShow: boolean) => {
      setIsShowLoading(isShow);
    };
  }, []);

  return (
    <ModalApp
      isVisible={isShowLoading}
      animationIn="fadeIn"
      animationOut="fadeOut"
    >
      <UIView style={[{ flex: 1, justifyContent: 'center' }]}>
        <ActivityIndicator
          animating={true}
          color={"white"}
          size="large"
          hidesWhenStopped={true}
        />
      </UIView>
    </ModalApp>
  );
};

interface DataCallbackDoneStepEkycType {
  dataSuccess: any,
  data_info_ekyc: any,
  ekyc: any
}

interface Propype {
  token: string,
  onDoneStepFullEkyc?: (value?: DataCallbackDoneStepEkycType) => void
}

export default (props: Propype) => {
  const [state, setState] = useState(props?.token)
  useMemo(() => {
    if (!props?.token) return
    setState(props?.token)
  }, [props?.token])

  const _onDoneStepFullEkyc = useCallback((value?: DataCallbackDoneStepEkycType) => {
    if (!!props?.onDoneStepFullEkyc) props?.onDoneStepFullEkyc(value)
  }, [props?.onDoneStepFullEkyc])

  return (
    <>
      <ClientContextProvider client={Client}>
        <CommonProvider token={state} onDoneStepFullEkyc={_onDoneStepFullEkyc}>
          <Navigation />
        </CommonProvider>
      </ClientContextProvider>
      <AppLoading />
    </>
  )
}
