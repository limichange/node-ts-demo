import * as Router from 'koa-router'
import * as db from '../db/models'
import * as BodyParser from 'koa-bodyparser'
import passport from '../auth'
import account from './account'

const router: Router = new Router({
  prefix: '/api'
})

router.post('/', async ctx => {
  return passport.authenticate('bearer', { session: false }, (err, user, info, status) => {
    if (user === false) {
      ctx.body = { success: false }
      ctx.throw(401)
    } else {
      ctx.body = { success: true }
    }
  })(ctx)
})

router.post('/account/signIn', account.signIn)
router.post('/account/logout', async ctx => {
  ctx.body = {
    code: 200
  }
})

router.post('/account/signUp', account.signUp)

export default router
