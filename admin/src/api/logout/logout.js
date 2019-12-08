import httpAxios from '@/config/axios.js';
import qs from 'qs';
export default {
     logoutHttp(params) {
        return httpAxios.post('/api/a/logout', qs.stringify(params));
    }
}