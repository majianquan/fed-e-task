const middleware = {}

middleware['authenenticated'] = require('..\\middleware\\authenenticated.js')
middleware['authenenticated'] = middleware['authenenticated'].default || middleware['authenenticated']

middleware['noAuthenticated'] = require('..\\middleware\\noAuthenticated.js')
middleware['noAuthenticated'] = middleware['noAuthenticated'].default || middleware['noAuthenticated']

export default middleware
