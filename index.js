import {
    ApolloServer
} from 'apollo-server';

// JWT
import Jwt from 'jsonwebtoken';

// Enviroment
import dotenv from 'dotenv';
dotenv.config({
    path: '.env'
});

// Schema 
import typeDefs from './graphQl/schema.js';

// Resolvers
import resolvers from './graphQl/resolvers.js';

// Conexion DB
import conectarDB from './config/db.js';

conectarDB();


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({
        req
    }) => {
        const token = req.headers['authorization'] || '';
        if (token) {
            try {
                const user = Jwt.verify(token, process.env.SECRET_WORD);
                return {
                    user
                }

            } catch (error) {
                console.log('The user is invalid');
            }
        }

    }
});

// The `listen` method launches a web server.
server.listen({
    port: process.env.PORT || 4000
}).then(({
    url
}) => {
    console.log(`🚀  Server ready at ${url}`);
});