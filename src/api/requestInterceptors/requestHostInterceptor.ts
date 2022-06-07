/*
 * Created by duydatpham@gmail.com on 14/09/2020
 * Copyright (c) 2020 duydatpham@gmail.com
//  */
import _ from 'lodash';
import { getUniqueId } from 'react-native-device-info';
import CONFIG from '../../config';


// const { documentList: listDocument, getListDocumentAction,clearListDocument} = React.useContext(CommonContext)
export const requestHostInterceptor = () => () => async (action: any) => {
  // let token = '';
  // try {
  //   if (!!action.pToken) {
  //     token = action.pToken
  //   } else {
  //     token = 
      
  //     // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zdGFnaW5nLXNlcnZpY2UtY3VzdG9tZXIuZmlpbi52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1NDA5Nzc1MSwiZXhwIjoxNjU0NzAyNTUxLCJuYmYiOjE2NTQwOTc3NTEsImp0aSI6IkUzbFdTNnBmOHRPYXFIMWUiLCJzdWIiOjE1MiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSIsImRldmljZV9pZCI6IkEzODg3M0RFLTU2MEItNDg2Mi05NkFBLUExNDQ4NkFBM0VERiIsInBsYXRmb3JtX3R5cGUiOiJhcHAiLCJ1c2VyX2lkIjoxNTIsImNvZGUiOiJGaWluWF8wMDAxNTIiLCJwaG9uZSI6Iis4NDk0NjYyMTIzNyIsIm5hbWUiOm51bGwsImVtYWlsIjpudWxsLCJ0eXBlIjoibG9naW4ifQ.lFyNl58KARJuHiBZxgghjsyAYyS13CIIPRzphNC458M"
  //     // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zdGFnaW5nLXNlcnZpY2UtY3VzdG9tZXIuZmlpbi52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1NDIyNTE5MCwiZXhwIjoxNjU0ODI5OTkwLCJuYmYiOjE2NTQyMjUxOTAsImp0aSI6ImZpVmVYT3A2cmxFY1VYMGwiLCJzdWIiOjM2MCwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSIsImRldmljZV9pZCI6IkVBMjVGQ0ZGLThEMkQtNDFCOC1BQTZELTlBNjY3RUNENzA4QiIsInBsYXRmb3JtX3R5cGUiOiJhcHAiLCJ1c2VyX2lkIjozNjAsImNvZGUiOiJGaWluWF8wMDAzNjAiLCJwaG9uZSI6Iis4NDMyODY2MTQxMiIsIm5hbWUiOiJWXHUwMTY4IFRIXHUxZWNhIFNBTyBNQUkiLCJlbWFpbCI6Im1haS5maWluY3JlZGl0QGdtYWlsLmNvbSIsInR5cGUiOiJsb2dpbiJ9.CZqVDgXOJjjxyThGOHduuS67rNPcYkvL8mtuGRT8xL0"
  //     // 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJod…mQifQ.R_yw0A7_tzVWHxS29-4bxSCmj435-Y_em22D8Fhz9gQ'
  //     "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zdGFnaW5nLXNlcnZpY2UtY3VzdG9tZXIuZmlpbi52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1NDQ4MDQxNywiZXhwIjoxNjU1MDg1MjE3LCJuYmYiOjE2NTQ0ODA0MTcsImp0aSI6IkNtT1dERmM5WEVkejRGVDUiLCJzdWIiOjY2MSwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSIsImRldmljZV9pZCI6IkEzODg3M0RFLTU2MEItNDg2Mi05NkFBLUExNDQ4NkFBM0VERiIsInBsYXRmb3JtX3R5cGUiOiJhcHAiLCJ1c2VyX2lkIjo2NjEsImNvZGUiOiJHTV8wMDA2NjEiLCJwaG9uZSI6Iis4NDk3MzEzMDA1MSIsIm5hbWUiOm51bGwsImVtYWlsIjpudWxsLCJ0eXBlIjoibG9naW4ifQ.uKtfRPsdJUsabPcUj0KBSDIMIrYfvtdHtTePcSuMWV4"
     
  //   }

  // } catch (error) {
  //   console.log("requestHostInterceptor", error)
  // }

  let token = action.token
  // "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwOlwvXC9zdGFnaW5nLXNlcnZpY2UtY3VzdG9tZXIuZmlpbi52blwvYXBpXC9hdXRoXC9sb2dpbiIsImlhdCI6MTY1NDU2Njg5OSwiZXhwIjoxNjU1MTcxNjk5LCJuYmYiOjE2NTQ1NjY4OTksImp0aSI6IkY3eHk5Q0JKYWx4YWVVeG4iLCJzdWIiOjE1MiwicHJ2IjoiODdlMGFmMWVmOWZkMTU4MTJmZGVjOTcxNTNhMTRlMGIwNDc1NDZhYSIsImRldmljZV9pZCI6IkVBMjVGQ0ZGLThEMkQtNDFCOC1BQTZELTlBNjY3RUNENzA4QiIsInBsYXRmb3JtX3R5cGUiOiJhcHAiLCJ1c2VyX2lkIjoxNTIsImNvZGUiOiJGaWluWF8wMDAxNTIiLCJwaG9uZSI6Iis4NDk0NjYyMTIzNyIsIm5hbWUiOm51bGwsImVtYWlsIjpudWxsLCJ0eXBlIjoibG9naW4ifQ.KPKouUsIdLfEtT-NHemNP7Yhxex6akaqWSaK5m_pTiQ"
  

  let body = action.body
  // console.log('header', body)
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

