import * as jwt from 'jsonwebtoken'

const secret: string = 'secret'

export default {
  createToken (uuid: string) {
    return jwt.sign({ uuid }, secret, {
      expiresIn: '30d'
    })
  },
  verifyToken (token: string) {
    return jwt.verify(token, secret)
  }
}
