import 'reflect-metadata';
import { MikroORM } from '@mikro-orm/core';
import { __prod__ } from './constants';
import microConfig from './mikro-orm.config';
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

const main = async () => {
    const orm = await MikroORM.init(microConfig);
    await orm.getMigrator().up();
    const emFork = orm.em.fork();

    const app = express();

    const redis = new Redis();

    app.use(
        cors({
            origin: [
                'https://sandbox.embed.apollographql.com',
                'http://localhost:4000/graphql',
                'http://localhost:3000'
            ],
            credentials: true,
        })
    );

    app.use(
        session({
            name: 'qid',
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
                em: emFork,
                req,
                res,
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
