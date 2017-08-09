import * as Router from 'koa-router'
import * as db from '../db/models'
import passport from '../auth'

const router = new Router({
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

router.get('/', async ctx => {
  ctx.body = 'index'
})

export default router
