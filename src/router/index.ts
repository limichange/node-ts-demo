import * as Router from 'koa-router'
import * as db from '../db/models'
import auth from '../auth'
const router = new Router()

router.get('/', async ctx => {
  ctx.body = auth.createToken({
    user: 'houyao'
  })
})

export default router
