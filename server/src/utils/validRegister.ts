import { UsernamePasswordInput } from '../resolvers/UsernamePasswordInput';

const minUsernameLength = 3;
const minPasswordLength = 10;

export const validateRegister = (options: UsernamePasswordInput) => {
    if (!options.email.includes('@')) {
        return [
            {
                field: 'email',
                message: 'Invalid email',
            },
        ];
    }

    if (options.username.length < minUsernameLength) {
        return [
            {
                field: 'username',
                message: `Username must be at least ${minUsernameLength} characters long`,
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

    if (options.password.length < minPasswordLength) {
        return [
            {
                field: 'password',
                message: `Password must be at least ${minPasswordLength} characters long`,
            },
        ];
    }

    return null;
};
