import * as Koa from 'koa'
import * as Router from "koa-router"
const router = new Router()
const app = new Koa()

router.get('/', async ctx => {
  ctx.body = 'Hello World'
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(3000)
