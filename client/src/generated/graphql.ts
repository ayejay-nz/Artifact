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
    changePassword: UserResponse;
    createPost: Post;
    deletePost: Scalars['Boolean'];
    forgotPassword: Scalars['Boolean'];
    login: UserResponse;
    logout: Scalars['Boolean'];
    register: UserResponse;
    updatePost?: Maybe<Post>;
};

export type MutationChangePasswordArgs = {
    newPassword: Scalars['String'];
    token: Scalars['String'];
};

export type MutationCreatePostArgs = {
    input: PostInput;
};

export type MutationDeletePostArgs = {
    id: Scalars['Float'];
};

export type MutationForgotPasswordArgs = {
    email: Scalars['String'];
};

export type MutationLoginArgs = {
    password: Scalars['String'];
    usernameOrEmail: Scalars['String'];
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
    creator: User;
    creatorID: Scalars['Float'];
    id: Scalars['Float'];
    points: Scalars['String'];
    text: Scalars['String'];
    title: Scalars['String'];
    updatedAt: Scalars['String'];
};

export type PostInput = {
    text: Scalars['String'];
    title: Scalars['String'];
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
    email: Scalars['String'];
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
    email: Scalars['String'];
    password: Scalars['String'];
    username: Scalars['String'];
};

export type RegularErrorFragment = {
    __typename?: 'FieldError';
    field: string;
    message: string;
};

export type RegularUserFragment = {
    __typename?: 'User';
    id: number;
    username: string;
};

export type RegularUserResponseFragment = {
    __typename?: 'UserResponse';
    errors?: Array<{
        __typename?: 'FieldError';
        field: string;
        message: string;
    }> | null;
    user?: { __typename?: 'User'; id: number; username: string } | null;
};

export type ChangePasswordMutationVariables = Exact<{
    token: Scalars['String'];
    newPassword: Scalars['String'];
}>;

export type ChangePasswordMutation = {
    __typename?: 'Mutation';
    changePassword: {
        __typename?: 'UserResponse';
        errors?: Array<{
            __typename?: 'FieldError';
            field: string;
            message: string;
        }> | null;
        user?: { __typename?: 'User'; id: number; username: string } | null;
    };
};

export type CreatePostMutationVariables = Exact<{
    input: PostInput;
}>;

export type CreatePostMutation = {
    __typename?: 'Mutation';
    createPost: {
        __typename?: 'Post';
        id: number;
        title: string;
        text: string;
        points: string;
        creatorID: number;
        createdAt: string;
        updatedAt: string;
    };
};

export type ForgotPasswordMutationVariables = Exact<{
    email: Scalars['String'];
}>;

export type ForgotPasswordMutation = {
    __typename?: 'Mutation';
    forgotPassword: boolean;
};

export type LoginMutationVariables = Exact<{
    usernameOrEmail: Scalars['String'];
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

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterMutationVariables = Exact<{
    options: UsernamePasswordInput;
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
        user?: { __typename?: 'User'; id: number; username: string } | null;
    };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
    __typename?: 'Query';
    me?: { __typename?: 'User'; id: number; username: string } | null;
};

export const RegularErrorFragmentDoc = gql`
    fragment RegularError on FieldError {
        field
        message
    }
`;
export const RegularUserFragmentDoc = gql`
    fragment RegularUser on User {
        id
        username
    }
`;
export const RegularUserResponseFragmentDoc = gql`
    fragment RegularUserResponse on UserResponse {
        errors {
            ...RegularError
        }
        user {
            ...RegularUser
        }
    }
    ${RegularErrorFragmentDoc}
    ${RegularUserFragmentDoc}
`;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($token: String!, $newPassword: String!) {
        changePassword(token: $token, newPassword: $newPassword) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
`;
export type ChangePasswordMutationFn = Apollo.MutationFunction<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      token: // value for 'token'
 *      newPassword: // value for 'newPassword'
 *   },
 * });
 */
export function useChangePasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        ChangePasswordMutation,
        ChangePasswordMutationVariables
    >(ChangePasswordDocument, options);
}
export type ChangePasswordMutationHookResult = ReturnType<
    typeof useChangePasswordMutation
>;
export type ChangePasswordMutationResult =
    Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<
    ChangePasswordMutation,
    ChangePasswordMutationVariables
>;
export const CreatePostDocument = gql`
    mutation CreatePost($input: PostInput!) {
        createPost(input: $input) {
            id
            title
            text
            points
            creatorID
            createdAt
            updatedAt
        }
    }
`;
export type CreatePostMutationFn = Apollo.MutationFunction<
    CreatePostMutation,
    CreatePostMutationVariables
>;

/**
 * __useCreatePostMutation__
 *
 * To run a mutation, you first call `useCreatePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPostMutation, { data, loading, error }] = useCreatePostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreatePostMutation(
    baseOptions?: Apollo.MutationHookOptions<
        CreatePostMutation,
        CreatePostMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<CreatePostMutation, CreatePostMutationVariables>(
        CreatePostDocument,
        options
    );
}
export type CreatePostMutationHookResult = ReturnType<
    typeof useCreatePostMutation
>;
export type CreatePostMutationResult =
    Apollo.MutationResult<CreatePostMutation>;
export type CreatePostMutationOptions = Apollo.BaseMutationOptions<
    CreatePostMutation,
    CreatePostMutationVariables
>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
        forgotPassword(email: $email)
    }
`;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(
    baseOptions?: Apollo.MutationHookOptions<
        ForgotPasswordMutation,
        ForgotPasswordMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<
        ForgotPasswordMutation,
        ForgotPasswordMutationVariables
    >(ForgotPasswordDocument, options);
}
export type ForgotPasswordMutationHookResult = ReturnType<
    typeof useForgotPasswordMutation
>;
export type ForgotPasswordMutationResult =
    Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<
    ForgotPasswordMutation,
    ForgotPasswordMutationVariables
>;
export const LoginDocument = gql`
    mutation Login($usernameOrEmail: String!, $password: String!) {
        login(usernameOrEmail: $usernameOrEmail, password: $password) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
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
 *      usernameOrEmail: // value for 'usernameOrEmail'
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
export const LogoutDocument = gql`
    mutation Logout {
        logout
    }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
    LogoutMutation,
    LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
    baseOptions?: Apollo.MutationHookOptions<
        LogoutMutation,
        LogoutMutationVariables
    >
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
        LogoutDocument,
        options
    );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
    LogoutMutation,
    LogoutMutationVariables
>;
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
        register(options: $options) {
            ...RegularUserResponse
        }
    }
    ${RegularUserResponseFragmentDoc}
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
 *      options: // value for 'options'
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
export const MeDocument = gql`
    query Me {
        me {
            ...RegularUser
        }
    }
    ${RegularUserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
    baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
    baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
    const options = { ...defaultOptions, ...baseOptions };
    return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
