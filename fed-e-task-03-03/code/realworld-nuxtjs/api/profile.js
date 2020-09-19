
import {request} from '@/plugins/request';


export const getProfile = username => {
    return request({
        method: 'GET',
        url: `/api/profiles/${username}`,
    });
};
export const followUser = username => {
  return request({
    method: "POST",
    url: `/api/profiles/${username}/follow`
  })
}
export const unFollowUser = username => {
  return request({
    method: "DELETE",
    url: `/api/profiles/${username}/follow`
  })
}
