import * as jwt from 'jsonwebtoken'

const secret: string = 'secret'

export default {
  createToken (data: Object) {
    return jwt.sign(data, secret, {
      expiresIn: '30d'
    })
  },
  verifyToken (token: string) {
    return jwt.verify(token, secret)
  }
}
