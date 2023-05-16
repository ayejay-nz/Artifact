import { MIN_PASSWORD_LENGTH, MIN_USERNAME_LENGTH } from '../constants';
import { UsernamePasswordInput } from '../resolvers/UsernamePasswordInput';

export const validateRegister = (options: UsernamePasswordInput) => {
    if (!options.email.includes('@')) {
        return [
            {
                field: 'email',
                message: 'Invalid email',
            },
        ];
    }

    if (options.username.length < MIN_USERNAME_LENGTH) {
        return [
            {
                field: 'username',
                message: `Username must be at least ${MIN_USERNAME_LENGTH} characters long`,
            },
        ];
    }

    if (options.username.includes('@')) {
        return [
            {
                field: 'username',
                message: "Username cannot include '@'",
            },
        ];
    }

    if (options.password.length < MIN_PASSWORD_LENGTH) {
        return [
            {
                field: 'password',
                message: `Password must be at least ${MIN_PASSWORD_LENGTH} characters long`,
            },
        ];
    }

    return null;
};
