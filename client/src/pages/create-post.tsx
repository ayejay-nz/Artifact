import React from 'react';
import { Box, Button } from '@chakra-ui/react';
import { Formik, Form } from 'formik';
import { InputField } from '../components/InputField';
import { TextareaField } from '../components/TextareaField';
import { useCreatePostMutation } from '../generated/graphql';
import { useRouter } from 'next/router';
import { Layout } from '../components/Layout';

export const CreatePost: React.FC<{}> = ({}) => {
    const router = useRouter();
    const [createPostMutation] = useCreatePostMutation();

    return (
        <Layout variant="small">
            <Formik
                initialValues={{ title: '', text: '' }}
                onSubmit={async (values, { setErrors }) => {
                    await createPostMutation({
                        variables: { input: values },
                    });
                    router.push('/');
                }}
            >
                {({ isSubmitting }) => (
                    <Form>
                        <InputField
                            name="title"
                            placeholder="title"
                            label="Title"
                        />
                        <Box mt={4}>
                            <TextareaField
                                name="text"
                                placeholder="text..."
                                label="Body"
                            />
                        </Box>
                        <Button
                            mt={4}
                            type="submit"
                            isLoading={isSubmitting}
                            colorScheme="teal"
                        >
                            Create Post
                        </Button>
                    </Form>
                )}
            </Formik>
        </Layout>
    );
};

export default CreatePost;
