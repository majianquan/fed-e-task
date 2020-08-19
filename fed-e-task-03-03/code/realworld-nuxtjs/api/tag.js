
import {request} from '@/plugins/request';

// 登录
export const getTags = () => {
    return request({
        method: 'GET',
        url: '/api/tags',
    });
};
