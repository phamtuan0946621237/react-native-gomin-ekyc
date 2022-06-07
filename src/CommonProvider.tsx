import React, { useState, useCallback } from 'react';
// import { EkycType } from './type/index'
type ContextProps = {
  access_token?: string,
  data_info_ekyc?: {
    imgFront?: any,
    imgBack?: any,
    imgVideo?: any
  },
  ekyc: EkycType,
  setEkyc ?: (value : EkycType) => void,
  saveInfoEkyc ?: (value : any) => void
};

 interface EkycType {
  image_front?: {
    img?: any,
    type?: any,
    img_request ?: any
  },
  image_back?: {
    img?: any,
    type?: any,
    img_request ?: any
  },
  image_video?: {
    img?: any,
    type?: any,
    img_request ?: any
  }
}


const initStateEkyc : EkycType= {
    image_front: {
      img: undefined,
      type: undefined,
      img_request : undefined
    },
    image_back: {
      img: undefined,
      type: undefined,
      img_request : undefined
    },
    image_video: {
      img: undefined,
      type: undefined,
      img_request : undefined
    }
}
const initInfoEkyc = {
  imgFront: undefined,
  imgBack: undefined,
  imgVideo:undefined
}

export const CommonContext = React.createContext<Partial<ContextProps>>({});

export const CommonProvider = ({ children, token }: any) => {
  const [ekyc, setEkyc] = useState<EkycType>(initStateEkyc)
  const [data_info_ekyc, setDataInfoEkyc] = useState(initInfoEkyc)
  const _setEkyc = useCallback((value : EkycType) => {
    setEkyc(value)
  },[])
  const _saveInfoEkyc = useCallback((value) => {
    console.log("value :::",value)
    setDataInfoEkyc(value)
  },[])

  console.log("data_info_ekyc_context_lib :::::",data_info_ekyc)

  return (
    <CommonContext.Provider
      value={{
        access_token: token,
        setEkyc : _setEkyc,
        saveInfoEkyc : _saveInfoEkyc,
        ekyc,
        data_info_ekyc
      }}>
      {children}
    </CommonContext.Provider>
  );
};
