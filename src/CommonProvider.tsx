import React, { useState, useCallback } from 'react';
type ContextProps = {
  access_token?: string,
  data_info_ekyc?: DataInfoType,
  ekyc: EkycType,
  setEkyc?: (value: EkycType) => void,
  saveInfoEkyc?: (value: any) => void,
  onDoneEkyc?: (value?: DataCallbackDoneStepEkycType) => void
};

interface DataInfoType {
  imgFront?: any,
  imgBack?: any,
  imgVideo?: any
}

interface EkycType {
  image_front?: {
    img?: any,
    type?: any,
    img_request?: any
  },
  image_back?: {
    img?: any,
    type?: any,
    img_request?: any
  },
  image_video?: {
    img?: any,
    type?: any,
    img_request?: any
  }
}
export interface DataCallbackDoneStepEkycType {
    dataSuccess : any,
    data_info_ekyc : DataInfoType,
    ekyc : EkycType
  }



const initStateEkyc: EkycType = {
  image_front: {
    img: undefined,
    type: undefined,
    img_request: undefined
  },
  image_back: {
    img: undefined,
    type: undefined,
    img_request: undefined
  },
  image_video: {
    img: undefined,
    type: undefined,
    img_request: undefined
  }
}
const initInfoEkyc = {
  imgFront: undefined,
  imgBack: undefined,
  imgVideo: undefined
}

export const CommonContext = React.createContext<Partial<ContextProps>>({});

export const CommonProvider = ({ children, token, onDoneStepFullEkyc }: { token: string, onDoneStepFullEkyc?: (value?: DataCallbackDoneStepEkycType) => void, children?: Element }) => {
  const [ekyc, setEkyc] = useState<EkycType>(initStateEkyc)
  const [data_info_ekyc, setDataInfoEkyc] = useState(initInfoEkyc)
  const _setEkyc = useCallback((value: EkycType) => {
    setEkyc(value)
  }, [])
  const _saveInfoEkyc = useCallback((value) => {
    setDataInfoEkyc(value)
  }, [])

  const _onDoneStepFullEkyc = useCallback((value?: DataCallbackDoneStepEkycType) => {
    if (!!onDoneStepFullEkyc) onDoneStepFullEkyc(value)
  }, [onDoneStepFullEkyc])


  return (
    <CommonContext.Provider
      value={{
        access_token: token,
        setEkyc: _setEkyc,
        saveInfoEkyc: _saveInfoEkyc,
        ekyc,
        data_info_ekyc,
        onDoneEkyc: _onDoneStepFullEkyc
      }}>
      {children}
    </CommonContext.Provider>
  );
};
