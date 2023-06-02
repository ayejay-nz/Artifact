import React, { ReactNode } from 'react';
import { NavBar } from './NavBar';
import { Wrapper, WrapperVariant } from './Wrapper';

interface LayoutProps {
    variant?: WrapperVariant;
    children?: ReactNode | undefined;
}

export const Layout: React.FC<LayoutProps> = ({ children, variant }) => {
    return (
        <>
            <NavBar />
            <Wrapper variant={variant}>{children}</Wrapper>
        </>
    );
};
