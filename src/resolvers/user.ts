import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Arg, Ctx, Field, InputType, Mutation, Resolver } from "type-graphql";
import bcrypt from 'bcrypt';
import { RequiredEntityData } from "@mikro-orm/core";

const hashingRounds = 12;

@InputType()
class UsernamePasswordInput {
    @Field()
    username: string
    @Field()
    password: string
}

@Resolver()
export class UserResolver {
    @Mutation(() => User)
    async register(
        @Arg('options') options: UsernamePasswordInput,
        @Ctx() { em }: MyContext
    ) {
        const hashedPassword = await bcrypt.hash(options.password, hashingRounds);

        const user = em.create(User, { 
            username: options.username,
            password: hashedPassword
        } as RequiredEntityData<User>);
        
        await em.persistAndFlush(user);

        return user;
    }
}