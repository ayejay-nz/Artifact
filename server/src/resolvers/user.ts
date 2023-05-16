import { User } from '../entities/User';
import { MyContext } from '../types';
import {
    Arg,
    Ctx,
    Field,
    Mutation,
    ObjectType,
    Query,
    Resolver,
} from 'type-graphql';
import bcrypt from 'bcrypt';
import { COOKIE_NAME, FORGET_PASSWORD_PREFIX } from '../constants';
import { validateRegister } from '../utils/validRegister';
import { UsernamePasswordInput } from './UsernamePasswordInput';
import { sendEmail } from '../utils/sendEmail';
import { v4 } from 'uuid';

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
    @Mutation(() => Boolean)
    async forgotPassword(
        @Arg('email') email: string,
        @Ctx() { redis }: MyContext
    ) {
        const user = await User.findOneBy({ email: email });
        if (!user) {
            // email not in database
            return true; // do not alert the user the email does not exist
        }

        const token = v4();

        await redis.set(
            FORGET_PASSWORD_PREFIX + token,
            user.id,
            'EX',
            1000 * 60 * 60 * 24 * 3 // 3 days
        );

        await sendEmail(
            email,
            `<a href="http://localhost:3000/change-password/${token}">reset password</a>`
        );

        return true;
    }

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
                        field: 'usernameOrEmail',
                        message: 'That username or email does not exist',
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
