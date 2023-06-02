import { Box } from '@chakra-ui/react';
import React, { ReactNode } from 'react';

export type WrapperVariant = 'small' | 'regular';

interface WrapperProps {
    children?: ReactNode | undefined;
    variant?: WrapperVariant;
}

export const Wrapper: React.FC<WrapperProps> = ({ children, variant }) => {
    return (
        <Box
            mt={8}
            mx="auto"
            maxW={variant === 'regular' ? '800px' : '400px'}
            w="100%"
        >
            {children}
        </Box>
    );
};
