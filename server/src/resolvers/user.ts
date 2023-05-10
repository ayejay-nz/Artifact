import { User } from '../entities/User';
import { MyContext } from '../types';
import {
    Arg,
    Ctx,
    Field,
    InputType,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import bcrypt from 'bcrypt';
import { RequiredEntityData } from '@mikro-orm/core';
import { COOKIE_NAME } from '../constants';

const hashingRounds = 12;
const minUsernameLength = 3;
const minPasswordLength = 10;

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string;

    @Field()
    password: string;
}

@ObjectType()
class FieldError {
    @Field()
    field: string;

    @Field()
    message: string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => User, { nullable: true })
    user?: User;
}

@Resolver()
export class UserResolver {
    @Query(() => User, { nullable: true })
    me(@Ctx() { em, req }: MyContext) {
        // you are not logged in
        if (!req.session.userID) {
            return null;
        }

        const user = em.findOne(User, { id: req.session.userID });

        return user;
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {
        if (options.username.length < minUsernameLength) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: `Username must be at least ${minUsernameLength} characters long`,
                    },
                ],
            };
        }

        if (options.password.length < minPasswordLength) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: `Password must be at least ${minPasswordLength} characters long`,
                    },
                ],
            };
        }

        const hashedPassword = await bcrypt.hash(
            options.password,
            hashingRounds
        );

        const user = em.create(User, {
            username: options.username,
            password: hashedPassword,
        } as RequiredEntityData<User>);

        try {
            await em.persistAndFlush(user);
        } catch (err) {
            // duplicate username error
            if (err.code === '23505') {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'Username already taken',
                        },
                    ],
                };
            }
        }

        req.session.userID = user.id;

        return {
            user,
        };
    }

    @Mutation(() => UserResponse)
    async login(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em, req }: MyContext
    ): Promise<UserResponse> {
        const user = await em.findOne(User, {
            username: options.username.toLowerCase(),
        });
        if (!user) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: 'That username does not exist',
                    },
                ],
            };
        }

        const validPassword = await bcrypt.compare(
            options.password,
            user.password
        );
        if (!validPassword) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: 'Incorrect password',
                    },
                ],
            };
        }

        req.session.userID = user.id;

        return {
            user,
        };
    }

    @Mutation(() => Boolean)
    async logout(@Ctx() { res, req }: MyContext) {
        return new Promise((resolve) => {
            req.session.destroy((err) => {
                res.clearCookie(COOKIE_NAME);

                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }

                resolve(true);
            });
        });
    }
}
