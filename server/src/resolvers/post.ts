import { Post } from '../entities/Post';
import {
    Arg,
    Query,
    Resolver,
    Mutation,
    InputType,
    Field,
    Ctx,
} from 'type-graphql';
import { MyContext } from '../types';

@InputType()
class PostInput {
    @Field()
    title: string;

    @Field()
    text: string;
}

@Resolver()
export class PostResolver {
    @Query(() => [Post])
    posts(): Promise<Post[]> {
        return Post.find();
    }

    @Query(() => Post, { nullable: true })
    post(@Arg('id') id: number): Promise<Post | null> {
        return Post.findOneBy({ id: id });
    }

    @Mutation(() => Post)
    async createPost(
        @Arg('input') input: PostInput,
        @Ctx() { req }: MyContext
    ): Promise<Post> {
        return Post.create({
            ...input,
            creatorID: req.session.userID,
        }).save();
    }

    @Mutation(() => Post, { nullable: true })
    async updatePost(
        @Arg('id') id: number,
        @Arg('title', () => String, { nullable: true }) title: string
    ): Promise<Post | null> {
        const post = await Post.findOneBy({ id: id });
        if (!post) {
            return null;
        }

        if (typeof title !== 'undefined') {
            Post.update({ id }, { title });
        }

        return post;
    }

    @Mutation(() => Boolean)
    async deletePost(@Arg('id') id: number): Promise<boolean> {
        await Post.delete(id);
        return true;
    }
}
