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
import { COOKIE_NAME } from '../constants';
import { validateRegister } from '../utils/validRegister';
import { UsernamePasswordInput } from './UsernamePasswordInput';

const hashingRounds = 12;

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
    me(@Ctx() { req }: MyContext) {
        // you are not logged in
        if (!req.session.userID) {
            return null;
        }

        return User.findOneBy({ id: req.session.userID });
    }

    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const errors = validateRegister(options);
        if (errors) {
            return { errors };
        }

        const hashedPassword = await bcrypt.hash(
            options.password,
            hashingRounds
        );

        const user = User.create({
            username: options.username,
            email: options.email,
            password: hashedPassword,
        });

        try {
            await user.save();
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
        @Arg('usernameOrEmail') usernameOrEmail: string,
        @Arg('password') password: string,
        @Ctx() { req }: MyContext
    ): Promise<UserResponse> {
        const user = await User.findOneBy(
            usernameOrEmail.includes('@')
                ? { email: usernameOrEmail }
                : { username: usernameOrEmail }
        );

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

        const validPassword = await bcrypt.compare(password, user.password);
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
