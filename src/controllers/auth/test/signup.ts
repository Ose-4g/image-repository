import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import UserModel, { User } from '../../../models/User';
import constants from '../../../utils/constants';
const assert = chai.assert;
const { TEST_USER } = constants.test;
const { email, lastName, firstName, password, passwordConfirm } = TEST_USER;

chai.use(chaiHttp);

const ENDPOINT = '/auth/signup';

describe('Tests for the signup endpoint', () => {
  beforeEach(async () => {
    const user: User | null = await UserModel.findOne({ email: TEST_USER.email });
    if (user) {
      await UserModel.deleteMany({ email: TEST_USER.email });
    }
  });

  after(async () => {
    const user: User | null = await UserModel.findOne({ email: TEST_USER.email });
    if (user) {
      await UserModel.deleteMany({ email: TEST_USER.email });
    }
  });

  it('User sign up without email should give error', (done) => {
    const userData = {
      // email,
      firstName,
      lastName,
      password,
      passwordConfirm,
    };

    chai
      .request(server)
      .post(ENDPOINT)
      .send(userData)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isObject(res.body);
        assert.equal(res.body.status, 'error');
        assert.include(res.body.message.toLowerCase(), 'email');
        done();
      });
  });

  it('User sign up without password should give error', (done) => {
    const userData = {
      email,
      firstName,
      lastName,
      // password,
      passwordConfirm,
    };

    chai
      .request(server)
      .post(ENDPOINT)
      .send(userData)
      .end((err, res) => {
        assert.equal(res.status, 400);
        assert.isObject(res.body);
        assert.equal(res.body.status, 'error');
        assert.include(res.body.message.toLowerCase(), 'password');
        done();
      });
  });
});
