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
    name: { type: GraphQLString }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    user: {
      type: UserType,
      args: { user: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findOne({ user: args.id })
      }
    },
    users: {
      type: UserType,
      resolve(parent, args) {
        return User.find({})
      }
    }
  }
})

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
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
  mutation: Mutation
})
