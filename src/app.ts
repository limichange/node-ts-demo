import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as BodyParser from 'koa-bodyparser'
import * as helmet from 'koa-helmet'
import passport from './auth'
import router from './router'
const app = new Koa()

app
  .use(logger())
  .use(BodyParser())
  .use(helmet())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(passport.initialize())

app.listen(3000)
