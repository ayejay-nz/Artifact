import React from 'react';
import { Field, Form, Formik } from 'formik';
import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from '@chakra-ui/react';
import { Wrapper } from '../components/Wrapper';
import { InputField } from '../components/InputField';
import { gql, useMutation } from '@apollo/client';

interface registerProps {}

const REGISTER_MUTATION = gql`
    mutation Register($username: String!, $password: String!) {
        register(options: { username: $username, password: $password }) {
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

const Register: React.FC<registerProps> = ({}) => {
    const [register,] = useMutation(REGISTER_MUTATION);
    return (
        <Wrapper variant="small">
            <Formik
                initialValues={{ username: '', password: '' }}
                onSubmit={async (values) => {
                    const response = await register({ variables: values });
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="username"
                            placeholder="username"
                            label="Username"
                        />
                        <Box mt={4}>
                            <InputField
                                name="password"
                                placeholder="password"
                                label="Password"
                                type="password"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            Register
                        </Button>
                    </Form>
                )}
            </Formik>
        </Wrapper>
    );
};

export default Register;
