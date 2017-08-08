import * as Koa from 'koa'
import * as passport from 'koa-passport'
import * as logger from 'koa-logger'
import * as BodyParser from 'koa-bodyparser'
import router from './router'
import './auth'
const app = new Koa()

app
  .use(logger())
  .use(BodyParser())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(passport.initialize())

app.listen(3000)
