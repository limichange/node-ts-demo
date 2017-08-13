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

app.use(errorHandler())
app.use(compress())
app.use(logger())
app.use(helmet())
app.use(BodyParser())
app.use(passport.initialize())
app.use(router.routes())
app.use(responseTime())
app.listen(3000)
