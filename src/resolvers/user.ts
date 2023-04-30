import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, ObjectType, Query, Resolver } from "type-graphql";
import bcrypt from 'bcrypt';
import { RequiredEntityData } from "@mikro-orm/core";

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
    message:string;
}

@ObjectType()
class UserResponse {
    @Field(() => [FieldError], {nullable: true})
    errors?: FieldError[];

    @Field(() => User, {nullable: true})
    user?: User;
}

@Resolver()
export class UserResolver {
    @Mutation(() => UserResponse)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ): Promise<UserResponse> {
        if (options.username.length < minUsernameLength) {
            return {
                errors: [
                    {
                        field: 'username',
                        message: `length must be at least ${minUsernameLength}`
                    },
                ],
            };
        }

        if (options.password.length < minPasswordLength) {
            return {
                errors: [
                    {
                        field: 'password',
                        message: `length must be at least ${minPasswordLength}`
                    },
                ],
            };
        }

        const hashedPassword = await bcrypt.hash(options.password, hashingRounds);

        const user = em.create(User, { 
            username: options.username,
            password: hashedPassword
        } as RequiredEntityData<User>);

        try {
            await em.persistAndFlush(user);
        }
        catch (err) {
            // duplicate username error
            if (err.code === '23505') {
                return {
                    errors: [
                        {
                            field: 'username',
                            message: 'username already taken'
                        },
                    ],
                };
            }
        }

        return {
            user
        };
    }
    }
}