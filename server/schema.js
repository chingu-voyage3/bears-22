const graphql = require('graphql')
const User = require('./User')
const Project = require('./Project')

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLBoolean
} = graphql

const userType = new GraphQLObjectType({
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

const projectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    skills: { type: GraphQLString },
    help: { type: GraphQLBoolean },
    users: { type: GraphQLID }
  })
})

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    getUserByID: {
      type: userType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return User.findOne({ _id: args.id })
      }
    },
    getUserByUsername: {
      type: userType,
      args: { username: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findOne({ username: args.username })
      }
    },
    getAllUsers: {
      type: new GraphQLList(userType),
      resolve(parent, args) {
        return User.find({})
      }
    },
    getAllProjects: {
      type: new GraphQLList(projectType),
      resolve(parent, args) {
        return Project.find({})
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser: {
      type: userType,
      args: { githubID: { type: GraphQLString } },
      resolve(parent, args) {
        let user = new User({
          githubID: args.githubID
        })
        return user.save()
      }
    },
    deleteUser: {
      type: userType,
      args: { githubID: { type: GraphQLString } },
      resolve(parent, args) {
        return User.findOneAndRemove({ githubID: args.githubID })
      }
    },
    addProject: {
      type: projectType,
      args: { title: { type: GraphQLString } },
      resolve(parent, args) {
        let project = new Project({
          title: args.title
        })
        return title.save()
      }
    },
    deleteProject: {
      type: projectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findOneAndRemove({ _id: args.id })
      }
    }
  }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})
