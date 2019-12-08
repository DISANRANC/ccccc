import httpAxios from '../../config/axios';
import qs from 'qs';
export default {
    httpLogin (params) {
        return httpAxios.post('/api/a/login', qs.stringify(params));
    },
    
};