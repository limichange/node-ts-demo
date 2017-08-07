import * as jwt from 'jsonwebtoken'

export default {
  createToken (uuid) {
    return jwt.sign({ uuid }, 'secret', {
      expiresIn: 1000
    })
  },
  verifyToken (token) {
    return jwt.verify(token, 'secret')
  }
}
