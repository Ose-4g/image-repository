process.env.NODE_ENV = 'test';
import chai from 'chai';
import chaiHttp from 'chai-http';
import server from '../../../server';
import UserModel, { User } from '../../../models/User';
import constants from '../../../utils/constants';
const assert = chai.assert;
const { TEST_USER } = constants.test;
const { email, lastName, firstName, password, passwordConfirm } = TEST_USER;

chai.use(chaiHttp);

const ENDPOINT = '/api/v1/auth/signup';

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

  it('User sign up without firstName should give error', (done) => {
    const userData = {
      email,
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
        assert.include(res.body.message.toLowerCase(), 'first');
        done();
      });
  });

  it('User sign up without lastName should give error', (done) => {
    const userData = {
      email,
      firstName,
      //lastName,
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
        assert.include(res.body.message.toLowerCase(), 'last');
        done();
      });
  });

  it('User sign up without lastName should give error', (done) => {
    const userData = {
      email,
      firstName,
      //lastName,
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
        assert.include(res.body.message.toLowerCase(), 'last');
        done();
      });
  });

  it('User sign up with passwordConfirm !== password  should give error', (done) => {
    const userData = {
      email,
      firstName,
      lastName,
      password,
      passwordConfirm: passwordConfirm + 'h',
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
        assert.include(res.body.message.toLowerCase(), 'mismatch');
        done();
      });
  });

  it('User sign up with valid details should be successful', (done) => {
    const userData = {
      email,
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
        assert.equal(res.status, 201);
        assert.isObject(res.body);
        assert.equal(res.body.status, 'success');
        assert.include(res.body.message.toLowerCase(), 'success');
        done();
      });
  });

  describe('', function () {
    it('User should not be able to sign up if that email is already being used', async () => {
      chai
        .request(server)
        .post(ENDPOINT)
        .send(TEST_USER)
        .end((err, res) => {
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.equal(res.body.status, 'error');
          assert.property(res.body, 'message');
          assert.include(res.body.message.toLowerCase(), 'email');
          assert.include(res.body.message.toLowerCase(), 'in use');
        });
    });

    it('Document should save correctly to the DB', async () => {
      UserModel.findOne({ email }).then((user) => {
        assert.isNotNull(user);
        assert.isDefined(user);
        assert.equal(user!.firstName.toLowerCase(), firstName.toLowerCase());
        assert.equal(user!.lastName.toLowerCase(), lastName.toLowerCase());
        assert.equal(user!.email.toLowerCase(), email.toLowerCase());
      });
    });
  });
});
