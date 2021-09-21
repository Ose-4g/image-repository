process.env.NODE_ENV = 'test';
import chai, { assert } from 'chai';
import chaiHttp from 'chai-http';
import constants from '../../../utils/constants';
import UserModel, { User } from '../../../models/User';
import server from '../../../server';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { TEST_USER } = constants.test;

const ENDPOINT = '/api/v1/auth/login';
let user: User;

describe('Tests for Login endpoint', () => {
  before(async (): Promise<void> => {
    //create intern
    await UserModel.deleteMany({ email: TEST_USER.email });
    user = await UserModel.create(TEST_USER);
  });

  after(async (): Promise<void> => {
    await UserModel.deleteMany({ email: TEST_USER.email });
  });

  it('Login with empty body', (done: Mocha.Done) => {
    const body = {};
    chai
      .request(server)
      .post(ENDPOINT)
      .send(body)
      .end((err: Error, res: Response) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.status, 'error');
        assert.include(String(res.body.message).toLowerCase(), 'email');
        done();
      });
  });

  it('Login without email should give error', (done: Mocha.Done) => {
    const body = {};
    chai
      .request(server)
      .post(ENDPOINT)
      .send(body)
      .end((err: Error, res: Response) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.status, 'error');
        assert.include(String(res.body.message).toLowerCase(), 'email');
        done();
      });
  });

  it('Login without password should give error', (done: Mocha.Done) => {
    const body = {
      email: TEST_USER.email,
    };
    chai
      .request(server)
      .post(ENDPOINT)
      .send(body)
      .end((err: Error, res: Response) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.status, 'error');
        assert.include(String(res.body.message).toLowerCase(), 'password');
        done();
      });
  });

  it('Login with invalid email should give error', (done: Mocha.Done) => {
    const body = {
      email: 'abcdef',
      password: 'password',
    };
    chai
      .request(server)
      .post(ENDPOINT)
      .send(body)
      .end((err: Error, res: Response) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.status, 'error');
        assert.include(String(res.body.message).toLowerCase(), 'email');
        assert.include(String(res.body.message).toLowerCase(), 'invalid');
        done();
      });
  });

  it('Login with email that doesnt exist should return error ', (done: Mocha.Done) => {
    const body = {
      email: 'abcdef@yahoo.com',
      password: TEST_USER.password,
    };
    chai
      .request(server)
      .post(ENDPOINT)
      .send(body)
      .end((err: Error, res: Response) => {
        assert.equal(res.status, 404);
        assert.equal(res.body.status, 'error');
        assert.include(String(res.body.message).toLowerCase(), 'found');
        done();
      });
  });

  it('Login with wrong password should give error', (done: Mocha.Done) => {
    const body = {
      email: TEST_USER.email,
      password: TEST_USER.password + '00',
    };
    chai
      .request(server)
      .post(ENDPOINT)
      .send(body)
      .end((err: Error, res: Response) => {
        assert.equal(res.status, 400);
        assert.equal(res.body.status, 'error');
        assert.include(String(res.body.message).toLowerCase(), 'email');
        assert.include(String(res.body.message).toLowerCase(), 'password');
        done();
      });
  });

  it('Login with correct email and password should be successful', (done: Mocha.Done) => {
    const body = {
      email: TEST_USER.email,
      password: TEST_USER.password,
    };
    chai
      .request(server)
      .post(ENDPOINT)
      .send(body)
      .end((err: Error, res: Response) => {
        assert.equal(res.status, 200);
        assert.equal(res.body.status, 'success');
        assert.property(res.body.data, 'accessToken');
        done();
      });
  });
});
