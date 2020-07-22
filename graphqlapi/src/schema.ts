import { nexusPrismaPlugin } from 'nexus-prisma'
import { makeSchema, objectType, inputObjectType } from '@nexus/schema'

// TODO: figure out datetime
const Birthdate = objectType({
  name: 'Birthdate',
  definition(t) {
    t.int('month')
    t.int('day')
    t.int('year')
  },
})

const BirthdateInput = inputObjectType({
  name: 'BirthdateInput',
  definition(t) {
    t.int('month')
    t.int('day')
    t.int('year')
  },
})

const User = objectType({
  name: 'User',
  definition(t) {
    t.model.id()
    t.model.email()
    t.model.username()
    t.field("Birthdate", {
      type: "Birthdate",
      resolve(root, args, __) {
        return root.birthdate.
      }
    })
    t.model.phone_num()
  },
})

const Query = objectType({
  name: 'Query',
  definition(t) {
    t.crud.user({ alias: 'getUser' })
    t.crud.users({ alias: 'getUsers' })
  },
})

const Mutation = objectType({
  name: 'Mutation',
  definition(t) {
    t.crud.createOneUser({ alias: 'signupUser' })
    t.crud.deleteOneUser({ alias: 'deleteUser' })
    t.crud.updateOneUser({ alias: 'updateUser' })
  },
})

export const schema = makeSchema({
  types: [Query, Mutation, User, Birthdate, BirthdateInput],
  plugins: [nexusPrismaPlugin()],
  outputs: {
    schema: __dirname + '/../schema.graphql',
    typegen: __dirname + '/generated/nexus.ts',
  },
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prisma',
      },
      {
        source: require.resolve('./context'),
        alias: 'Context',
      },
    ],
  },
})
