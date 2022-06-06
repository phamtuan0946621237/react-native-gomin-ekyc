/*
 * Created by duydatpham@gmail.com on 14/09/2020
 * Copyright (c) 2020 duydatpham@gmail.com
 */
import { createClient } from 'react-fetching-library';

import { requestHostInterceptor } from './requestInterceptors/requestHostInterceptor';
import { responseInterceptor } from './responseIntercreptors';

// In real application this const will be stored in ENV's
// const HOST = 'https://private-34f3a-reactapiclient.apiary-mock.com';

export const Client = createClient({
  requestInterceptors: [requestHostInterceptor()],
  responseInterceptors: [responseInterceptor]
});