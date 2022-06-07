/*
 * Created by duydatpham@gmail.com on 14/09/2020
 * Copyright (c) 2020 duydatpham@gmail.com
//  */
import _ from 'lodash';
import { getUniqueId } from 'react-native-device-info';
import CONFIG from '../../config';


export const requestHostInterceptor = () => () => async (action: any) => {
  let token = action.token
  let body = action.body
  if (!!body && !(body instanceof FormData)) {
    body = _.omit(body, ['pToken'])
  }
  return {
    ...action,
    endpoint: `${!!action?.api_type ? (CONFIG as any)[action?.api_type] : CONFIG.API}${action.endpoint}`,
    headers: {
      ...(action.headers || {
        "Accept": 'application/json',
        'Content-Type': 'application/json',
      }),
      "platform-type": 'app',
      ...(!!token ? { 'Authorization': `Bearer ${token}` } : {}),
      'device-id': getUniqueId(),
      'X-App-Code': 'huvang',
    } as any,
    ...(!!body ? { body } : {}),

  };
};

