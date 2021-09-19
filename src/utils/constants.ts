const constants = {
  mongooseModels: {
    USER: 'User',
    IMAGE: 'Image',
    IMAGE_TAG: 'ImageTag',
  },
  environments: {
    PRODUCTION: 'production',
    DEVELOPMENT: 'development',
  },
  test: {
    TEST_USER: {
      firstName: 'test',
      lastName: 'user',
      email: 'user@image.com',
      password: 'password',
      passwordConfirm: 'password',
    },
  },
  permissions: {
    PUBLIC: 'public',
    PRIVATE: 'private',
  },
};

export default constants;
