import httpAxios from '../../config/axios';
import qs from 'qs';
export default {
    // 按条件获得article列表
    articleList (data) {
        console.log(data)
        return httpAxios.get('/api/a/article/search', { params: data });
    },
    // 修改article的上架/下架（status）
    putStatus (params) {
        return httpAxios.put('/api/a/u/article/status', qs.stringify(params));
    },
    // 编辑article
    putArticle (id,params) {
        return httpAxios.put(`/api/a/u/article/${id}`, qs.stringify(params));
    },
    // 新增article
    addArticle (params) {
        return httpAxios.post('/api/a/u/article', qs.stringify(params));
    },
    // 删除article
    deleteArticle (id) {
        return httpAxios.delete(`/api/a/u/article/${id}`);
    },
    // 获得单个article
    getArticle (id) {
        return httpAxios.get(`/api/a/article/${id}`);
    },
    // 上传图片
    uploadImg (params, config) {
        return httpAxios.post('/api/a/u/img/task', params, config);
    },
}