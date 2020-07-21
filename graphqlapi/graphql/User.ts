import { schema } from 'nexus'

schema.objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('email')
    t.string('username')
    t.date('birthdate')
    t.string('phoneNum')
  },
})

schema.queryType({
  definition(t) {
    t.list.field('users', {
      type: 'User',
      resolve(_, __, ctx) {
        return ctx.prisma.user.findMany()
      },
    })
  },
})

schema.mutationType({
  definition(t) {
    t
  },
})
