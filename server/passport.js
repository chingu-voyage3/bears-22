const passport = require('passport')
const githubStrategy = require('passport-github2')
const User = require('./User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user)
  })
})

passport.use(
  new githubStrategy(
    {
      // options for the github strategy
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: '/auth/github/redirect'
      // scope: ['user:email']
    },
    (accessToken, refreshToken, profile, done) => {
      // passport callback function
      // check if user already exists
      User.findOne({ githubId: profile.githubId }).then(currentUser => {
        if (currentUser) {
          // If found
          console.log('user is: ', currentUser)
          done(null, currentUser)
        } else {
          // If not, create user
          console.log('profile:', profile)
          new User({
            githubId: profile.githubId
          })
            .save()
            .then(newUser => {
              console.log('new user created: ' + newUser)
              done(null, newUser)
            })
        }
      })
    }
  )
)
