const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const User = require('../src/models/User');

chai.use(chaiHttp);
const { expect } = chai;

describe('User API', () => {
    before(async () => {
        await User.deleteMany({});
    });

    describe('POST /api/users', () => {
        it('should create a user', done => {
            chai.request(app)
                .post('/api/users')
                .send({ email: 'test@example.com', name: 'Test User', mobile: '1234567890', password: 'password' })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('email', 'test@example.com');
                    done();
                });
        });
    });

    describe('POST /api/auth/login', () => {
        it('should login a user', done => {
            chai.request(app)
                .post('/api/auth/login')
                .send({ email: 'test@example.com', password: 'password' })
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.have.property('token');
                    done();
                });
        });
    });
});
