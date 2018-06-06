const passport = require('passport')
const githubStrategy = require('passport-github2')
const User = require('../models/User')

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id)
    .populate('skills')
    .then(user => {
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
      console.log(profile)
      // passport callback function
      // check if user already exists
      User.findOne({ githubID: profile.id }).then(currentUser => {
        if (currentUser) {
          // If found
          console.log('Logged in as: ', currentUser)
          done(null, currentUser)
        } else {
          // If not, create user
          console.log('New profile:', profile)
          new User({
            githubID: profile._json.id,
            email: profile._json.email,
            username: profile._json.login,
            name: profile._json.name,
            location: profile._json.location,
            bio: profile._json.bio,
            avatar_url: profile._json.avatar_url,
            github_url: profile._json.html_url,
            blog_url: profile._json.blog
          })
            .save()
            .then(newUser => {
              console.log('New user created: ' + newUser)
              done(null, newUser)
            })
        }
      })
    }
  )
)
