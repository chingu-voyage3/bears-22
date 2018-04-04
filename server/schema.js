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

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: { type: GraphQLID },
    githubID: { type: GraphQLString },
    email: { type: GraphQLString },
    username: { type: GraphQLString },
    name: { type: GraphQLString },
    location: { type: GraphQLString },
    bio: { type: GraphQLString },
    avatar_url: { type: GraphQLString },
    github_url: { type: GraphQLString },
    blog_url: { type: GraphQLString }
  })
})

const ProjectType = new GraphQLObjectType({
  name: 'Project',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    skills: { type: new GraphQLList(GraphQLString) },
    //users: { type: new GraphQLList(GraphQLID) },
    users: {
      type: new GraphQLList(UserType),
      resolve(parent, args) {
        return parent.map(function(obj) {
          return User.findById(parent.id)
        })

        //Project.find({}).populate('users')
      }
    },
    needsHelp: { type: GraphQLBoolean }
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
    },
    getProjectByID: {
      type: ProjectType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Project.findOne({ _id: args.id })
      }
    },
    getProjectByTitle: {
      type: ProjectType,
      args: { title: { type: GraphQLString } },
      resolve(parent, args) {
        return Project.findOne({ title: args.title })
      }
    },
    getAllProjects: {
      type: new GraphQLList(ProjectType),
      resolve(parent, args) {
        return Project.find({}) // .populate('users')
      }
    }
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  fields: {
    addUser: {
      type: UserType,
      args: {
        githubID: { type: GraphQLString },
        email: { type: GraphQLString },
        username: { type: GraphQLString },
        name: { type: GraphQLString },
        location: { type: GraphQLString },
        bio: { type: GraphQLString },
        avatar_url: { type: GraphQLString },
        github_url: { type: GraphQLString },
        blog_url: { type: GraphQLString }
      },
      resolve(parent, args) {
        let user = new User({
          githubID: args.githubID,
          email: args.email,
          username: args.username,
          name: args.name,
          location: args.location,
          bio: args.bio,
          avatar_url: args.avatar_url,
          github_url: args.github_url,
          blog_url: args.blog_url
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
    },
    addProject: {
      type: ProjectType,
      args: {
        title: { type: GraphQLString },
        description: { type: GraphQLString },
        skills: { type: new GraphQLList(GraphQLString) },
        users: { type: new GraphQLList(GraphQLID) },
        needsHelp: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        let project = new Project({
          title: args.title,
          description: args.description,
          skills: args.skills,
          users: args.users,
          needsHelp: args.needsHelp
        })
        return project.save()
      }
    },
    toggleUserInProject: {
      type: ProjectType,
      args: {
        projectID: { type: GraphQLID },
        userID: { type: GraphQLID }
      },
      resolve(parent, args) {
        return Project.findOne(
          { _id: args.projectID },
          function(error, project) {
            if (error) return error
            // Check if user in project
            let foundUser = project.users.find(function(e) {
              return e == args.userID
            })
            // If user is in project, remove them from it
            if (foundUser) {
              project.users.pull(args.userID)
              project.save()
            } else {
              // If user is not in project, add them to it
              project.users.push(args.userID)
              project.save()
            }
          },
          { new: true }
        )
      }
    },
    toggleProjectNeedsHelp: {
      type: ProjectType,
      args: {
        id: { type: GraphQLID },
        needsHelp: { type: GraphQLBoolean }
      },
      resolve(parent, args) {
        return Project.findByIdAndUpdate(
          args.id,
          {
            $set: { needsHelp: args.needsHelp }
          },
          { new: true }
        )
      }
    },
    deleteProject: {
      type: ProjectType,
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
