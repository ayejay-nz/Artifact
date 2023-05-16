import { NextPage } from 'next';
import React, { useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import { Wrapper } from '../../components/Wrapper';
import { InputField } from '../../components/InputField';
import {
    MeDocument,
    MeQuery,
    useChangePasswordMutation,
} from '../../generated/graphql';
import { useRouter } from 'next/router';
import { toErrorMap } from '../../utils/toErrorMap';
import NextLink from 'next/link';

export const ChangePassword: NextPage<{ token: string }> = ({ token }) => {
    const router = useRouter();
    const [changePasswordMutation] = useChangePasswordMutation();
    const [tokenError, setTokenError] = useState('');
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ newPassword: '' }}
                onSubmit={async (values, { setErrors }) => {
                    const response = await changePasswordMutation({
                        variables: {
                            newPassword: values.newPassword,
                            token:
                                typeof router.query.token === 'string'
                                    ? router.query.token
                                    : '',
                        },
                        update: (cache, { data }) => {
                            cache.writeQuery<MeQuery>({
                                query: MeDocument,
                                data: {
                                    __typename: 'Query',
                                    me: data?.changePassword.user,
                                },
                            });
                        },
                    });

                    if (response.data?.changePassword.errors) {
                        const errorMap = toErrorMap(
                            response.data.changePassword.errors
                        );
                        if ('token' in errorMap) {
                            setTokenError(errorMap.token);
                        }

                        setErrors(errorMap);
                    } else if (response.data?.changePassword.user) {
                        router.push('/');
                    }
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="newPassword"
                            placeholder="new password"
                            label="New Password"
                            type="password"
                        />
                        {tokenError ? (
                            <Flex>
                                <Box mr={2} color="red">
                                    {tokenError}.
                                </Box>
                                <Link
                                    as={NextLink}
                                    href={'/forgot-password'}
                                    color={'blue'}
                                >
                                    Click here to get a new token
                                </Link>
                            </Flex>
                        ) : null}
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            Change Password
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

ChangePassword.getInitialProps = ({ query }) => {
    return {
        token: query.token as string,
    };
};

export default ChangePassword;
