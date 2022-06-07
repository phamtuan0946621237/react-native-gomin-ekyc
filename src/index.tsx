
import React, { useCallback } from 'react';
import App from './app';

interface DataCallbackDoneStepEkycType {
  dataSuccess: any,
  data_info_ekyc: any,
  ekyc: any
}

export const ekyc = (token: string, onDoneStepFullEkyc?: (value?: DataCallbackDoneStepEkycType) => void) => {
  const _onDoneStepFullEkyc = useCallback((value?: DataCallbackDoneStepEkycType) => {
    if (onDoneStepFullEkyc) onDoneStepFullEkyc(value)
  }, [onDoneStepFullEkyc])

  return (
    <App token={token} onDoneStepFullEkyc={_onDoneStepFullEkyc} />
  )
}