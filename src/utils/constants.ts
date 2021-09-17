const constants = {
    mongooseModels: {
        USER: 'User',
    },
    environments: {
        PRODUCTION: 'production',
        DEVELOPMENT: 'development',
    },
    test: {
        TEST_USER: {
            firstName: 'test',
            lastName: 'admin',
            email: 'testadmin@iqube.com',
            password: 'password',
            passwordConfirm: 'password',
        },
    },
}

export default constants
