import 'reflect-metadata';
import { COOKIE_NAME, __prod__ } from './constants';
import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { json } from 'body-parser';
import { buildSchema } from 'type-graphql';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
import cors from 'cors';
import session from 'express-session';
import Redis from 'ioredis';
import RedisStore from 'connect-redis';
import { DataSource } from 'typeorm';
import { Post } from './entities/Post';
import { User } from './entities/User';

const main = async () => {
    const dataSource = new DataSource({
        type: 'postgres',
        database: 'artifact2',
        username: 'postgres',
        password: 'postgres',
        logging: true,
        synchronize: true,
        entities: [Post, User],
    });
    await dataSource.initialize();

    const app = express();

    const redis = new Redis();

    app.use(
        cors({
            origin: [
                'https://sandbox.embed.apollographql.com',
                'http://localhost:4000/graphql',
                'http://localhost:3000',
            ],
            credentials: true,
        })
    );

    app.use(
        session({
            name: COOKIE_NAME,
            store: new RedisStore({
                client: redis,
                disableTouch: true,
            }),
            cookie: {
                maxAge: 1000 * 60 * 60 * 24 * 365 * 10, // 10 years
                httpOnly: true,
                sameSite: 'lax', // csrf
                secure: __prod__, // cookie only works in https
            },
            secret: 'secret env var',
            resave: false,
            saveUninitialized: false,
        })
    );

    const schema = await buildSchema({
        resolvers: [HelloResolver, PostResolver, UserResolver],
        validate: false,
    });

    const apolloServer = new ApolloServer({
        schema: schema,
    });

    await apolloServer.start();

    app.use(
        '/graphql',
        cors<cors.CorsRequest>({ origin: 'http://localhost:3000' }),
        json(),
        expressMiddleware(apolloServer, {
            context: async ({ res, req }) => ({
                req,
                res,
                redis,
            }),
        })
    );

    app.listen(4000, () => {
        console.log('server has started on localhost:4000');
    });
};

main().catch((err) => {
    console.error(err);
});
