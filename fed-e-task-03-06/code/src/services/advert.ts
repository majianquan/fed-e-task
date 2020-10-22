import request from '@/utils/request'

interface Advert {
  name: string;
}

export const getAdList = (pageNum = 1, pageSize = 10) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList',
    data: {
      pageNum,
      pageSize
    }
  })
}

export const saveOrUpdate = (data: Advert) => {
  return request({
    method: 'POST',
    url: '/front/ad/saveOrUpdate',
    data
  })
}

export const getEditAdvertInfo = (id: number) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdvertById',
    params: {
      id
    }
  })
}

export const updateStatus = (id: number, status: number) => {
  return request({
    method: 'GET',
    url: '/front/ad/updateStatus',
    params: {
      id,
      status
    }
  })
}
