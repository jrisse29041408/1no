import { ApolloServer } from 'apollo-server-express'
import { schema } from './schema'
import { createContext } from './context'
import express from 'express'

const apolloServer = new ApolloServer({ schema, context: createContext })

const app = express()

apolloServer.applyMiddleware({ app })

const port = 2904
app.listen({ port }, () =>
  console.log(`Server ready at: http://localhost:${port}/graphql`),
)
