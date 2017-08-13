import * as Router from 'koa-router'
import * as db from '../db/models'
import * as BodyParser from 'koa-bodyparser'
import passport from '../passport'

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

router.get('/', async ctx => {
  ctx.body = 'index'
})

router.post('/account/login', async ctx => {
  const { username, password } = ctx.request['body']
  ctx.body = {
    code: 200,
    data: { username, password }
  }
})

router.post('/account/logout', async ctx => {
  ctx.body = {
    code: 200
  }
})

router.post('/account/register', async ctx => {
  ctx.body = {
    code: 200
  }
})

export default router
