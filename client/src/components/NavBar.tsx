import React from 'react';
import { Box, Button, Flex, Link } from '@chakra-ui/react';
import NextLink from 'next/link';
import {
    MeDocument,
    MeQuery,
    useLogoutMutation,
    useMeQuery,
} from '../generated/graphql';

interface NavBarProps {}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [logoutMutation, { loading: logoutLoading }] = useLogoutMutation();
    const { data, loading } = useMeQuery();
    let body = null;

    // Data is loading
    if (loading) {
    }
    // User not logged in
    else if (!data?.me) {
        body = (
            <>
                <Link mr={2} as={NextLink} href={'/login'}>
                    login
                </Link>
                <Link as={NextLink} href={'/register'}>
                    register
                </Link>
            </>
        );
    }
    // User is logged in
    else {
        body = (
            <Flex>
                <Box mr={2}>{data.me.username}</Box>
                <Button
                    onClick={async () => {
                        await logoutMutation();
                        //TODO: refresh cache rather than windows by accessing apolloClient through props
                        await window.location.reload();
                    }}
                    isLoading={logoutLoading}
                    variant={'link'}
                >
                    Logout
                </Button>
            </Flex>
        );
    }

    return (
        <Flex zIndex={2} position="sticky" bg="tomato" top={0} p={4}>
            <Flex flex={1} m="auto" align="center" ml={'auto'}>
                <Box ml={'auto'}>{body}</Box>
            </Flex>
        </Flex>
    );
};
