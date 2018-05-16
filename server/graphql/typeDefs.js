const typeDefs = `

type User {
  id: ID
  githubID: String
  email: String
  username: String
  name: String
  location: String
  bio: String
  avatar_url: String
  github_url: String
  blog_url: String
  skills: [Skill]
}

type Project {
  id: ID
  title: String
  description: String
  skills: [Skill]
  users: [User]
  needsHelp: Boolean
}

type Skill {
  id: ID
  name: String
}

type Query {
  getUserByID(id: String!): User
  getUserByUsername(username: String!): User
  getUserByEmail(email: String!): User
  getUsersBySkillID(id: String!): [User]
  getUsersBySkillName(name: String!): [User]
  getAllUsers: [User]
  getProjectByID(id: String!): Project
  getProjectByTitle(title: String!): Project
  getAllProjects: [Project]
  getAllSkills: [Skill]
}

type Mutation {
  newUser(githubID: String, email: String, username: String, name: String, location: String, bio: String, avatar_url: String, github_url: String, blog_url: String): User
  deleteUser(id: String!): User
  addSkillToUser(skillID: String!, userID: String!): User
  newProject(title: String!, description: String!, users: String!, needsHelp: Boolean): Project
  deleteProject(id: String!): Project
  toggleUserInProject(projectID: String!, userID: String!): Project
  toggleProjectNeedsHelp(projectID: String!): Project
  newSkill(name: String!): Skill
}

`

module.exports = typeDefs

// add skills to newUser, newProject?
// addSkillToProject
