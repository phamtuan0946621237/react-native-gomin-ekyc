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
    img?: any,
    type?: any,
    img_request : any
  },
  image_back?: {
    img?: any,
    type?: any,
    img_request : any
  },
  image_video?: {
    img?: any,
    type?: any,
    img_request : any
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

  console.log("ekyc_context_libb ::",ekyc)

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
