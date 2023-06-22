const jwt = require('jsonwebtoken')
const {secret} = require('../config/config')


module.exports = function (roles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }

        try {
            const authHeader = req.headers.authorization
            if (!authHeader) {
              return res.status(403).json({ message: 'Пользователь не авторизован' })
            }
            
            const token = authHeader.split(' ')[1]
            const { roles: userRoles } = jwt.verify(token, secret)
            
            const hasRole = userRoles.includes(role)
            if (!hasRole) {
              return res.status(403).json({ message: 'У вас нет доступа' })
            }
            
            next()
          } catch (error) {
            return res.status(403).json({ message: 'Пользователь не авторизован' })
          }
          
    }
};
