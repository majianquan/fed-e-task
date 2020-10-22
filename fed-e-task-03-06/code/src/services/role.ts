import request from '@/utils/request'

export const getAllRole = () => {
  return request({
    method: 'GET',
    url: '/boss/role/all'
  })
}

export const addOrUpdateRole = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/role/saveOrUpdate',
    data
  })
}

export const removeRole = (id: string | number) => {
  return request({
    method: 'DELETE',
    url: `/boss/role/${id}`
  })
}
