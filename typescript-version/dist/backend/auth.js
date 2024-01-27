import "dotenv/config.js";
import passport from 'passport';
import passportGoogle from 'passport-google-oauth2';
const GoogleStrategy = passportGoogle.Strategy;
let GOOGLE_CLIENT_ID = '938068753931-74grtgna4elvj6q8qcq18huatu8ld2ao.apps.googleusercontent.com';
let GOOGLE_CLIENT_SECRET = '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';
passport.use(new GoogleStrategy({
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/google/callback",
    passReqToCallback: true
}, function (request, accessToken, refreshToken, profile, done) {
    if (typeof done === 'function') {
        return done(null, profile);
    }
}));
passport.serializeUser(function (user, done) {
    done(null, user);
});
passport.deserializeUser(function (user, done) {
    if (typeof user === 'object') {
        done(null, user);
    }
});
