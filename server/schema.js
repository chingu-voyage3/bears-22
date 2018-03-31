const graphql = require('graphql')
const User = require('./User')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull
} = graphql

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    githubID: { type: GraphQLString },
    username: { type: GraphQLString },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    bio: { type: GraphQLString },
    linkedin_url: { type: GraphQLString },
    portfolio_url: { type: GraphQLString },
    website_url: { type: GraphQLString },
    twitter_url: { type: GraphQLString },
    blog_url: { type: GraphQLString },
    city: { type: GraphQLString },
    country: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getUserByID: {
      type: UserType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findOne({ _id: args.id })
      }
    },
    getUserByUsername: {
      type: UserType,
      args: { username: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findOne({ username: args.username })
      }
    },
    getAllUsers: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return User.find({})
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser: {
      type: UserType,
      args: { githubID: { type: GraphQLString } },
      resolve(parent, args) {
        let user = new User({
          githubID: args.githubID
        })
        return user.save()
      }
    },
    deleteUser: {
      type: UserType,
      args: { githubID: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findOneAndRemove({ githubID: args.githubID })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})
