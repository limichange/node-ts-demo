const bcrypt = require('bcryptjs')
const dbModels = require('../db/models')
const uuidV4 = require('uuid/v4')

const { Users } = dbModels

export default {
  async signIn(ctx) {
    const { phone, password } = ctx.request['body']

    await Users.findOne({
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

        ctx.body = {
          code: 200,
          data: {
            token
          }
        }
      } else {
        ctx.body = {
          code: 200
        }
      }
    })
  },
  async signUp(ctx) {
    const { phone, password } = ctx.request['body']

    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password, salt)

    // check
    if (!phone || !password) {
      ctx.body = {
        code: 400,
        msg: '缺少必要的参数'
      }
      return
    }

    // check
    const user = await Users.findOne({
      where: { phone }
    }).then(user => {
      return user
    })

    if (user) {
      ctx.body = {
        code: 400,
        msg: '这个手机号已经被注册过了'
      }
      return
    }

    // create
    await Users.create({
      password: hash,
      phone,
      nickname: '请设置你的昵称',
      salt,
      uuid: uuidV4()
    }).then((res) => {
      ctx.body = {
        code: 200
      }
    }).catch(e => {
      ctx.body = {
        code: 500
      }
    })
  },

  async signOut(ctx) {
    const { token } = ctx.request['body']

    await dbModels.Accesstokens.findOne({
      where: {
        token
      }
    }).then((token) => {
      return token.update({
        expires: 0
      })
    }).then(() => {
      ctx.body = {
        code: 200
      }
    })
  }
}
