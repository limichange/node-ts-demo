import * as passport from 'koa-passport'
import * as BearerStrategy from 'passport-http-bearer'

passport.use(new BearerStrategy(
  function (token, done) {
    // User.findOne({ token: token }, function (err, user) {
    //   if (err) { return done(err); }
    //   if (!user) { return done(null, false); }
    //   return done(null, user, { scope: 'all' });
    // });
    return done(null, { username: 'houyao' }, { scope: 'all' })
  }
));

export default passport
