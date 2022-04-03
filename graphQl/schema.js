import {
  gql
} from 'apollo-server';

const typeDefs = gql `

  type Employee{
    id: ID
    name: String
    lastName: String
    email: String
    nationality: String
    phone: String
    civilStatus: String
    birthday: String
  }

  type User{
    id: ID
    name: String
    lastName: String
    user: String
    password: String
    created_at: String
  }

  type Token{
    token: String
  }

  # Inputs

  input EmployeeInput{    
    name: String!
    lastName: String!
    email: String!
    nationality: String!
    phone: String!
    civilStatus: String!
    birthday: String!
  }

  input EditEmployeeInput{
    name: String!
    lastName: String!
    email: String!
    phone: String!
  }

  input UsuarioInput{
    name: String!
    lastName: String!
    user: String!
    password: String!
  }

  input AuthInput{
    user: String
    password: String
  }

  # Get Data Equals select from sql
  
  type Query {
    #Auth
    getUser: User

    # Employee
    getEmployees: [Employee] 
    getEmployeesById(id: ID!): Employee
  }

  # Create, update and delete data
  type Mutation {

    #Auth
    authUser(input: AuthInput): Token

    # User
    newUser(input: UsuarioInput): User

    # Employee
    newEmployee(input: EmployeeInput): Employee
    editEmployee(id: ID!, input: EditEmployeeInput): Employee
    deleteEmployee(id: ID!): String
  }

`;

export default typeDefs;