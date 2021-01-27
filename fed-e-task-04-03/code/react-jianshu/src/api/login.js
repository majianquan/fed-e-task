import request from '../util/request'

export const signUp = (params) => {
  return request.post('/users', { user: params })
}

export const signIn = (params) => {
  return request.post('/users/login', { user: params })
}
