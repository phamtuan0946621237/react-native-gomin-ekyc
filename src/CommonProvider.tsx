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
  setEkyc ?: (value : any) => void,
  saveInfoEkyc ?: (value : any) => void
};

 interface EkycType {
  image_front?: {
    img?: string,
    type?: string
  },
  image_back?: {
    img?: string,
    type?: string
  },
  image_video?: {
    img?: string,
    type?: string
  }
}

const initStateEkyc : EkycType= {
    image_front: {
      img: undefined,
      type: undefined
    },
    image_back: {
      img: undefined,
      type: undefined
    },
    image_video: {
      img: undefined,
      type: undefined
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
  const _setEkyc = useCallback((value : string) => {
    setEkyc((pre : any) => {
      return {
        ...pre,
        value
      }
    })
  },[])
  const _saveInfoEkyc = useCallback((value) => {
    setDataInfoEkyc((pre : any) => {
      return {
        ...pre,
        value
      }
    })
  },[])

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
