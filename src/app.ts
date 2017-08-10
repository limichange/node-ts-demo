import * as Koa from 'koa'
import * as logger from 'koa-logger'
import * as BodyParser from 'koa-bodyparser'
import * as helmet from 'koa-helmet'
import * as compress from 'koa-compress'
import * as errorHandler from 'koa-error'
import * as responseTime from 'koa-response-time'
import passport from './passport'
import router from './router'
const app = new Koa()

app
  .use(errorHandler())
  .use(compress())
  .use(logger())
  .use(BodyParser())
  .use(helmet())
  .use(passport.initialize())
  .use(router.routes())
  .use(router.allowedMethods())
  .use(responseTime())

app.listen(3000)
