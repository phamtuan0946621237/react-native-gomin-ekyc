

export const updateDocument = (formValues : any): any => ({
    method: 'POST',
    api_type: 'API',
    endpoint: `/api/v1/user/document/update`,
    body: formValues,
});

export const getListDocumentTag = (token : string): any => {
    return ({
        method: 'GET',
        api_type: 'API',
        token ,
        endpoint: `/api/v1/user/document/`,
    })
};

export const uploadFile = (
    formValues: any
): any => {
    return {
        method: 'POST',
        endpoint: '/api/v1/user/upload',
        body: formValues,
        token : formValues?.token,
        headers: { 
            //'Content-Type': 'application/x-www-form-urlencoded'
            'Content-Type': 'multipart/form-data',
            "Accept": "application/json",
        }
    }
};

export const getProvinces = (token : string): any => ({
    method: 'GET',
    api_type: 'SCORE',
    token ,
    endpoint: `/api/internal/address/provinces`,
});
export const getDistrict = (token : string,code : any): any => ({
    method: 'GET',
    api_type: 'SCORE',
    token,
    endpoint: `/api/internal/address/districts?province_code=${code}`,
});


export const getWard = (token : string ,code : any): any => ({
    method: 'GET',
    api_type: 'SCORE',
    token,
    endpoint: `/api/internal/address/wards?district_code=${code}`,
});



