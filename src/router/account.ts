const bcrypt = require('bcryptjs')
const secret = 'blog.limichange.com'
const dbModels = require('../db/models')
const uuidV4 = require('uuid/v4')

export default {
  signIn(req, res, next) {
    const { password, phone } = req.body

    dbModels.Users.findOne({
      where: {
        phone
      }
    })
    .then((user) => {
      if (bcrypt.compareSync(password, user.password)) {
        const token = uuidV4()

        dbModels.Accesstokens.create({
          token,
          user_id: user.id,
          expires: (Date.now() + 1000 * 60 * 60 * 60)
        })

        res.json({
          token,
          msg: 'ok'
        })
      } else {
        res.json({
          msg: 'no'
        })
      }
    })
  },
  async signUp(ctx) {
    const { phone, password } = ctx.request['body']

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    await dbModels.Users.create({
      password: hash,
      phone,
      nickname: '请设置你的昵称',
      salt,
      uuid: uuidV4()
    }).then((res) => {
      console.log(res)
      ctx.body = {
        code: 200
      }
    }).catch(e => {
      ctx.body = {
        code: 500
      }
    })
  },

  signOut(req, res, next) {
    const { token } = req.user

    dbModels.Accesstokens.findOne({
      where: {
        token
      }
    }).then((token) => {
      return token.update({
        expires: 0
      })
    }).then(() => {
      res.json({
        msg: 'ok'
      })
    })
  }
}
