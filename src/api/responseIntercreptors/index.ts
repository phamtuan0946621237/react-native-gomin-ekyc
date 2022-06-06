// import React from 'react'
import { showMessage } from 'react-native-flash-message';


export const responseInterceptor = () => async (action: any, response: any) => {
    console.log("request__________lib:::", action)
    console.log("resss_____Lib:::", response)
    if (response.payload) {
        if (!!response.payload?.exception) {
            showMessage({
                type: 'danger',
                message: response.payload?.message
            })
            return
        }
        if (response?.payload?.success === false) {
            try {
                let payload = response.payload
                switch (payload?.code) {
                    case 401:
                        // _logout(payload)

                        break;
                    case 500:
                        // showMessage({
                        //     type : 'danger',
                        //     message : payload?.message
                        // })
                        break;
                    default:
                        break;
                }
            } catch (error) {
                // showMessage({
                //     type : 'danger',
                //     message : "Đã có lỗi xảy ra vui lòng thử lại"
                // })
            }
        }
        return {
            ...response,
            payload: response.payload
        };
    }

    return response;
};