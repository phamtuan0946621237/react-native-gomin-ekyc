
export const checkIdentify = (
    formValues: any
): any => {
    return {
        method: 'POST',
        endpoint: '/api/v1/user/ocr',
        body: formValues,
        token : formValues?.token,
        headers: { 
            //'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'multipart/form-data',
            "Accept": "application/json",
        }
    }
};

export const checkVideoEkyc = (
    formValues: any
): any => {
    return {
        method: 'POST',
        endpoint: '/api/v1/user/ekyc',
        body: formValues,
        token : formValues?.token,
        headers: { 
            //'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'multipart/form-data',
            "Accept": "application/json",
        }
    }
};








