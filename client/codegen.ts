import type { CodegenConfig } from '@graphql-codegen/cli';

const config: CodegenConfig = {
    schema: 'http://localhost:4000/graphql',
    documents: 'src/graphql/**/*.graphql',
    generates: {
        'src/generated/': {
            plugins: ['typescript', 'typescript-resolvers'],
            preset: 'client',
        },
    },
};

export default config;
