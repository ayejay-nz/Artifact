import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
    [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
    [SubKey in K]: Maybe<T[SubKey]>;
};
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type FieldError = {
    __typename?: 'FieldError';
    field: Scalars['String'];
    message: Scalars['String'];
};

export type Mutation = {
    __typename?: 'Mutation';
    createPost: Post;
    deletePost: Scalars['Boolean'];
    login: UserResponse;
    logout: Scalars['Boolean'];
    register: UserResponse;
    updatePost?: Maybe<Post>;
};

export type MutationCreatePostArgs = {
    title: Scalars['String'];
};

export type MutationDeletePostArgs = {
    id: Scalars['Float'];
};

export type MutationLoginArgs = {
    options: UsernamePasswordInput;
};

export type MutationRegisterArgs = {
    options: UsernamePasswordInput;
};

export type MutationUpdatePostArgs = {
    id: Scalars['Float'];
    title?: InputMaybe<Scalars['String']>;
};

export type Post = {
    __typename?: 'Post';
    createdAt: Scalars['String'];
    id: Scalars['Float'];
    title: Scalars['String'];
    updatedAt: Scalars['String'];
};

export type Query = {
    __typename?: 'Query';
    hello: Scalars['String'];
    me?: Maybe<User>;
    post?: Maybe<Post>;
    posts: Array<Post>;
};

export type QueryPostArgs = {
    id: Scalars['Float'];
};

export type User = {
    __typename?: 'User';
    createdAt: Scalars['String'];
    id: Scalars['Float'];
    updatedAt: Scalars['String'];
    username: Scalars['String'];
};

export type UserResponse = {
    __typename?: 'UserResponse';
    errors?: Maybe<Array<FieldError>>;
    user?: Maybe<User>;
};

export type UsernamePasswordInput = {
    password: Scalars['String'];
    username: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type LoginMutation = {
    __typename?: 'Mutation';
    login: {
        __typename?: 'UserResponse';
        errors?: Array<{
            __typename?: 'FieldError';
            field: string;
            message: string;
        }> | null;
        user?: { __typename?: 'User'; id: number; username: string } | null;
    };
};

export type RegisterMutationVariables = Exact<{
    username: Scalars['String'];
    password: Scalars['String'];
}>;

export type RegisterMutation = {
    __typename?: 'Mutation';
    register: {
        __typename?: 'UserResponse';
        errors?: Array<{
            __typename?: 'FieldError';
            field: string;
            message: string;
        }> | null;
        user?: {
            __typename?: 'User';
            id: number;
            username: string;
            createdAt: string;
            updatedAt: string;
        } | null;
    };
};

export const LoginDocument = gql`
    mutation Login($username: String!, $password: String!) {
        login(options: { username: $username, password: $password }) {
            errors {
                field
                message
            }
            user {
                id
                username
            }
        }
    }
`;
export type LoginMutationFn = Apollo.MutationFunction<
    LoginMutation,
    LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LoginMutation,
        LoginMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
        LoginDocument,
        options
    );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
    LoginMutation,
    LoginMutationVariables
>;
export const RegisterDocument = gql`
    mutation Register($username: String!, $password: String!) {
        register(options: { username: $username, password: $password }) {
            errors {
                field
                message
            }
            user {
                id
                username
                createdAt
                updatedAt
            }
        }
    }
`;
export type RegisterMutationFn = Apollo.MutationFunction<
    RegisterMutation,
    RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useRegisterMutation(
    baseOptions?: Apollo.MutationHookOptions<
        RegisterMutation,
        RegisterMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
        RegisterDocument,
        options
    );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
    RegisterMutation,
    RegisterMutationVariables
>;
