const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../src/app');
const Expense = require('../src/models/Expense');
const User = require('../src/models/User');
const jwt = require('jsonwebtoken');

chai.use(chaiHttp);
const { expect } = chai;

describe('Expense API', () => {
    let token;
    let userId;

    before(async () => {
        await Expense.deleteMany({});
        await User.deleteMany({});

        const user = await new User({ email: 'test@example.com', name: 'Test User', mobile: '1234567890', password: 'password' }).save();
        userId = user._id;
        token = jwt.sign({ id: userId }, 'secret', { expiresIn: '1h' });
    });

    describe('POST /api/expenses', () => {
        it('should add an expense', done => {
            chai.request(app)
                .post('/api/expenses')
                .set('Authorization', token)
                .send({ description: 'Dinner', totalAmount: 3000, splitMethod: 'equal', participants: [{ userId, amount: 1000 }] })
                .end((err, res) => {
                    expect(res).to.have.status(201);
                    expect(res.body).to.have.property('description', 'Dinner');
                    done();
                });
        });
    });

    describe('GET /api/expenses/user/:userId', () => {
        it('should get user expenses', done => {
            chai.request(app)
                .get(`/api/expenses/user/${userId}`)
                .set('Authorization', token)
                .end((err, res) => {
                    expect(res).to.have.status(200);
                    expect(res.body).to.be.an('array');
                    done();
                });
        });
    });
});
