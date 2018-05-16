const User = require('../models/User')
const Project = require('../models/Project')
const Skill = require('../models/Skill')

const resolvers = {
  User: {
    skills(id) {
      return Skill.find({ _id: id.skills })
    }
  },
  Project: {
    users(id) {
      return User.find({ _id: id.users })
    },
    skills(id) {
      return Skill.find({ _id: id.skills })
    }
  },
  Query: {
    getUserByID(obj, args) {
      return User.findById(args.id)
    },
    getUserByUsername(obj, args) {
      return User.findOne({ username: args.username })
    },
    getUserByEmail(obj, args) {
      return User.findOne({ email: args.email })
    },
    getUsersBySkillID(obj, args) {
      return User.find({ skill: args.id })
    },
    getUsersBySkillName(obj, args) {
      return User.find({ skill: args.name })
    },
    getAllUsers() {
      return User.find({})
    },
    getProjectByID(obj, args) {
      return Project.findById(args.id)
    },
    getProjectByTitle(obj, args) {
      return Project.findOne({ title: args.title })
    },
    getAllProjects() {
      return Project.find({})
    },
    getAllSkills() {
      return Skill.find({})
    }
  },
  Mutation: {
    newUser: (obj, args) => {
      const user = new User({
        githubID: args.githubID,
        email: args.email,
        username: args.username,
        name: args.name,
        location: args.location,
        bio: args.bio,
        avatar_url: args.avatar_url,
        github_url: args.github_url,
        blog_url: args.blog_url,
        skills: args.skills
      })
      return user.save()
    },
    deleteUser: (obj, args) => {
      return User.findOneAndRemove({ _id: args.id })
    },
    addSkillToUser: (obj, args) => {
      return User.findById(args.userID).then(user => {
        user.skills.push(args.skillID)
        return user.save()
      })
    },
    newProject: (obj, args) => {
      const project = new Project({
        title: args.title,
        description: args.description,
        skills: args.skills,
        users: args.users,
        needsHelp: args.needsHelp
      })
      return project.save()
    },
    deleteProject: (obj, args) => {
      return Project.findOneAndRemove({ _id: args.id })
    },
    toggleUserInProject: (obj, args) => {
      return Project.findById(args.projectID).then(project => {
        // Check if the user is in this project
        const userFound = project.users.find(x => {
          return String(x) === String(args.userID)
        })
        // If the user is in this project, remove them from it
        if (userFound) {
          project.users.pull(args.userID)
          return project.save()
          // Else, add them to it
        } else {
          project.users.push(args.userID)
          return project.save()
        }
      })
    },
    toggleProjectNeedsHelp: (obj, args) => {
      return Project.findById(args.projectID).then(
        project => {
          if (project.needsHelp) {
            project.needsHelp = false
            return project.save()
          } else {
            project.needsHelp = true
            return project.save()
          }
        },
        { new: true }
      )
    },
    newSkill: (obj, args) => {
      const skill = new Skill({
        name: args.name
      })
      return skill.save()
    }
  }
}

module.exports = resolvers
